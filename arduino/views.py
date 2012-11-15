# -*- coding: utf-8 -*-


from django.shortcuts import  render_to_response
from forms import CommandForm
from powerled.arduino.arduinoControl import ArduinoControl

def commandline(request):
    text=""
    morse=[]
    if request.method == 'GET':         
        form = CommandForm(request.GET) 
        if form.is_valid():
            text = form.cleaned_data['text']
            arduino=ArduinoControl(text)
            arduino.run()
        else:
            queryset = []
    form = CommandForm() 
    return render_to_response("arduino/index.html", {'form': form, "text": text})
    
