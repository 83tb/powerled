
from django.shortcuts import get_object_or_404
from django.utils.html import strip_tags
from django_socketio import events


from models import Warehouse

from redisq import RedisQueue
#def set_dim_level(led_pin, dim_level):
#    .digital[led_pin].write(dim_level) # Set the LED pin to 1 (HIGH)

#from rqwrk import set_dim_level

q = RedisQueue('LEDY')





@events.on_message(channel="^warehouse-")
def message(request, socket, context, message):
    """
    Event handler for a warehouse receiving a message. First validates a
    joining user's name and sends them the list of users.
    """
    #print "Taki string przychodzi:" + message

    print message

    try:
        warehouse = get_object_or_404(Warehouse, id=message["warehouse"])
    except:
        warehouse = get_object_or_404(Warehouse, id=1)


    #message = dict(message)
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

        if message["action"] == "getlamps":


            #message["message"] = strip_tags(message["message"])
            #try:

            #    message["name"] = user.name
            #except:
            message["name"] = "generic"


            message['message'] = '''{"1":{"val": 81, "temp": 215, "state": 1, "lux": 931},"2":{"val": 59, "temp": 135, "state": 1, "lux": 1006},"3":{"val": 1, "temp": 31, "state": 3, "lux": 914},"4":{"val": 30, "temp": 164, "state": 3, "lux": 962},"5":{"val": 78, "temp": 178, "state": 4, "lux": 1106},"6":{"val": 80, "temp": 300, "state": 2, "lux": 970},"7":{"val": 3, "temp": 23, "state": 4, "lux": 439},"8":{"val": 75, "temp": 21, "state": 3, "lux": 667},"9":{"val": 68, "temp": 214, "state": 2, "lux": 316},"10":{"val": 100, "temp": 155, "state": 1, "lux": 120},"11":{"val": 22, "temp": 54, "state": 2, "lux": 1076},"12":{"val": 60, "temp": 330, "state": 2, "lux": 1118},"13":{"val": 3, "temp": 60, "state": 4, "lux": 696},"14":{"val": 48, "temp": 262, "state": 3, "lux": 145},"15":{"val": 79, "temp": 219, "state": 3, "lux": 600}}'''




            # Sends a message over websockets to all clients subscribed to the channel
            socket.send_and_broadcast_channel(message)


            #q.put(text)



@events.on_finish(channel="^warehouse-")
def finish(request, socket, context):
    """
    Event handler for a socket session ending in a room. Broadcast
    the user leaving and delete them from the DB.
    """
    try:
        user = context["user"]
    except KeyError:
        return
    left = {"action": "leave", "name": user.name, "id": user.id}
    socket.broadcast_channel(left)
    user.delete()
