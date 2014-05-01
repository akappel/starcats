
var canvas,			
	ctx,			
	keys,			
	localPlayer,	
	remotePlayers,	
	socket, 		
	numOfStarsD1,
	starXD1,
	starYD1, 
	starRadD1,
	numOfStarsD2,
	starXD2,
	starYD2, 
	starRadD2,
	numOfStarsD3,
	starXD3,
	starYD3, 
	starRadD3,
	tempD,
	tempK,
	tempH;
	
			

function init() {
	
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");

	
	canvas.width = 1200;
	canvas.height = 750;

	numOfStarsD1 = Math.round((canvas.width*canvas.height)/30000);
	starXD1 = [];
	starYD1 = [];
	starRadD1 = [];
	numOfStarsD2 = Math.round((canvas.width*canvas.height)/27000);
	starXD2 = [];
	starYD2 = [];
	starRadD2 = [];
	numOfStarsD3 = Math.round((canvas.width*canvas.height)/20000);
	starXD3 = [];
	starYD3 = [];
	starRadD3 = [];

	for(var i = 0; i<numOfStarsD1; i++){
		starXD1.push(Math.floor((Math.random()*canvas.width)+1));
		starYD1.push(Math.floor((Math.random()*canvas.height)+1));
		starRadD1.push(Math.floor((Math.random()*1)+1));
	}
	for(var i = 0; i<numOfStarsD2; i++){
		starXD2.push(Math.floor((Math.random()*canvas.width)+1));
		starYD2.push(Math.floor((Math.random()*canvas.height)+1));
		starRadD2.push(Math.floor((Math.random()*1)+1));
	}
	for(var i = 0; i<numOfStarsD3; i++){
		starXD3.push(Math.floor((Math.random()*canvas.width)+1));
		starYD3.push(Math.floor((Math.random()*canvas.height)+1));
		starRadD3.push(Math.floor((Math.random()*0)+1));
	}


	
	keys = new Keys();

	
	var startX = Math.round(Math.random()*(canvas.width-5)),
		startY = Math.round(Math.random()*(canvas.height-5)),
		startColor = getRandomColor(),
		startName = "guest"+randomString(),
		startMessage = "",
		startTrans = 1,
		startLaserX = -1,
		startLaserY = -1,
		startDeaths = 0, 
		startKills = 0, 
		startHealth = 1000,
		startActive = true,
		startCat = true;
		if((Math.floor((Math.random()*100)+1)) < 51) startCat = false;
		


	
	localPlayer = new Player(startX, startY, startColor, startName, startMessage, startTrans, startLaserX, startLaserY, startCat, startDeaths, startKills, startHealth, startActive);

	
	socket = io.connect("http://ec2-54-187-131-44.us-west-2.compute.amazonaws.com/", {port: 80, transports: ["websocket"]});


	remotePlayers = [];

	
	setEventHandlers();
};



var setEventHandlers = function() {
	
	window.addEventListener("keydown", onKeydown, false);
	window.addEventListener("keyup", onKeyup, false);

	window.addEventListener("mousedown", onMousedown,true);
	window.addEventListener("mouseup", onMouseup, true);

	
	window.addEventListener("resize", onResize, false);

	
	socket.on("connect", onSocketConnected);

	
	socket.on("disconnect", onSocketDisconnect);

	
	socket.on("new player", onNewPlayer);


	socket.on("move player", onMovePlayer);

	
	socket.on("remove player", onRemovePlayer);
};


function onKeydown(e) {
	if (localPlayer) {
		keys.onKeyDown(e);
	};
};

function onMousedown(e) {
	if (localPlayer) {
		keys.onMouseDown(e);
	};
};


function onKeyup(e) {
	if (localPlayer) {
		keys.onKeyUp(e);
	};
};

function onMouseup(e) {
	if (localPlayer) {
		keys.onMouseUp(e);
	};
};


function onResize(e) {
	//canvas.width = 1200;
	//canvas.height = 750;
};

function onSocketConnected() {
	console.log("Connected to socket server");

	socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY(), color: localPlayer.getColor(), name: localPlayer.getName(), message: localPlayer.getMessage(), textTransparency: localPlayer.getTextTransparency(), laserX: localPlayer.getLaserX(), laserY: localPlayer.getLaserY(), cat: localPlayer.getCat(), deaths: localPlayer.getDeaths(), kills: localPlayer.getKills(), health: localPlayer.getHealth(), active: localPlayer.getActive()});
};

function onSocketDisconnect() {
	console.log("Disconnected from socket server");
};

