from python:3.8.10-alpine3.13

RUN pip3 install --upgrade pip

RUN mkdir -p /app

RUN apk add gcc libffi-dev rust cargo openssl-dev

COPY requirements.txt /app

RUN pip3 install -r /app/requirements.txt

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