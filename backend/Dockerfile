from python:3.8.10-alpine3.13

RUN pip3 install --upgrade pip --no-cache-dir && \
    mkdir -p /app && \
    apk -U upgrade && \
    apk add gcc libffi-dev rust cargo openssl-dev --no-cache

COPY requirements.txt /app

RUN pip3 install -r /app/requirements.txt --no-cache-dir

COPY . /app

ENV OTS_SALT="somethingIDonotWantToKnow"
ENV OTS_DB_HOST="localhost"
ENV OTS_DB_PORT=6379
# ENV OTS_DB_PASSWORD=None
ENV OTS_DB_SSL="False"
ENV OTS_DB_NAME=0

EXPOSE 5000

WORKDIR /app

CMD ["python3", "app.py"]