function onNewPlayer(data) {
	console.log("New player connected: "+data.id);

	var newPlayer = new Player(data.x, data.y, data.color, data.name, data.message, data.textTransparency, data.laserX, data.laserY, data.cat, data.deaths, data.kills, data.health, data.active);
	newPlayer.id = data.id;



	
	remotePlayers.push(newPlayer);
};


function onMovePlayer(data) {
	var movePlayer = playerById(data.id);

	
	if (!movePlayer) {
		console.log("Player not found: "+data.id+ " on move2");
		return;
	};

	movePlayer.setActive(data.active);
	movePlayer.setColor(data.color);
	movePlayer.setCat(data.cat);
	movePlayer.setDeaths(data.deaths);
	movePlayer.setKills(data.kills);
	movePlayer.setHealth(data.health);
	movePlayer.setLaserX(data.laserX);
	movePlayer.setLaserY(data.laserY);
	movePlayer.setMessage(data.message);
	movePlayer.setTextTransparency(data.textTransparency);
	movePlayer.setName(data.name);
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);

};


function onRemovePlayer(data) {
	var removePlayer = playerById(data.id);

	
	if (!removePlayer) {
		console.log("Player not found: "+data.id+ " on remove2");
		return;
	};

	
	remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
};



function animate() {
	
	update();
	draw();

	
	window.requestAnimFrame(animate);
};



function update() {


		if(localPlayer){
			tempH = localPlayer.getHealth();
			tempD = localPlayer.getDeaths();
			tempK = localPlayer.getKills();
			tempA = localPlayer.getActive();
		}

	for(var i = 0; i<numOfStarsD1; i++){
		if(starXD1[i] >= canvas.width){
			starXD1[i]=(starXD1[i]-canvas.width)+0;
		}
		if(starYD1[i] >= canvas.height){
			starYD1[i]=(starYD1[i]-canvas.height)+0;
		}
		starXD1[i]+=.28;
		starYD1[i]+=.28;
	}
	for(var i = 0; i<numOfStarsD2; i++){
		if(starXD2[i] >= canvas.width){
			starXD2[i]=(starXD2[i]-canvas.width)+0;
		}
		if(starYD2[i] >= canvas.height){
			starYD2[i]=(starYD2[i]-canvas.height)+0;
		}
		starXD2[i]+=.21;
		starYD2[i]+=.21;
	}
	for(var i = 0; i<numOfStarsD3; i++){
		if(starXD3[i] >= canvas.width){
			starXD3[i]=(starXD3[i]-canvas.width)+0;
		}
		if(starYD3[i] >= canvas.height){
			starYD3[i]=(starYD3[i]-canvas.height)+0;
		}
		starXD3[i]+=.16;
		starYD3[i]+=.16;
	}


if(localPlayer){

	for(var i = 0; i < remotePlayers.length; i++){
	if(remotePlayers[i].getCat() != localPlayer.getCat()){
	if(localPlayer.getX() < (remotePlayers[i].getLaserX() + 50) && localPlayer.getX() > (remotePlayers[i].getLaserX() - 50)){
		if(localPlayer.getY() < (remotePlayers[i].getLaserY() + 50) && localPlayer.getY() > (remotePlayers[i].getLaserY() - 50)){
			if(localPlayer.getActive()){
			localPlayer.setHealth(localPlayer.getHealth()-10);
			if(localPlayer.getHealth() == 0){
				
					localPlayer.setHealth(1000);
					localPlayer.setDeaths(localPlayer.getDeaths()+1);

			}
			}
			}
		}
	}
	}

		if(localPlayer.getLaserX() != -1 || localPlayer.getLaserY() != -1){
	for(var i = 0; i < remotePlayers.length; i++){
		
		if(remotePlayers[i].getX() < (localPlayer.getLaserX() + 50) && remotePlayers[i].getX() > (localPlayer.getLaserX() - 50)){
			if(remotePlayers[i].getY() < (localPlayer.getLaserY() + 50) && remotePlayers[i].getY() > (localPlayer.getLaserY() - 50)){
				if(remotePlayers[i].getCat() != localPlayer.getCat()){
				if(remotePlayers[i].getHealth() <= 10 && remotePlayers[i].getHealth() >= 0 && remotePlayers[i].getActive()){
				
					localPlayer.setKills(localPlayer.getKills()+1);
				}
				}
			}
		}
	}
	}

	}


	if (localPlayer.update(keys) || tempH != localPlayer.getHealth() || tempD != localPlayer.getDeaths() || tempK != localPlayer.getKills() || tempA != localPlayer.getActive()) {

		socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), name: localPlayer.getName(), color: localPlayer.getColor(), message: localPlayer.getMessage(), textTransparency: localPlayer.getTextTransparency(), laserX: localPlayer.getLaserX(), laserY: localPlayer.getLaserY(), cat: localPlayer.getCat(), deaths: localPlayer.getDeaths(), kills: localPlayer.getKills(), health: localPlayer.getHealth(), active: localPlayer.getActive()});
	
	};
};



