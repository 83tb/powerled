#!/usr/bin/python
# -*- coding: utf-8 -*-

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

#set_dim_level(9, 0.1)    

class ArduinoControl (Thread):
    def __init__(self, text):
        Thread.__init__(self)
        self.text=text

    def run(self):
	    self.text = str(self.text)
            if "led" in self.text:
		led_pin = self.text.split()[1]
		#print led_pin
		dim_level = self.text.split()[2]
		#print dim_level
		set_dim_level(int(led_pin), float(dim_level))
		#if led_pin in range(9,13):
		    
		#    if dim_level > -1 and dim_level < 256:
		        
		    
		
              
	      