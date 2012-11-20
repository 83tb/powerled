$(function() {

    var name, started = false;

/*
    var addItem = function(selector, item) {
        var template = $(selector).find('script[type="text/x-jquery-tmpl"]');
        template.tmpl(item).appendTo(selector);
    };

    var addUser = function(data, show) {
        addItem('#users', data);
        if (show) {
            data.message = 'joins';
            addMessage(data);
        }
    };

    var removeUser = function(data) {
        $('#user-' + data.id).remove();
        data.message = 'leaves';
        addMessage(data);
    };

    var addMessage = function(data) {
        var d = new Date();
        var win = $(window), doc = $(window.document);
        var bottom = win.scrollTop() + win.height() == doc.height();
        data.time = $.map([d.getHours(), d.getMinutes(), d.getSeconds()],
                          function(s) {
                              s = String(s);
                              return (s.length == 1 ? '0' : '') + s;
                          }).join(':');
        addItem('#messages', data);
        if (bottom) {
            window.scrollBy(0, 10000);
        }
    };
*/

/*
    $('form').submit(function() {
        var value = $('#message').val();
        if (value) {
            if (!started) {
                name = value;
                data = {warehouse: window.warehouseID, action: 'start', name: name};
            } else {
                data = {warehouse: window.warehouseID, action: 'message', message: value};
            }
//            socket.send(data);
            msg(data);
        }
        $('#message').val('').focus();
        return false;
    });*/


    $('#leave, #masterButton').click(function() {
        location = '/';
    });

    var socket;

    var connected = function() {
        socket.subscribe('warehouse-' + window.warehouseID);
        if (name) {
            socket.send({warehouse: window.warehouseID, action: 'start', name: name});
        } else {
            showForm();
        }
    };

    var disconnected = function() {
        setTimeout(start, 1000);
    };

    var messaged = function(data) {
        switch (data.action) {
            case 'in-use':
                alert('Name is in use, please choose another');
                break;
            case 'started':
                started = true;
                $('#submit').val('Send');
                $('#users').slideDown();
                $.each(data.users, function(i, name) {
                    addUser({name: name});
                });
                break;
            case 'join':
                addUser(data, true);
                break;
            case 'leave':
                removeUser(data);
                break;
            case 'message':
                addMessage(data);
                break;
            case 'system':
                data['name'] = 'SYSTEM';
                addMessage(data);
                break;
        }
    };

//    var start = function() {
//        socket = new io.Socket();
//        socket.connect();
//        socket.on('connect', connected);
//        socket.on('disconnect', disconnected);
//        socket.on('message', messaged);
//    };
//
//    start();

});


