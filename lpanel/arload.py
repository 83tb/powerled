from arduino import ArduinoControl



def set_dim_level(led_pin, dim_level):
    print "Setting.."
    print "Led Pin: " + str(led_pin) + "\n"
    print "Dim Level: " + str(dim_level) + "\n"

    arduino=ArduinoControl("led " + str(led_pin) + " " + str(dim_level))
    arduino.run()


