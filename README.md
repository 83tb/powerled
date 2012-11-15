# POWERLED

## Installation


### Getting the source

```python
git clone https://github.com/83tb/powerled.git
cd powerled/
```

### Required packages
```python
# we're gonna need redis for our workers
apt-get install redis-server

# to install all python packets needed for powerled to work
pip install -r requirements.txt
```

## how it works

*Powerled are two webservers, worker process(es) and clients*


##### First server - classic web server, port 80

For handling main traffic, standard http requests, etc

##### Second server - websocket handler, port 9000

For asynchronous communication between all nodes of the network.

##### Worker process

Can be more than one. Responsible for talking to hardware.

##### Clients

* mobile
* html5 tablets
* desktop




## usage

### Prepare everything before first run

```python
python2.7 manage.py syncdb

```

This will prepare database for slowly changing things, like warehouses, lamp layouts, etc.



### Run main server
```python
python2.7 manage.py runserver 0.0.0.0:80

```

###Run websocket server
```python
python2.7 manage.py runserversocketio 0.0.0.0:9000

```

### Run Redis

It's a NoSQL data store. Not like MongoDB (which is a disk-based document data store), though MongoDB could be used for similar key/value use cases. The closest analog is probably to think of Redis as Memcached, but with built-in persistence (snapshotting or journaling to disk) and more datatypes.

Those two additions may seem pretty minor, but they are what make Redis pretty incredible. Persistence to disk means you can use Redis as a real database instead of just a volatile cache. The data won't disappear when you restart, like with memcached.

The additional data types are probably even more important. Key values can be simple strings, like you'll find in memcached, but they can also be more complex types like Hashes, Lists (ordered collection, makes a great queue), Sets (unordered collection of non-repeating values), or Sorted Sets (ordered/ranked collection of non-repeating values).

This is only the tip of the Redis iceburg, as there are other powerful features like built-in pub/sub and transactions (with optimistic locking).



###Run worker
```python
python rqworker.py

```





