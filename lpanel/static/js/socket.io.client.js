/**
 * @author miko
 */

var syncOn = false;
var syncOn = 'socket.io';

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
	data.time = $.map([d.getHours(), d.getMinutes(), d.getSeconds()], function(s) {
		s = String(s);
		return (s.length == 1 ? '0' : '') + s;
	}).join(':');
	addItem('#messages', data);
	if (bottom) {
		window.scrollBy(0, 10000);
	}
};

/* WebSocket support
 *
 */
if (syncOn == 'socket.io') {
	var name, started, inited = false;
	// Create SocketIO instance
	var socket = new io.Socket('192.168.1.72', {
		port : 8000
	});
//	var socket = new io.Socket('10.1.32.62', {
//		port : 8080
//	});
//	var socket = new io.Socket(location.hostname, {
//		port : 9000
//	});

	socket.connect();

	socket.on('connection', function() {
		/*		jQuery.mobile.loading('show', {
		 text : 'Connecting',
		 textVisible : true,
		 theme : 'c',
		 html : ""
		 }); */
	});

	// Add a connect listener
	socket.on('connect', function() {
		started = true;
		socket.subscribe('warehouse-' + window.warehouseID);
		if (name) {
			socket.send({
				warehouse : window.warehouseID,
				action : 'start',
				name : name
			});
		} else {
			showForm();
		}
		jQuery('#syncStatus').toggleClass('on');
		write('Client has connected to the server!', 'Socket.IO');
	});

	// Add a message listener
	socket.on('message', function(data) {
		write(data, 'Socket.IO from server');
		if (jQuery.type(data.action) != 'undefined') {
			switch(data.action) {
				case 'in-use':
					alert('Name is in use, please choose another');
					break;
				case 'started':
					started = true;
					$('#submit').val('Send');
					$('#users').slideDown();
					$.each(data.users, function(i, name) {
						addUser({
							name : name
						});
					});
					break;
				case 'init':
					if (!inited) {
						inited = true;
						warehouse.warehouselamps().$.initLamps(data.lamps);
						bindUI();
					}
					break;
				case 'join':
					addUser(data, true);
					break;
				case 'leave':
					removeUser(data);
					break;
				case 'message':
					var lamp_ = data.message.split(' ');
					var lamp = {
						'LampID' : lamp_[1],
						'lamp_data' : {
							'val' : lamp_[2] * 100
						}
					}
					warehouse.warehouselamps().$.updateStatus(lamp.LampID, lamp.lamp_data);
					toggleLoading(lamp.LampID, false);
					write(data, 'Lamp updated');
					break;
				case 'system':
					data['name'] = 'SYSTEM';
					addMessage(data);
					break;
			}
		}
	});
	// Add a disconnect listener
	socket.on('disconnect', function() {
		//		switchSync.val('off').slider('refresh');
		jQuery('#syncStatus').toggleClass('on');
		//		toggleLoading(lamp.LampID, false);
		write('The client has disconnected', 'Socket.IO');
	});
}
function msg(data) {
	//	if (syncOn == 'socket.io' && started) {
	if (syncOn == 'socket.io') {
		socket.send(data);
		write(data, 'From client');
	} else {
		return false;
	}
}

function write(data, from) {
	var time = new Date().toLocaleTimeString();
	console.log(data);
	var text = (jQuery.type(data) == 'object') ? JSON.stringify(data) : data;
//	addItem('#messages', time + ':' + text);
	jQuery("#messages").append('<li>' + time + ' ' + from + ': ' + text + '<br />');
	//	jQuery("#log").prepend(time +' '+ from + ': ' + text +'<br />');
}
