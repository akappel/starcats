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



	function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
    }
  function getMousePos(canvas, e)
	{
		var pos = findPos(canvas);
    	var mouseX = e.pageX - pos.x;
    	var mouseY = e.pageY - pos.y;

    return {
        x: mouseX,
        y: mouseY };
}

	var onMouseDown = function(e) {
		var that = this;
		var canvas3 = document.getElementById("gameCanvas");
		var mousePos = getMousePos(canvas3, e);

  		that.x= mousePos.x*(1200/canvas3.offsetWidth);
  		that.y= mousePos.y*(750/canvas3.offsetHeight);
  		var snd = new Audio("./music/laser.wav");
		snd.play();	

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