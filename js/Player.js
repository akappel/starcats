
var Player = function(startX, startY, startColor, startName, startMessage, startTrans, startLaserX, startLaserY, startCat) {
	var x = startX,
		y = startY,
		color = startColor,
		name = startName,
		id,
		textTransparency = startTrans,
		message = startMessage,
		laserX = startLaserX,
		laserY = startLaserY,
		cat = startCat,
		moveAmount = 4;
		var imageObj = new Image();
		imageObj.src = './images/cats.png';
		if(cat == false) imageObj.src = './images/profs.png';
	
	var getCat = function() {
		return cat;
	};
	
	var getLaserX = function() {
		return laserX;
	};

	var getLaserY = function() {
		return laserY;
	};
	var getTextTransparency = function() {
		return textTransparency;
	};
	var getMessage = function() {
		return message;
	};
	var getX = function() {
		return x;
	};

	var getY = function() {
		return y;
	};

	var getName = function() {
		return name;
	};

	var getColor = function() {
		return color;
	};
	
	var setCat = function(newCat) {
		cat = newCat;
	};

	var setLaserX = function(newLaserX) {
		laserX = newLaserX;
	};

	var setLaserY = function(newLaserY) {
		laserY = newLaserY;
	};
	var setTextTransparency = function(newTrans) {
		textTransparency = newTrans;
	};
	var setMessage = function(newMessage) {
		message = newMessage;
	};

	var setX = function(newX) {
		x = newX;
	};

	var setY = function(newY) {
		y = newY;
	};

	var setName = function(newName) {
		name = newName;
	};

	var setColor = function(newColor) {
		color = newColor;
	};

	
	var update = function(keys) {
		
		var prevX = x,
			prevY = y,
			prevName = name,
			prevMessage = message,
			prevTrans = textTransparency,
			prevLaserX = laserX,
			prevLaserY = laserY;

		
		if (keys.up) {
			if(y<=0){
				y = canvas.height;
			}else{
				y -= moveAmount;
			}

		} else if (keys.down) {
			if(y>=canvas.height){
				y = 0;
			}else{
				y += moveAmount;
			}
		};

		
		if (keys.left) {
			if(x<=0){
				x = canvas.width;
			}else{
				x -= moveAmount;
			}
		} else if (keys.right) {
			if(x>=canvas.width){
				x = 0;
			}else{
				x += moveAmount;
			}
		};

		
		if (keys.enter) {
			if(document.getElementById("chatText").value != ""){
				var temp = document.getElementById("chatText").value;

				if(temp.substring(0, 5) == "name=" && temp.length > 5){
					message = "";
					name = temp.substring(5, temp.length);
					textTransparency = 1;
				}else{
					message = temp;
					textTransparency = 1;
				}
			}
			document.getElementById("chatText").value = "";
		}

			if(textTransparency > 0 && message != ""){
				textTransparency-=.00175;
			}

			
				laserX = keys.x;
				laserY = keys.y;



		return (prevX != x || prevY != y || prevName != name || prevMessage != message || prevTrans != textTransparency || prevLaserY != laserY || prevLaserX != laserX) ? true : false;
	};


	
	var draw = function(ctx) {
		var tempFillStyle = ctx.fillStyle;
		ctx.fillStyle = "rgba(0,255,0,1)";
		if(!this.getCat()) ctx.fillStyle = "rgba(255,0,0,1)";
		ctx.font = '13pt PT Sans Narrow';
		ctx.fillText(this.getName(), x-((ctx.measureText(this.getName()).width)/2), y+57);
		ctx.fillStyle = "rgba(255,255,255,0)";
		ctx.fillStyle = "rgba(255,255,255,"+this.getTextTransparency()+")";
		ctx.fillText(this.getMessage(), x-((ctx.measureText(this.getMessage()).width)/2), y-57);
		var sourceX = (imageObj.width/3)*(this.getColor()[0]);
        var sourceY = (imageObj.height/3)*(this.getColor()[1]);
        var sourceWidth = imageObj.width/3;
        var sourceHeight = imageObj.height/3;
        var destWidth = sourceWidth;
        var destHeight = sourceHeight;
        var destX = x - ((imageObj.width/3)/2);
        var destY = y - ((imageObj.height/3)/2);

		ctx.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
		if(this.getLaserX() != -1 && this.getLaserY() != -1){
			ctx.beginPath();
			ctx.lineWidth = 12;
			ctx.strokeStyle = "rgba(0,255,0,.3)";
			if(!this.getCat()) ctx.strokeStyle = "rgba(255,0,0,.3)";
      		ctx.moveTo(x+12, y+1);
      		ctx.lineTo(this.getLaserX(), this.getLaserY());
      		ctx.moveTo(x-8, y+1);
      		ctx.lineTo(this.getLaserX(), this.getLaserY());
      		ctx.stroke();
      		ctx.lineWidth = 2;
      		ctx.strokeStyle = "rgba(0,255,0,1)";
      		if(!this.getCat()) ctx.strokeStyle = "rgba(255,0,0,1)";
      		ctx.moveTo(x+11, y+2);
      		ctx.lineTo(this.getLaserX(), this.getLaserY());
      		ctx.moveTo(x-7, y+2);
      		ctx.lineTo(this.getLaserX(), this.getLaserY());

      		ctx.stroke();
      	}

		ctx.fillStyle = tempFillStyle;
	};

	return {
		getCat: getCat,
		getLaserX: getLaserX,
		getLaserY: getLaserY,
		getTextTransparency: getTextTransparency,
		getMessage: getMessage,
		getX: getX,
		getY: getY,
		getName: getName,
		getColor: getColor,
		setCat: setCat,
		setLaserX: setLaserX,
		setLaserY: setLaserY,
		setTextTransparency: setTextTransparency,
		setMessage: setMessage,
		setX: setX,
		setY: setY,
		setName: setName,
		setColor: setColor,
		update: update,
		draw: draw
	}
};