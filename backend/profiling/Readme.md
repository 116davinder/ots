## How to profile ots backend application?
I am going to use [py-spy](https://github.com/benfred/py-spy) because it was the easiest one to install and start using.

### Pre steps
* start redis database
```bash
docker run --rm -p 6379:6379 --name some-redis redis
```

### Steps for CPU Profiling

* start application with profiler and update the `kdf iterations` to respective name of `profile-xxx.svg`
```bash
py-spy record -o profile-1000.svg -- python3 app.py
py-spy record -o profile-10000.svg -- python3 app.py
py-spy record -o profile-100000.svg -- python3 app.py
```

* start load command
```bash
while true; do curl http://localhost:5000/create_secret -d @../test-data/data.json; done
```
* Analyse all `SVG` files

### Steps for Memory Profiling
Memory Profiling is not required as it does not store things in memory.

### Steps for Performance Metrics
I going to use `locust` which works perfectly with minimal setup.

* Create `locustfile.py`
* Run Locust application
```bash
locust -f profiling/locustfile.py
```
* Vist `http://0.0.0.0:8089`
Here you have to enter various options for `concurrent` users and `user` spawn rate.

|Name|reqs|fails|Avg|Min|Max|Median|req/s|failures/s|
|----|----|-----|---|---|---|------|-----|----------|
 POST /create_secret| 3141| 0(0.00%)|115 | 11 |1418 | 30 | 21.19|    0.00
 GET /health|3259|0(0.00%)  | 55| 1 |1045|5  |   21.99| 0.00|
 Aggregated|6400 |0(0.00%)  |  84 | 1 | 1418 |  15  |   43.18 | 0.00


**Response time percentiles (approximated)**
Type |Name                                                              |50% |   66% | 75%|80% |90% | 95% | 98% | 99%|99.9%|99.99%|100% |reqs
--------|------------------------------------------------------------|---------|------|------|------|------|------|------|------|------|------|------|------|
 POST | /create_secret | 30 |46 |55 |95 |360| 690|930|1100|1300|1400|1400|3141|
 GET |/health | 5| 8|10|17| 160 | 400|640|750|1000 |1000 |1000 | 3259
 None | Aggregated |16 |30 | 46 | 56| 270| 530 | 800 | 980| 1300 |1400|1400| 6400

* [Generated Results](profiling/locust-perf-reprort.html)

### Reference
1. http://pramodkumbhar.com/2019/05/summary-of-python-profiling-tools-part-i/
2. https://docs.locust.io/en/stable/quickstart.html#example-locustfile-py