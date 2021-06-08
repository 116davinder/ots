import time
from locust import HttpUser, task, between
import json

class health(HttpUser):
    wait_time = between(1, 2.5)

    @task
    def get_health(self):
        self.client.get("/health")

class create_secret(HttpUser):
    wait_time = between(1, 2.5)

    @task
    def create(self):
        data = {
            "passphrase": "hello",
            "message": "Droplets are cool",
            "expiration_time": 100
        }
        self.client.post("/create_secret", data=json.dumps(data))
