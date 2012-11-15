#!/usr/bin/env python


import os
# Set the DJANGO_SETTINGS_MODULE environment variable.
os.environ['DJANGO_SETTINGS_MODULE'] = "settings"

#from lpanel.arduino import set_dim_level

#from models import set_dim_level

import sys
from rq import Queue, Connection, Worker

# Preload libraries

#from pyfirmata import Arduino, util
#board = Arduino('/dev/tty.usbmodemfa141')

#from arduinoControl import ArduinoControl
#from models import Warehouse
#from threading import Thread
#from firmata import *






# Provide queue names to listen to as arguments to this script,
# similar to rqworker
with Connection():
    qs = map(Queue, sys.argv[1:]) or [Queue()]

    w = Worker(qs)
    print w
    print w.work()
    #w.work()