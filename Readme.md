# K8S Nginx/NodeJS Sample

Sample app for K8S deployment

## Docker Compose

- Run `docker-compose up`
- Open [localhost:8080](http://localhost:8080)

## Kubernetes

- When using Minikube: `eval $(minikube docker-env)`
- Build app image: `docker build -t nodeapp/webapp:3`
- Deploy app: `kubectl apply -f k8s/deployment.yml`
- Forward port: `kubectl port-forward <pod-name> 8000`
- Open [localhost:8000](http://localhost:8000)
