# POWERLED

## Installation


### Getting the source

```python
git clone https://github.com/83tb/powerled.git
cd powerled/
```

### Required packages
```python
pip install -r requirements.txt
```

## how it works

Powerled are two webservers, worker process(es) and clients
===========================================================

##### First server - classic web server, port 80

For handling main traffic, standard http requests, etc

##### Second server - websocket handler, port 9000

For asynchronous communication between all nodes of the network.

##### Worker process

Can be more than one. Responsible for talking to hardware.

## usage


### Run main server
```python
python2.7 manage.py runserver 0.0.0.0:80

```

###Run websocket server
```python
python2.7 manage.py runserversocketio 0.0.0.0:9000

```

###Run worker
```python
python rqworker.py

```





