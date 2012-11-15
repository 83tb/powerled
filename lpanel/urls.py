
from django.conf.urls.defaults import patterns, include, url
from django.conf.urls.static import static


urlpatterns = patterns("lpanel.views",
    url("^$", "warehouses", name="warehouses"),
    url("^create/$", "create", name="create"),
    url("^system_message/$", "system_message", name="system_message"),
    url("^(?P<slug>.*)$", "warehouse", name="warehouse"),

)


urlpatterns += patterns('',
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': "/Users/kuba/Code/django-socketio/django_socketio/static/",
        }),
)
