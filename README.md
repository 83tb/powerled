# POWERLED

## Installation

* Get the source
* Install missing packets
* Run 2 servers, one ram based db and a worker process

### Getting the source

```python
git clone https://github.com/83tb/powerled.git
cd powerled/
```

### Required packages
```python
# we're gonna need redis for our workers
apt-get install redis-server python-pip

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




## Usage

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
```python
redis-server

```

Redis is a NoSQL data store. Not like MongoDB (which is a disk-based document data store).
Persistence to disk means you can use Redis as a real database instead of just a volatile cache.
The data won't disappear when you restart, like with memcached.

The additional data types are probably even more important.
Key values can be simple strings, like you'll find in memcached, but they can also be more complex types like Hashes, Lists (ordered collection, makes a great queue), Sets (unordered collection of non-repeating values), or Sorted Sets (ordered/ranked collection of non-repeating values).

We use it for handling hardware calls and information from the IO bus.


###Run worker
```python
# Adjust 5th line of the rqworker.py with your serial device address
board = Arduino('/dev/tty.usbmodemfa141')
# and then
python rqworker.py

```


## Arduino

* Arduino UNO
* USB cable
* two red diodes
* two resistors

*Diodes are connected to 9 and 10 PIN in the Arduino. Arduino has Standard Firmata as a firmware.*



## How the worker code looks now

```python
q = RedisQueue('LEDY')

# kolejka
import time

while 1:
    if not q.empty():

        text = q.get()

        if "led" in text:
            led_pin = text.split()[1]
            dim_level = text.split()[2]
            board.digital[int(led_pin)].write(float(dim_level))
            print q.get()

```


## How is adding message to the queue handled

```python
q = RedisQueue('LEDY')

@events.on_message(channel="^warehouse-")
def message(request, socket, context, message):
    """
    Event handler for a warehouse receiving a message. First validates a
    joining user's name and sends them the list of users.
    """


    warehouse = get_object_or_404(Warehouse, id=message["warehouse"])

    if message["action"] == "start":
        name = strip_tags(message["name"])
        user, created = warehouse.users.get_or_create(name=name)

        if not created:
            socket.send({"action": "in-use"})
        else:

            context["user"] = user
            users = [u.name for u in warehouse.users.exclude(id=user.id)]
            socket.send({"action": "started", "users": users})
            user.session = socket.session.session_id
            user.save()
            joined = {"action": "join", "name": user.name, "id": user.id}
            socket.send_and_broadcast_channel(joined)

    else:

        print "Testing if user ok:"

        try:
            user = context["user"]
            print "Yes"
        except KeyError:
            print "No"
            pass

        if message["action"] == "message":


            message["message"] = strip_tags(message["message"])
            try:

                message["name"] = user.name
            except:
                message["name"] = "generic"


            # Sends a message over websockets to all clients subscribed to the channel
            socket.send_and_broadcast_channel(message)

            # Put potential order to the queue
            text = str(message["message"])

            q.put(text)


```