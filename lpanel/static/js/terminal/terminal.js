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
	exit:false,
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
	keypress: function(e) {
//		alert(e.type);
	}
});

