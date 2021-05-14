from python:3.8.10

RUN mkdir -p /app

RUN apt install gcc openssl libbz2-dev -y

RUN pip3 install --upgrade pip

COPY requirements.txt /app

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