from python:3.8.10-alpine3.13

RUN mkdir -p /app

COPY requirements.txt /app

RUN apk add gcc libffi libffi-dev

RUN pip3 install -r /app/requirements.txt

COPY . /app

ENV OTS_DB_HOST="localhost"
ENV OTS_DB_PORT=6379
ENV OTS_DB_PASSWORD=None
ENV OTS_SSL="False"
ENV OTS_SALT="this is super secret salt"

EXPOSE 5000

WORKDIR /app

CMD ["gunicorn", "--worker-tmp-dir", "/dev/shm", "--config", "gunicorn_config.py", "app:app", "."]