
from django.contrib.auth.decorators import user_passes_test
from django.shortcuts import get_object_or_404, render, redirect
from django_socketio import broadcast, broadcast_channel, NoSocket

from models import Warehouse


def warehouses(request, template="warehouses.html"):
    """
    Homepage - lists all rooms.
    """
    context = {"warehouses": Warehouse.objects.all()}
    return render(request, template, context)


def warehouse(request, slug, template="warehouse.html"):
    """
    Show a warehouse.
    """
    context = {"warehouse": get_object_or_404(Warehouse, slug=slug)}
    return render(request, template, context)


def create(request):
    """
    Handles post from the "Add warehouse" form on the homepage, and
    redirects to the new room.
    """
    name = request.POST.get("name")
    if name:
        warehouse, created = Warehouse.objects.get_or_create(name=name)
        return redirect(warehouse)
    return redirect(warehouse)

#from powerled.arduino.arduinoControl import ArduinoControl
#arduino=ArduinoControl(message)
#arduino.run()


def system_message(request, template="system_message.html"):
    context = {"warehouses": Warehouse.objects.all()}
    if request.method == "POST":
        warehouse = request.POST["warehouse"]
        data = {"action": "system", "message": request.POST["message"]}
        try:
            if warehouse:
                broadcast_channel(data, channel="warehouse-" + warehouse)
                print "sending data" + data
                #arduino=ArduinoControl(data)
                #arduino.run()
            else:
                broadcast(data)
        except NoSocket, e:
            context["message"] = e
        else:
            context["message"] = "Message sent"
    return render(request, template, context)
