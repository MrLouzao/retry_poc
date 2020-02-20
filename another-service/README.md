# Another service

Microservice deploying a REST API for testing microservice failures.

## Run

1. Install flask

```
pip install Flask==0.10.1
```

2. Execute with Python:

```
python server.py
```

An instance running on port 5000 will be deployed.


### GET always 200 endpoint

```
curl -X GET  http://localhost:5000/success
```

### GET for delay request endpoint

```
curl -X GET  http://localhost:5000/delay
```

### GET for 500 internal server error endpoint

```
curl GET  http://localhost:5000/service-error
```

### POST new delay time

```
curl -X POST  -H "Content-Type: application/json" -d '{"time": 10}'  http://localhost:5000/set-delay
```

## Run with docker

1. Create the image:

```
docker build -t another-service .
```

2. Docker run: 
```
docker run -it -rm --name another-service -p 5000:5000 another-service
```
