# Helm Chart

## Development Deployment

### Requirements
* minikube with 4cpu and 6GB memory

### Build Images for Minikube
```bash
# Source Minikube Docker Config
eval $(minikube docker-env)

# Build Frontend Image
cd <repo>/frontend
docker build . -t ots_frontend

# Build Backend Image
cd <repo>/backend
docker build . -t ots_backend
```

### Enable Addons
```bash
minikube addons enable ingress
minikube addons enable metrics-server
```

### Update Local DNS
```bash
<minikube ip> api.ots.com ots.com
```

### Redis Database
```bash
docker run --rm -p 6379:6379 --name redis redis
```

### Helm Install
```bash
cd <repo>/helm-charts
helm install ots ./ots/ -f ots/values.yaml
```
### Access UI and API
https://ots.com

https://api.ots.com/docs

## Production Deployment
