PIN = 9 # Pin 12 is used
DELAY = 2 # A 2 seconds delay

from pyfirmata import Arduino, util
board = Arduino('/dev/tty.usbmodemfa141')

DURATION = 5
STEPS = 10

# set pins in PWM mode
digital_0 = board.get_pin('d:9:p')
digital_1 = board.get_pin('d:10:p')


def set_dim_level(led_pin, dim_level):
    board.digital[led_pin].write(dim_level) # Set the LED pin to 1 (HIGH)

from lpanel.redisq import RedisQueue

from django_socketio import broadcast, broadcast_channel, NoSocket

q = RedisQueue('LEDY')
a = RedisQueue('ALARMS')

print "Connected to REDIS"
import urllib, urllib2
# kolejka
import time

while 1:
    #if not q.empty():
    #time.sleep(0.1)
    text = q.get(block=True)
    print text
        #try:
    print "LED COMMAND"
    led_pin = text.split()[1]
            #print led_pin
    dim_level = text.split()[3]
            #print dim_level
            #set_dim_level(int(led_pin), float(dim_level))

    print "Setting LED no: " + led_pin + " to brightness " + dim_level
    board.digital[int(led_pin)].write(float(dim_level))

    if float(dim_level)>0.7:
        a.put("led 9 alarm_state 1")