function draw() {
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	var tempFillStyle = ctx.fillStyle;
	for(var i = 0; i < numOfStarsD1; i++){
		ctx.beginPath();
		ctx.arc(starXD1[i], starYD1[i], starRadD1[i], 0, 2 * Math.PI, false);
		ctx.fillStyle = 'white';
		ctx.fill();
	}
	for(var i = 0; i < numOfStarsD2; i++){
		ctx.beginPath();
		ctx.arc(starXD2[i], starYD2[i], starRadD2[i], 0, 2 * Math.PI, false);
		var x = Math.floor(Math.random() * (170 - 130 + 1)) + 130;
		ctx.fillStyle = 'rgb('+x+','+x+','+x+')';
		ctx.fill();
	}
	for(var i = 0; i < numOfStarsD3; i++){
		ctx.beginPath();
		ctx.arc(starXD3[i], starYD3[i], starRadD3[i], 0, 2 * Math.PI, false);
		var x = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
		ctx.fillStyle = 'rgb('+x+','+x+','+x+')';
		ctx.fill();
	}
	ctx.fillStyle = tempFillStyle;

  	ctx.fillStyle = "#FF8000";
	ctx.font = '13pt PT Sans Narrow';
	var str = "There are "+(remotePlayers.length + 1 )+" players online";
	ctx.fillText(str, canvas.width - ((ctx.measureText(str).width)+4), canvas.height - 7);

	ctx.fillStyle = "#00CCCC";
	var str = "TOP PLAYERS:";
	ctx.fillText(str, 6, 13);
	var temp;
	var tempArr = remotePlayers;
	tempArr.push(localPlayer);
	tempArr.sort(function (a, b) {
    if (a.getName() > b.getName())
      return 1;
    if (a.getName() < b.getName())
      return -1;
    // a must be equal to b
    return 0;
});

	var top1 = null, top2 = null, top3 = null;
	for(var i = 0; i < tempArr.length; i++){
		if(top1 == null || tempArr[i].getKills() > top1.getKills()){
			temp = top1;
			top1 = tempArr[i];
			top3 = top2;
			top2 = temp;
			
		}else if(top2 == null || tempArr[i].getKills() > top2.getKills()){
			temp = top2;
			top2 = tempArr[i];
			top3 = temp;
			
		}else if(top3 == null || tempArr[i].getKills() > top3.getKills()){
			top3 = tempArr[i];
		}
	}
	var index = tempArr.indexOf(localPlayer);
	if (index > -1) {
		tempArr.splice(index, 1);
	}
	
	ctx.fillStyle = "#FFFF33";
	str = top1.getName()+": "+top1.getKills()+" kills";
	ctx.fillText(str, 6, 28);
	ctx.fillStyle = "#C0C0C0";
	str = "------";
	if(top2 != null) str = top2.getName()+": "+top2.getKills()+" kills";
	ctx.fillText(str, 6, 43);
	ctx.fillStyle = "#666600";
	str = "------";
	if(top3 != null) str = top3.getName()+": "+top3.getKills()+" kills";
	ctx.fillText(str, 6, 58);


	ctx.fillStyle = "#FFFF00";
	ctx.fillText(localPlayer.getKills()+" Kills  | "+localPlayer.getDeaths()+" Deaths", 6,canvas.height - 7);

	
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		if(remotePlayers[i].getActive()) remotePlayers[i].draw(ctx);
	};
	
	if(localPlayer.getActive()) localPlayer.draw(ctx);
};


function playerById(id) {
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		if (remotePlayers[i].id == id)
			return remotePlayers[i];
	};
	
	return false;
};

	function getRandomColor() {

		var catX = Math.floor(Math.random()*(2 - 0 + 1)) + 0;
		var catY = Math.floor(Math.random()*(2 - 0 + 1)) + 0;

		var array = [catX,catY];

		return array;
	}

	function randomString() {
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var string_length = 8;
		var randomstring = '';
		for (var i=0; i<string_length; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum,rnum+1);
		}
		return randomstring;
	}