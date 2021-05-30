# OTS Application
One Time Secret Sharing Application Stack. 

It consists of 3 layers as other usual web-application does.

* Frontend Layer using ReactJs.
* Backend Layer using Python3 + FastAPI.
* Database Layer using Redis.


## Local Development Stack
```bash
docker-compose build

docker-compose up
```

### Frontend
http://localhost:3000

### Backend
http://localhost:5000

http://localhost:5000/docs

### Database
localhost:6379


## Production Stack
We will be using `helm` to deploy the stack.
```bash

```