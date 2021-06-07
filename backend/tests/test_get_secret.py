import requests
import json

c_url = 'http://127.0.0.1:5000/create_secret'
g_url = 'http://127.0.0.1:5000/get_secret'
headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

def test_get_secret():
    c_data = {
      "passphrase": "hello",
      "message": "Droplets are cool",
      "expiration_time": 100
    }
    c_resp = requests.post(c_url, data=json.dumps(c_data), headers=headers)
    _id = c_resp.json()["id"]

    g_data = {
      "passphrase": "hello",
      "id": _id
    }

    g_resp = requests.post(g_url, data=json.dumps(g_data), headers=headers)
    assert g_resp.status_code == 200
    assert g_resp.json()["message"] != ""
    print(g_resp.text)

def test_get_secret_with_missing_id():
    data = {
      "passphrase": "hello"
    }
    resp = requests.post(g_url, data=json.dumps(data), headers=headers)
    assert resp.status_code == 422
    print(resp.text)

def test_get_secret_with_missing_passphrase():
    data = {
      "id": "hello"
    }
    resp = requests.post(g_url, data=json.dumps(data), headers=headers)
    assert resp.status_code == 400
    assert resp.json()["detail"] == "missing passphrase"
    print(resp.text)

def test_get_secret_with_empty_id():
    data = {
      "passphrase": "hello",
      "id": ""
    }
    resp = requests.post(g_url, data=json.dumps(data), headers=headers)
    assert resp.status_code == 400
    assert resp.json()["detail"] == "missing secret message id"
    print(resp.text)

def test_get_secret_with_non_existing_id():
    data = {
      "passphrase": "hello",
      "id": "6cc6129713474b8684d229e85941a264"
    }
    resp = requests.post(g_url, data=json.dumps(data), headers=headers)
    assert resp.status_code == 404
    assert resp.json()["detail"] == "either the secret have been viewed earlier or never existed"
    print(resp.text)

def test_get_secret_with_wrong_passphrase():
    c_data = {
      "passphrase": "hello",
      "message": "Droplets are cool",
      "expiration_time": 100
    }
    c_resp = requests.post(c_url, data=json.dumps(c_data), headers=headers)
    _id = c_resp.json()["id"]

    g_data = {
      "passphrase": "hello1",
      "id": _id
    }

    g_resp = requests.post(g_url, data=json.dumps(g_data), headers=headers)
    assert g_resp.status_code == 400
    assert g_resp.json()["detail"] == "please check your passphrase again"
    print(g_resp.text)