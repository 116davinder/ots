from python3:alpine

RUN mkdir -p /app

COPY requirements.txt /app

RUN pip3 install -r /app/requirements.txt

COPY . /app

ENV OTS_DB_HOST="localhost"
ENV OTS_DB_PORT=6379
ENV OTS_DB_PASSWORD=None
ENV OTS_SSL="False"

EXPOSE 5000

WORKDIR /app

CMD ["flask", "run"]