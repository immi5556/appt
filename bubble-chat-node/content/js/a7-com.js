var a7com = (function(){

	//var socket = io.connect("http://192.168.1.102:8084");
	var socket = io.connect("http://49.206.64.209:8084");
	socket.on("itsu", function(data){
		pageObject.populateMe(data);
	});
	socket.on("newfish", function(data){
		pageObject.addUser(data);
	});
	socket.on("fishdrop", function(data){
		pageObject.removeUser(data);
	});
	socket.on("allfishes", function(data){
		pageObject.clearPool();
		for(fi in data){
			pageObject.addUser(data[fi]);
		}
	});
	socket.on("received", function(data){
		pageObject.startConverse(data);
	});
	socket.on("changedisplay", function(data){
		pageObject.changeDisplay(data);
	});
	socket.on("exceeded", function(data){
		alert(data);
	});

	var postMessage = function(msg){
		socket.emit("posted", msg, function(data){
			alert(data);
		});
	}

	var changeDisplayname = function(msg){
		socket.emit("displaychange", msg, function(data){
			alert(data);
		});
	}

	return {
		postMessage: postMessage,
		changeDisplayname: changeDisplayname
	}
})();