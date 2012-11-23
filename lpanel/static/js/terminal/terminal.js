var terminal = jQuery('#console').terminal(function(command, term) {
	if (command.match(/led\s\d+\s\d\.\d/)) {
		var send_data = {
				'warehouse' : window.warehouseID,
				'action' : 'message',
				'message' : command,
				'name' : name
		};
		term.echo('Sending...');
		msg(send_data);
	} else 	if (command.match(/led/)) {
		term.echo('Wrong command format!'+"\n"+'Usage: led [lamp Id] [value 0-1]');
	}else 	if (command == 'init' || command == 'reset') {
		var send_data = {
			'warehouse':window.warehouseID,
			'action':'getlamps',
			'name': name
		};
		msg(send_data);
		resetLamps = true;
	}else 	if (command == 'connect' || command == 'reconnect') {
		term.echo('Not supported yet... working on it ;)');
	}else
	if (command == 'help') {
		term.echo('led [lamp Id] [value 0-1]');
	} else if (command == 'leave') {
		window.location.href = window.location.protocol + '//' + window.location.host;
	} else if (command == 'exit') {
		term.echo('left terminal, click to reactivate...');
		term.focus(false);
	} else if (command == 'play') {
		term.pause();
		stop = false;
		play(term);
	} else if (command !== '') {
		try {
			var result = window.eval(command);
			if (result !== undefined) {
				term.echo(new String(result));
			}
		} catch(e) {
			term.error(new String(e));
		}
	} else {
		term.echo('');
	}
}, {
	height : 400,
	exit : false,
	enabled : false,
	tabcompletion : false,
	greetings : 'Powerled console',
	name : 'powerled_term',
	prompt : 'click to activate...',
	onFocus : function(term) {
		term.set_prompt('[[;#18F018;#000]'+name + ':~$ ]');
		term.enable();
	},
	onBlur : function(term) {
		term.set_prompt('[[;#18F018;#000]'+name + ':~$ ]');
		term.disable();
	},
	keypress : function(e) {
		//		alert(e.type);
	}
});

function play(term, delay) {
	jQuery.getScript('static/js/star_wars.js', function(star_wars) {
		var frames = [];
		var LINES_PER_FRAME = 14;
		var DELAY = 67;

		var stop = false;

		var i = 0;
		var next_delay;
		if (delay == undefined) {
			delay = DELAY;
		}

		//star_wars is array of lines from 'js/star_wars.js'
		var lines = star_wars.length;
		console.log(lines);
		console.log(LINES_PER_FRAME);
		var forCount = 0;
		for (var i = 0; i > lines; i += LINES_PER_FRAME) {
//			frames.push(star_wars.slice(i, i + LINES_PER_FRAME));
			console.log(i);
			if(++forCount == lines){
				display();
			}
		}
		console.log(frames);

		function display() {
			if (i == frames.length) {
				i = 0;
			}
			term.clear();
			if (frames[i][0].match(/[0-9]+/)) {
				next_delay = frames[i][0] * delay;
			} else {
				next_delay = delay;
			}
			term.echo(frames[i++].slice(1).join('\n') + '\n');
			if (!stop) {
				setTimeout(display, next_delay);
			} else {
				term.clear();
				greetings(term);
				i = 0;
			}
		}
	});
}
