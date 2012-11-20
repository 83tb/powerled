/**
 * @author miko
 */
	/* Our spiral gradient data */
//	var brightGrad = "data:image/jpg/png/gif;base64,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";
//	var brightGrad = "data:image/jpg/png/gif;base64,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";
//	var brightnessImg = new Image();
//	brightnessImg.src = brightGrad; //'light.jpg';

var tempGrad = "data:image/jpg/png/gif;base64,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";
var tempImg = new Image();
tempImg.src = tempGrad; //'temperature.jpg';

(function($) {
	var WarehouseLamps = function(element, params) {
		var obj = this;
		var element = $(element);
		var container = '<div></div>';

		/* Specify default settings */
		var defaults = {
			'class' : '.lamp',
			height : 256,
			width : 256,
			lamps : {},
			maxTemp: 250,
			maxLux: 1000,
			colors : {
				brightness:'#ffc000',
				temp:tempImg,
				on:{start:'#b9ce44',end:'#72aa00'},
				off:{start:'#555555',end:'#111111'},
				attention:{start:'#ffc000',end:'#ff6600'},
				error:{start:'#ff1a00',end:'#a50101'},
				infobar:{start:'#ffffff',end:'#e1e1e1'},
				stroke:'rgba(137,137,137,0.6)',//#898989
				font:{start:'#e4e6e5',end:'#fffefc'},
				shadow:'white -1px -1px 2px, black 1px 1px 3px',
				lineWidth:2
			},
			debug : true
		};
		/* Override/merge settings with params */
		var settings = $.extend(defaults, params || {});

		obj.warehouseID = settings.warehouseID;
		obj.user = settings.user;

		this.getContainer = function() {
			return element;
		};

		this.getConfig = function() {
			return settings;
		};

		this.createLamp = function(lampID) {
			obj[lampID] = new powerLamp(obj);
			obj[lampID].drowLamp(lampID);
			obj.dumpData(obj[lampID]);
			return obj;
		}
		this._updateStatus = function(lampID, lamp_data) {
			var type = jQuery.type(lampID);
			obj.dumpData({'_updateStatus':type});

			if(type == 'string'){
				obj[lampID].updateLamp(lamp_data);
				obj.dumpData({'_updateStatus':obj[lampID]});
			}else if(type == 'object'){
				lampID.updateLamp(lamp_data);
				obj.dumpData({'_updateStatus':lampID});
			}else{
				return false;
			}
		}
		this._getLamp = function(itemID) {
			if(jQuery.type(obj[itemID]) == 'object'){
				var lamp = obj[itemID];
				obj.dumpData({'_getLamp':lamp});
				return lamp;
			}
		}

		this.dumpData = function(array) {
			if (settings.debug) {
				console.log(array);
//				$("#log").append(printObj(array) + '<br />');
			}
		}

		this._initLamps = function(lamps_data) {
//			var lamps_data = '"1":{"val": 12, "temp": 90, "state": 3, "lux": 929},"2":{"val": 9, "temp": 29, "state": 4, "lux": 1160}';
			var data = jQuery.parseJSON(lamps_data.replace(/\'/g, '"'));
			$.each(data, function(lamp, lamp_data) {
				obj.createLamp(lamp);
				obj._updateStatus(lamp, lamp_data);
			});
		}
		obj.dumpData(obj);

		return {
			initLamps: function(lamps) {
				obj._initLamps(lamps);
			},
			getLamp: function(itemID) {
				LampID = obj._getLamp(itemID);
				obj.dumpData({'getLamp':LampID});
//				return {'mm':LampID};
			},
			updateStatus: function(lampID, lamp_data) {
				obj.dumpData({'updateStatus':{'lampID':lampID,'lamp_data':lamp_data}});
				return obj._updateStatus(lampID, lamp_data);
			}
		}
	}
	/* Warehouse single lamp object
	 * 
	 */
	var powerLamp = function(warehouselamps) {

		var obj = this;
		var warehouse = warehouselamps;
		var settings = warehouse.getConfig();
		var container = warehouse.getContainer();
		var lampContainer = $('<div></div>');
//		var valueText = $('<p></p>');
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext("2d");

		/* Centre point */
		var cX = (settings.width / 2);
		var cY = (settings.height / 2);

		/* Nicer to pass counterClockwise / clockwise into canvas functions
		 * than true / false */
		var counterClockwise = false;

		var Phi = (1+Math.sqrt(5))/2;

		/* Bottom left angle */
		var startAngle = Math.PI * 0.5 + Math.PI/6;

		/* Bottom right angle */
		var endAngle = Math.PI - startAngle + (Math.PI * 2.0);

		/* Calculate radius */
		/* Outer radius is the same as the width / 2, same as the centre x
		 * (but we leave a little room so the borders aren't truncated) */
		var radius = cX - settings.colors.lineWidth+1;
		/* The inner circle is ~2/3rds the size of the outer one */
		var innerRadius = radius * 1/Phi;
		var outerBarRadius = radius;
		var outerBarWidth = radius * 1/Math.pow(Phi,3);
		var innerBarRadius = outerBarRadius - outerBarWidth;
		var innerBarWidth = radius * 1/Math.pow(Phi,4);

		/* Calculate the size of the font based on the canvas size */
		var fontSize = radius * 1/Math.pow(Phi,3);

		/* Borders should be 1px */
		ctx.lineWidth = settings.colors.lineWidth;

//		this.edit = function(event) {
//			/* turn on/off on click */
//			var val = obj.lamp.val;
//			var temp = obj.lamp.temp;
//			switch(obj.lamp.state) {
//				case 1:
//					var state = 4;
//					break;
//				case 4:
//					var state = 1;
//					break;
//				default:
//					var state = obj.lamp.state;
//			}
//			obj.updateLamp(val, temp, state);
//			$(settings.class).removeClass('clicked');
//			lampContainer.addClass('clicked');

//			LampID = obj;
//			return LampID;
//		}
//		lampContainer.click(this.edit);
//		lampContainer.dblclick(this.edit);
//		lampContainer.single_double_click(this.edit('sin'), this.edit('db'));

		this.updateLamp = function(lamp_data) {
			warehouse.dumpData({'updateLamp':obj.lamp_data});
			warehouse.dumpData({'updateLamp':lamp_data});
			obj.lamp_data = {
				'val' : (typeof lamp_data.val != 'undefined')? lamp_data.val : obj.lamp_data.val,
				'temp' : (typeof lamp_data.temp != 'undefined')? lamp_data.temp : obj.lamp_data.temp,
				'state' : (typeof lamp_data.state != 'undefined')? lamp_data.state : obj.lamp_data.state,
				'lux' : (typeof lamp_data.lux != 'undefined')? lamp_data.lux : obj.lamp_data.lux
			}
			ctx.clearRect(0, 0, settings.width, settings.height);
			var tempPRC = obj.lamp_data.temp/settings.maxTemp;
			var luxPRC = obj.lamp_data.lux/settings.maxLux;
			obj.procentCircle(parseInt(obj.lamp_data.val)/100, tempPRC, obj.lamp_data.state, luxPRC);
			obj.setText(obj.lamp_data.val, obj.lamp_data.temp, obj.lamp_data.state, obj.lamp_data.lux);
		}

		this.drowLamp = function(lampID) {
//			warehouse[lampID] = obj;
//			obj.lamp_data = lamp_data;
//			var val = lamp.val;
//			var temp = lamp.temp;
//			var state = lamp.state;

			lampContainer.attr({
				'id' : lampID,
				'name' : lampID,
				'class' : 'lamp'
			}).css({
				'height' : settings.height + 'px',
				'width' : settings.width + 'px',
				'position' : 'relative'
			});
			container.append(lampContainer);

//			valueText.css({
//				'color': settings.colors.font,
//				'font' : fontSize.toString() + 'px BebasNeueRegular',
//				'height' : fontSize.toString() + 'px',
//				'textShadow' : settings.colors.shadow,
//				'top' : ((settings.height / 2) - (fontSize / 2)).toString() + 'px',
//				'width' : (settings.width - 2).toString() + 'px',
//				'textAlign' : 'center',
//				'overflow' : 'hidden',
//				'left' : 0,
//				'position' : 'absolute'
//			});
//			/* Force text items to not allow selection */
//			selectors = ['-webkit-user-select', '-khtml-user-select', '-moz-user-select', '-o-user-select', 'user-select'];
//			for ( s = 0; s < selectors.length; s += 1) {
//				valueText.css(selectors[s], 'none');
//			}
//			lampContainer.append(valueText);

			/* Create our canvas object */
			canvas.setAttribute('width', settings.width);
			canvas.setAttribute('height', settings.height);
			lampContainer.append(canvas);

//			/* Drow canvas content when image is loaded 
//			 * - this is fix for chrome/chromium, not loading images initialy! */
//			tempImg.addEventListener('load', function(e) {
//				obj.updateLamp(lamp_data);
//			}, true);
		}
		this.procentCircle = function(val, temp, state, lux) {
			warehouse.dumpData({'procentCircle':{'val':val,'temp':temp,'state':state,'lux':lux}});

//			ctx.shadowColor = "#ffffff";
//			ctx.shadowOffsetX = 0;
//			ctx.shadowOffsetY = 0;
			ctx.shadowBlur = 0;

			ctx.fillStyle = "#E2F4FB";
			ctx.beginPath();
			ctx.arc(cX, cY, radius, startAngle, endAngle, counterClockwise);
			ctx.closePath();
			ctx.fill();

			/* Drow state circle */
//			var stateGrad = ctx.createLinearGradient(cX, cX * 0.133333, cX, canvas.height - cX * 0.133333);
//			var stateGrad = ctx.createRadialGradient(cX, cX * 0.133333, 0, cX, cX * 0.133333, innerRadius);
			var stateColor = obj.getStateColor(state, val);
			var stateGrad = ctx.createRadialGradient(cX, cX + cX * 0.133333, 0, cX, cX + cX * 0.133333, cX);
			stateGrad.addColorStop(0, stateColor.start);
			stateGrad.addColorStop(1, stateColor.end);
			/* draw inner circle */
			ctx.fillStyle = stateGrad;
			ctx.beginPath();
			ctx.arc(cX, cY, innerRadius, 0, Math.PI * 2, counterClockwise);
			ctx.fill();


			/* Drow brightness bar */
			completeAngle = startAngle + (val * (endAngle - startAngle));
			ctx.beginPath();
			ctx.arc(cX, cY, outerBarRadius, completeAngle, startAngle, true);
			ctx.arc(cX, cY, outerBarRadius - outerBarWidth, startAngle, completeAngle, false);
			var point = obj.applyAngle({x:cX,y:cY}, completeAngle, outerBarRadius);
			ctx.lineTo(point.x,point.y-(settings.colors.lineWidth/2));

			/* We're going to apply a clip so save the current state */
			ctx.save();
			/* Clip so we can apply the image gradient */
			ctx.clip();

//			/* Draw the spiral gradient over the clipped area */
//			ctx.drawImage(settings.colors.brightness, 0, 0, canvas.width, canvas.height);
			ctx.fillStyle=settings.colors.brightness;
			ctx.fill();

			/* Undo the clip */
			ctx.restore();


			/* Add stroke
			 *  - mostly fix for Chrome/Chromium not anty-aliasing image in canvas */
			ctx.lineWidth = settings.colors.lineWidth/2;
			ctx.strokeStyle = settings.colors.stroke;
			ctx.stroke();


			/* Drow temperature bar */
			completeAngle = startAngle + (temp * (endAngle - startAngle));
			ctx.beginPath();
			ctx.arc(cX, cY, innerBarRadius, completeAngle, startAngle, true);
			ctx.arc(cX, cY, innerBarRadius - innerBarWidth, startAngle, completeAngle, false);
			var point = obj.applyAngle({x:cX,y:cY}, completeAngle, innerBarRadius);
			ctx.lineTo(point.x,point.y-(settings.colors.lineWidth/2));

			/* We're going to apply a clip so save the current state */
			ctx.save();
			/* Clip so we can apply the image gradient */
			ctx.clip();
			/* Draw the spiral gradient over the clipped area */
			ctx.drawImage(settings.colors.temp, 0, 0, canvas.width, canvas.height);
			/* Undo the clip */
			ctx.restore();

			/* Add stroke
			 *  - mostly fix for Chrome/Chromium not anty-aliasing image in canvas */
			ctx.lineWidth = settings.colors.lineWidth;
			ctx.strokeStyle = settings.colors.stroke;
			ctx.stroke();


			/* Drow lux bar */
			completeAngle = startAngle + (lux * (endAngle - startAngle));
			ctx.beginPath();
//			ctx.arc(cX, cY, innerBarRadius, completeAngle, startAngle, true);
			ctx.arc(cX, cY, outerBarRadius - outerBarWidth/2, startAngle, completeAngle, false);
			var point = obj.applyAngle({x:cX,y:cY}, completeAngle, outerBarRadius-outerBarWidth);
			ctx.moveTo(point.x,point.y+(settings.colors.lineWidth/2));
			var point = obj.applyAngle({x:cX,y:cY}, completeAngle, outerBarRadius);
			ctx.lineTo(point.x,point.y-(settings.colors.lineWidth/2));

			/* Add stroke
			 *  - mostly fix for Chrome/Chromium not anty-aliasing image in canvas */
			ctx.lineWidth = settings.colors.lineWidth;
			ctx.strokeStyle = 'rgba(99, 99, 99, 0.7)';//settings.colors.stroke;
			ctx.stroke();


			/* Drow trapeze */
			var pointS = obj.applyAngle({x:cX,y:cY}, startAngle, innerRadius);
			var pointS2 = obj.applyAngle({x:cX,y:cY}, startAngle, outerBarRadius);
			var pointE = obj.applyAngle({x:cX,y:cY}, endAngle, outerBarRadius);
			var x = pointS2.x - settings.colors.lineWidth;
			var y = pointS.y - 2*settings.colors.lineWidth;
			var x2 = pointE.x  + settings.colors.lineWidth;
			var y2 = pointE.y + 2*settings.colors.lineWidth;

			var w = x2 - x;
			var h = y2 - y;
			var diff = (pointS.x - settings.colors.lineWidth-x)*2;
			var rad = 5;

			var d = Math.sqrt(Math.pow(h,2) + Math.pow(diff/2,2));
			var radShiftX = diff/2 * rad/d;
			var radShiftY = h * rad/d;

			obj.luxTextX = pointS.x + (w-diff)/2 - radShiftX;
			obj.luxTextY = y + h/2;
			obj.luxTexth = h;
			obj.luxTextw = w - diff + 2*radShiftX;

			/*
			ctx.beginPath();
			ctx.lineWidth=1;
			ctx.rect(x + diff/2,y,w-diff,h);
			ctx.rect(x,y, w,h);
			ctx.moveTo(x + diff/2, y);
			ctx.lineTo(x + w-diff/2,y);
			ctx.lineTo(x + w, y+h);
			ctx.lineTo(x,y+h);
			ctx.closePath();
			ctx.strokeStyle="#E1E1E1";
			ctx.stroke();
			*/

			ctx.beginPath();
			ctx.moveTo(x + diff/2 + rad,y);

			ctx.lineTo(x + w - diff/2 - rad, y);
			ctx.quadraticCurveTo(x + w - diff/2,y, x + w - diff/2 + radShiftX,y + radShiftY);

			ctx.lineTo(x + w - radShiftX, y + h - radShiftY);
			ctx.quadraticCurveTo(x + w, y + h, x + w - rad,y + h);

			ctx.lineTo(x + rad, y + h);
			ctx.quadraticCurveTo(x, y + h, x + radShiftX,y + h - radShiftY);

			ctx.lineTo(x + diff/2 - radShiftX, y + radShiftY);
			ctx.quadraticCurveTo(x + diff/2, y, x + diff/2 + rad,y);

			var grad=ctx.createLinearGradient(x,y,x,y+h);
			grad.addColorStop("0", settings.colors.infobar.start);
			grad.addColorStop("1.0", settings.colors.infobar.end);
			// Fill with gradient
			ctx.fillStyle=grad;
			ctx.fill();

			/* Add stroke
			 *  - mostly fix for Chrome/Chromium not anty-aliasing image in canvas */
			ctx.lineWidth = settings.colors.lineWidth;
			ctx.strokeStyle = settings.colors.stroke;
			ctx.stroke();
			ctx.closePath();

		}
		this.setText = function(val, temp, state, lux) {
/* Removed 13.11.12
			var stringLight = (val).toFixed(0) + '%';
 */
			var stringTemp = (temp).toFixed(0) + "\u00B0"+'C';
			var stringLux = (lux).toFixed(0) + ' lux';
//			valueText.text(string);
//			'height' : fontSize.toString() + 'px',
//			'textShadow' : settings.colors.shadow,
//			shadow:'white -1px -1px 2px, black 1px 1px 3px',
//			'top' : ((settings.height / 2) - (fontSize / 2)).toString() + 'px',
//			'width' : (settings.width).toString() + 'px',
			var textGrad = ctx.createLinearGradient(settings.width/2, settings.height/2 + fontSize, settings.width/2, settings.height/2 - fontSize);
			textGrad.addColorStop(0, settings.colors.font.start);
			textGrad.addColorStop(1, settings.colors.font.end);

			ctx.font=fontSize.toString() + "pt RobotoBold";
//			ctx.font=fontSize.toString() + "pt sans";
			ctx.fillStyle=textGrad;
			ctx.textAlign = 'center';
			ctx.shadowColor = "#000000";
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
			ctx.shadowBlur = 1;
/* Removed 13.11.12
			ctx.fillText(stringLight, settings.width/2, settings.height/2 - 1);
			ctx.fillText(stringTemp, settings.width/2, settings.height/2 + fontSize + 1);
 */
			ctx.fillText(stringTemp, settings.width/2, settings.height/2 + fontSize/2);
			ctx.font=(obj.luxTexth*(1/Math.pow(Phi,2))).toString() + "pt RobotoCondensed";
			ctx.fillStyle='#636363';
			ctx.shadowColor = "#ffffff";
			ctx.shadowBlur = 1;
			ctx.fillText(stringLux, obj.luxTextX, obj.luxTextY+obj.luxTexth*(1/Math.pow(Phi,2))/2,obj.luxTextw);

			$('#currentVal').text('Val = ' + val + ', Temp: ' + temp + "\u00B0"+'C, Status: ' + state);
		}
		this.applyAngle = function (point, angle, distance) {
			return {
				x : point.x + (Math.cos(angle) * distance),
				y : point.y + (Math.sin(angle) * distance)
			};
		};
		this.getStateColor = function(state, val) {
			if (val == 0 && state != 2 && state != 3) {
				state = 4;
			}
			/* Create inner gradient for the state ring
			 * state: good, needs attention, something is wrong, fatal error, off */
			switch(state) {
				case 1:
					/* on */
					var startCol = settings.colors.on.start;
					var endCol = settings.colors.on.end;
					var stateMsg = 'Fine';
					break;
				case 2:
					/* attention */
					var startCol = settings.colors.attention.start;
					var endCol = settings.colors.attention.end;
					var stateMsg = 'Fine';
					break;
				case 3:
					/* error */
					var startCol = settings.colors.error.start;
					var endCol = settings.colors.error.end;
					var stateMsg = 'Fine';
					break;
				case 4:
					/* off */
					var startCol = settings.colors.off.start;
					var endCol = settings.colors.off.end;
					var stateMsg = 'Fine';
					break;
				default:
					/* unknown state */
					var startCol = '';
					var endCol = '';
					var stateMsg = 'Unknown state';
			}
			return {'start':startCol,'end':endCol};
		}
		warehouse.dumpData(obj);
	}
	
//	$.fn.extend({
//		warehouselamps : function(options) {
//			return this.each(function() {
//				if ($(this).data('warehouselamps'))
//					return;
//				var warehouselamps = new WarehouseLamps(this, options);
//				$(this).data('warehouselamps', warehouselamps);
//			});
//		}
//	});
	$.fn.warehouselamps = function(options) {
		return $.fn.encapsulatedPlugin('warehouselamps', WarehouseLamps, this, options);
	};
})(jQuery);

/**
 * Plugin generator plugin. Doesn't allow for chaining directly, but preserves public
 * methods and namespaces, and supports multiple elements.
 *
 * @copyright Jamie Talbot 2010 (http://jamietalbot.com)
 * Licensed as per jQuery (http://jquery.org/license).  Keep my name and you're all good :)
 *
 * Example Usage:
 *
 * Step 1: Define your plugin interface
 * ------------------------------------
 *
 * MyPluginDefinition = function() {
 *
 *	var _privateMember;
 *
 *	function _privateMethod() {}
 *
 *	return {
 *		setup: function() {
 *			// Initialisation Code
 *		},
 *
 *		publicMethodWithArguments: function(name) {
 *			console.log(name);
 *		},
 *
 * 		publicMethod: function() {}
 *	}
 * }
 *
 * Step 2: Register your plugin
 * ----------------------------
 *
 * $.fn.myplugin = function(options) {
 *	return $.fn.encapsulatedPlugin('myplugin', MyPluginDefinition, this, options);
 * };
 *
 * Step 3: Profit
 * --------------
 *
 * $('#foo').myplugin().publicMethod();
 * $('#bar').myplugin().publicMethodWithArguments('Jamie');
 *
 */
(function($) {

	$.fn.encapsulatedPlugin = function(plugin, definition, objects, options) {

		// Creates a function that calls the function of the same name on each member of the supplied set.
		function makeIteratorFunction(f, set) {
			return function() {
				for (var i = 0; i < set.length; i++) {
					set[i][f].apply(set[i][f], arguments);
				}
			};
		}

		var result = [];
		objects.each(function() {
			var element = $(this);

			if (!element.data(plugin)) {
				// Initialise
				var instance = new definition(this, options);
				if (instance.setup) {
					// If there is a setup function supplied, call it.
					instance.setup();
				}

				// Store the new functions in a validation data object.
				element.data(plugin, instance);
			}
			result.push(element.data(plugin));
		});

		// We now have a set of plugin instances.
		result = $(result);

		// Take the public functions from the definition and make them available across the set.
		var template = result[0];
		if (template) {
			for (var i in template) {
				if ( typeof (template[i]) == 'function') {
					result[i] = makeIteratorFunction(i, result);
				}
			}
		}

		// Finally mix-in a convenient reference back to the objects, to allow for chaining.
		result.$ = objects;

		return result;
	};
})(jQuery);

var printObj = typeof JSON != "undefined" ? JSON.stringify : function(obj) {
	var arr = [];
	$.each(obj, function(key, val) {
		var next = key + ": ";
		next += $.isPlainObject(val) ? printObj(val) : val;
		arr.push(next);
	});
	return "{ " + arr.join(", ") + " }";
};
