# Python One Time Secret API #
This API is inspired from [python-ots-api](https://github.com/do-community/python-ots-api).

* It also uses [FastAPI Framework](https://fastapi.tiangolo.com/) instead of `Flask`.
* It uses more strong algorithms to encrypt like `sha3_512`
* It exposes `Swagger UI` for further development of project.
* It supports containers as a packaging option.
* It supports Redis with SSL and SSL verification with `ceritifi` module.

**Note:**
* Redis UI can be installed using https://github.com/qishibo/AnotherRedisDesktopManager

### Local Development Usage
```
$ docker run --rm -p 6379:6379 redis

$ uvicorn app:app --reload --host 0.0.0.0 --port 5000
```

### Production Usage
```
export OTS_SALT="somethingIDonotWantToKnow"
export OTS_DB_HOST="localhost"
export OTS_DB_PORT=6379
export OTS_DB_PASSWORD="youShouldUseAPassword"
export OTS_DB_SSL="False"
export OTS_DB_NAME=0

python3 app.py
```

### API Docs / Swagger UI

* [Swagger UI @ /docs](http://127.0.0.1:5000/docs)
* [OpenAPIJson @ /openapi.json](http://127.0.0.1:5000/openapi.json)
