## How to profile ots backend application?
I am going to use [py-spy](https://github.com/benfred/py-spy) because it was the easiest one to install and start using.

### Pre steps
* start redis database
```bash
docker run --rm -p 6379:6379 --name some-redis redis
```

### Steps CPU Profiling

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


### Steps for Performance Metrics


### Reference
1. http://pramodkumbhar.com/2019/05/summary-of-python-profiling-tools-part-i/
2. https://peter-jp-xie.medium.com/scale-up-rest-api-functional-tests-to-performance-tests-in-python-3239859c0e27