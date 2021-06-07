import requests

def test_health():
    url = 'http://127.0.0.1:5000/health'    
    resp = requests.get(url)           
    assert resp.status_code == 200
    assert resp.json()["health"] == "ok"
    print(resp.text)