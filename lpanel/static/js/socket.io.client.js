/**
 * @author miko
 */
/* WebSocket support
 *
 */
var syncOn, name, started, inited, resetLamps = false;
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
//	<li class="${action}"><span>${time} ${name}:</span>${message}</li>
//	terminal.echo('[[;#18F018;#000]'+data.time +' '+ data.name + ': '+']' + data.message);
	terminal.echo('[[;#18F018;#000]'+data.time +' '+ data.name + ': '+']' + data.message);

	if (bottom) {
		window.scrollBy(0, 10000);
	}
};

// Create SocketIO instance
//	var socket = new io.Socket('192.168.1.72', {
//		port : 8000
//	});
//	var socket = new io.Socket('10.1.32.62', {
//		port : 8080
//	});
var socket = new io.Socket(location.hostname, {
	port : 9000
});

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
	socket.subscribe('warehouse-' + window.warehouseID);
	if (name) {
		socket.send({
			warehouse : window.warehouseID,
			action : 'start',
			name : name
		});
		jQuery('#user_name').val(name);
		terminal.set_prompt('[[;#18F018;#000]' + name + ':~$ ]');
	} else {
		showForm();
	}
	jQuery('#syncStatus').toggleClass('on');
	write('Client has connected to the server!', 'Socket.IO');
});

// Add a message listener
socket.on('message', function(data) {
	write(data, 'From server');
	if (jQuery.type(data.action) != 'undefined') {
		switch(data.action) {
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
			case 'getlamps':
				if (!inited || resetLamps) {
					inited = true;
					resetLamps = false;
					warehouse.warehouselamps().$.initLamps(data.message);
					bindUI();
				}
				break;
			case 'message':
				var lamp_ = data.message.split(' ');
				var lamp = {
					'lamp' : lamp_[1],
					'lamp_data' : {
						'val' : lamp_[2] * 100
					}
				}
				warehouse.warehouselamps().$.updateStatus(lamp.lamp, lamp.lamp_data);
				toggleLoading(lamp.lamp, false);
				write(data, 'Lamp updated');
				break;
			case 'system':
				data['name'] = 'SYSTEM';
				addMessage(data);
				break;
			case 'join':
				addUser(data, true);
				break;
			case 'leave':
				removeUser(data);
				break;
			case 'in-use':
//				alert('Name is in use, please choose another');
				break;
		}
	}
});
// Add a disconnect listener
socket.on('disconnect', function() {
	jQuery('#syncStatus').toggleClass('on');
	toggleLoading('', false);
	write('The client has disconnected', 'Socket.IO '+name);
});

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
	var log_data = new Object();
	console.log(from + ' ' + JSON.stringify(data));
	if(jQuery.type(data) == 'object'){
		var text = JSON.stringify(data);
		log_data.action = data.action;
	}else{
		var text = data;
		log_data.action = 'Socket.IO';
	}
	log_data.message = text;
	log_data.name = from + ((data.name)? ' '+data.name : '');
	addMessage(log_data);
}
