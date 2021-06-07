import requests
import json

headers = {'Content-type': 'application/json', 'Accept': 'application/json'}
url = 'http://127.0.0.1:5000/create_secret'

def test_create_secret():
    data = {
      "passphrase": "hello",
      "message": "Droplets are cool",
      "expiration_time": 100
    }
    resp = requests.post(url, data=json.dumps(data), headers=headers)
    assert resp.status_code == 201
    assert resp.json()["id"] != ""
    print(resp.text)

def test_create_secret_with_empty_passphrase():
    data = {
      "passphrase": "",
      "message": "Droplets are cool",
      "expiration_time": 100
    }
    resp = requests.post(url, data=json.dumps(data), headers=headers)
    assert resp.status_code == 201
    assert resp.json()["id"] != ""
    print(resp.text)

def test_create_secret_without_expiration_time():
    data = {
      "passphrase": "",
      "message": "Droplets are cool"
    }
    resp = requests.post(url, data=json.dumps(data), headers=headers)
    assert resp.status_code == 201
    assert resp.json()["id"] != ""
    print(resp.text)

def test_create_secret_with_empty_message():
    data = {
      "passphrase": "hola",
      "message": "",
      "expiration_time": 100
    }
    resp = requests.post(url, data=json.dumps(data), headers=headers)
    assert resp.status_code == 400
    assert resp.json()["detail"] == "Message can't be empty"
    print(resp.text)