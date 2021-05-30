# OTS Application
One Time Secret Sharing Application Stack. 

It consists of 3 layers as other usual web-application does.

* Frontend Layer using ReactJs.
* Backend Layer using Python3 + FastAPI.
* Database Layer using Redis.

![Frontend Image](./images/OTS-Frontend.png)

## Local Development Stack
```bash
docker-compose build

docker-compose up
```

### Local Urls
[Frontend UI](http://localhost:3000)
[Backend API](http://localhost:5000)
[Backend Swagger UI](http://localhost:5000/docs)

## Production Stack
We will be using `helm` to deploy the stack.
```bash

```