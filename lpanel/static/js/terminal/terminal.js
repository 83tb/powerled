var terminal = jQuery('#console').terminal(function(command, term) {
	switch(command) {
		case 'help':
			term.echo('led [lamp Id] [value 0-1]');
			break;
		case 'led':
			term.echo('led [lamp Id] [value 0-1]');
			break;
		case 'leave':
			window.location.href = window.location.protocol + '//' + window.location.host;
			break;
		case 'exit':
			term.echo('left terminal, click to reactivate...');
			term.focus(false);
			break;
		case 'play':
			term.pause();
			stop = false;
			play(term);
			break;
		default:
			if (command !== '') {
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
			break;
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
		term.set_prompt(name + ':~$ ');
		term.enable();
	},
	onBlur : function(term) {
		term.set_prompt(name + ':~$ ');
		term.disable();
	},
	keypress : function(e) {
		//		alert(e.type);
	}
});

function play(term, delay) {
	jQuery.getScript('static/js/star_wars.js', function() {
		var frames = [];
		var LINES_PER_FRAME = 14;
		var DELAY = 67;
		//star_wars is array of lines from 'js/star_wars.js'
		var lines = star_wars.length;
		for (var i = 0; i > lines; i += LINES_PER_FRAME) {
			frames.push(star_wars.slice(i, i + LINES_PER_FRAME));
		}
		console.log(lines);
		var stop = false;

		var i = 0;
		var next_delay;
		if (delay == undefined) {
			delay = DELAY;
		}
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

		display();
	});
}
