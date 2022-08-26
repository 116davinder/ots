import base64, hashlib
from os import getenv
from cryptography.fernet import Fernet
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from datetime import timedelta
import redis
from uuid import uuid4
from fastapi import FastAPI, status, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
import uvicorn
import certifi
from fastapi.middleware.cors import CORSMiddleware
import logging

__author__ = "Davinder Pal"
__author_email__ = "dpsangwal@gmail.com"

tags_metadata = [
    {
        "name": "Create Secret",
        "description": "It will return a secret id based on given parameters" +
            "like message/passphrase/expiration_time after saving them in redis database.",
    },
    {
        "name": "get_secret",
        "description": "It will return secret message if given parameters like" +
            "passphrase/id matches with stored value in redis database",
    },
    {
    "name": "health",
    "description": "It will return ok on get request."
    },
]

app = FastAPI(
    title="One Time Secret Sharing Application",
    description="This project will create ontime secret id for secret sharing across different organisation.",
    version="0.1.0",
    openapi_tags=tags_metadata
)

# CORS
_origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

salt = str.encode(getenv("OTS_SALT", "somethingIDonotWantToKnow"))

r = redis.Redis(
    host=getenv("OTS_DB_HOST", "localhost"),
    port=getenv("OTS_DB_PORT", 6379),
    password=getenv("OTS_DB_PASSWORD", None),
    ssl=getenv("OTS_DB_SSL", "False").title() == "True",
    ssl_ca_certs=certifi.where(),
    ssl_cert_reqs='required',
    ssl_check_hostname=False,
    db=getenv("OTS_DB_NAME", 0)
)

class Secrets(BaseModel):
    passphrase: Optional[str]
    message: str = None
    expiration_time: Optional[int] = 604800

class Id(BaseModel):
    passphrase: Optional[str]
    id: str

@app.post("/create_secret", status_code=status.HTTP_201_CREATED, response_class=JSONResponse, tags=["Create Secret"])
def create_secret(secret: Secrets):
    _pass = secret.passphrase
    _message = secret.message
    _expiration_time = secret.expiration_time

    if _pass is None or _message is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing passphrase and/or message"
        )

    if len(_message) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message can't be empty"
        )

    id = uuid4().hex
    m = hashlib.sha3_512()
    m.update(_pass.encode("utf-8"))
    user_sha = m.hexdigest()
    # setup a Fernet key based on our passphrase
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA3_512(),
        length=32,
        salt=salt,
        iterations=10000,
        backend=default_backend(),
    )
    key = base64.urlsafe_b64encode(kdf.derive(_pass.encode()))  # Can only use kdf once
    f = Fernet(key)

    # encrypt the message
    ciphertext = f.encrypt(_message.encode("utf-8"))

    #update redis database
    r.setex(
        id,
        timedelta(seconds=_expiration_time),
        "{0}\n{1}".format(user_sha, ciphertext.decode("utf-8")),
    )
    return {"id": id}

@app.post("/get_secret", status_code=status.HTTP_200_OK, response_class=JSONResponse, tags=["get_secret"])
def get_secret(id: Id):
    """
    Reads given body with id and passphrase.
    """
    _pass = id.passphrase
    _id = id.id

    if _pass is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="missing passphrase"
        )

    if len(_id) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="missing secret message id"
        )

    # get data from redis
    data = r.get(_id)
    if data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="either the secret have been viewed earlier or never existed"
        )

    data = data.decode("utf-8")
    stored_sha, stored_ciphertext = data.split("\n")

    m = hashlib.sha3_512()
    m.update(_pass.encode("utf-8"))
    user_sha = m.hexdigest()

    if stored_sha != user_sha:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="please check your passphrase again"
        )

    r.delete(_id)
    # If this doesn't return a value we say secret has either
    # never existed or it was already read
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA3_512(),
        length=32,
        salt=salt,
        iterations=10000,
        backend=default_backend(),
    )
    key = base64.urlsafe_b64encode(kdf.derive(_pass.encode()))  # Can only use kdf once
    f = Fernet(key)
    decrypted_message = f.decrypt(stored_ciphertext.encode("utf-8"))
    return {"message": decrypted_message.decode("utf-8")}

@app.get("/health", status_code=status.HTTP_200_OK, response_class=JSONResponse, tags=["health"])
def health():
    return {"health": "ok"}

if __name__ == "__main__":
    log_config = uvicorn.config.LOGGING_CONFIG
    log_config["log_level"] = getenv("OTS_LOG_LEVEL", logging.INFO),
    log_config["formatters"]["access"]["fmt"] = "%(asctime)s - %(levelname)s - %(message)s"
    log_config["formatters"]["default"]["fmt"] = "%(asctime)s - %(levelname)s - %(message)s"
    uvicorn.run(app, host="0.0.0.0", port=5000, log_config=log_config)
