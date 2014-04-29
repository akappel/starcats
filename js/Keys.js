var Keys = function(up, left, right, down, enter, x, y) {
	var up = up || false,
		left = left || false,
		right = right || false,
		down = down || false;
		enter = enter || false;
		x = -1;
		y = -1;
		
	var onKeyDown = function(e) {
		var that = this,
		c = e.keyCode;
		switch (c) {
			
			case 37: 
				that.left = true;
				break;
			case 38: 
				that.up = true;
				break;
			case 39: 
				that.right = true; 
				break;
			case 40: 
				that.down = true;
				break;
			case 13:
				that.enter = true;
				break;
		};
	};

	var onMouseDown = function(e) {
		var that = this;
		var canvas3 = document.getElementById("gameCanvas");
		var rect = canvas3.getBoundingClientRect();
  		that.x= e.clientX - rect.left;
  		that.y= e.clientY - rect.top;
  	
  		
	};
	
	var onKeyUp = function(e) {
		var that = this,
		c = e.keyCode;
		switch (c) {
			case 37: 
				that.left = false;
				break;
			case 38: 
				that.up = false;
				break;
			case 39: 
				that.right = false;
				break;
			case 40:
				that.down = false;
				break;
			case 13: 
				that.enter = false;
				break;
		};
	};

	var onMouseUp = function(e) {
		var that = this;
  		that.x= -1;
  		that.y= -1;
	};

	return {
		up: up,
		left: left,
		right: right,
		down: down,
		enter: enter,
		x: x,
		y: y,
		onMouseDown: onMouseDown,
		onMouseUp: onMouseUp,
		onKeyDown: onKeyDown,
		onKeyUp: onKeyUp
	};
};