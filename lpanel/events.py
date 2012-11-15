
from django.shortcuts import get_object_or_404
from django.utils.html import strip_tags
from django_socketio import events




#from arduinoControl import ArduinoControl
from models import Warehouse


from threading import Thread
from firmata import *

PIN = 9 # Pin 12 is used
DELAY = 2 # A 2 seconds delay


from pyfirmata import Arduino, util
board = Arduino('/dev/tty.usbmodemfa141')

#board.digital[PIN].write(1) # Set the LED pin to 1 (HIGH)
#board.digital[PIN].write(0) # Set the LED pin to 0 (LOW)

#board.digital[PIN].mode = PWM
#board.digital[PIN].write(256)

DURATION = 5
STEPS = 10

digital_0 = board.get_pin('d:9:p')
digital_1 = board.get_pin('d:10:p')

#board.digital[PIN].write(0.9)

# Waiting time between the
#wait_time = DURATION/float(STEPS)

# Note: Value range for PWM is 0.0 till 1.0

# Up
#for i in range(1, STEPS + 1):
#    value = i/float(STEPS)
#    digital_0.write(value)
#    board.pass_time(wait_time)

# Down
#increment = 1/float(STEPS)
#while STEPS > 0:
#    value = increment * STEPS
#    digital_0.write(value)
#    board.pass_time(wait_time)
#    STEPS = STEPS - 1

def set_dim_level(led_pin, dim_level):
    board.digital[led_pin].write(dim_level) # Set the LED pin to 1 (HIGH)


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
        #if True:
            context["user"] = user
            users = [u.name for u in warehouse.users.exclude(id=user.id)]
            socket.send({"action": "started", "users": users})
            user.session = socket.session.session_id
            user.save()
            joined = {"action": "join", "name": user.name, "id": user.id}
            socket.send_and_broadcast_channel(joined)

    else:

        #print "Testing if user ok:"

        try:
            user = context["user"]
            print "Yes"
        except KeyError:
            print "No"
            pass

        if message["action"] == "message":
            print "Yeah, this is the message"

            message["message"] = strip_tags(message["message"])
            try:

                message["name"] = user.name
            except:
                message["name"] = "generic"

            socket.send_and_broadcast_channel(message)


            text = str(message["message"])




            try:

                led_pin = text.split()[1]
                #socket.send_and_broadcast_channel(led_pin)
                #print led_pin
                dim_level = text.split()[2]
                #socket.send_and_broadcast_channel(dim_level)
                #print dim_level
                set_dim_level(int(led_pin), float(dim_level))
                print "Dimming"
            except:
                pass





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
