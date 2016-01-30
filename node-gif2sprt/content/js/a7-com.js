var a7com = (function(){

	//var socket = io.connect("http://192.168.1.100:9010");
	var socket = io.connect("http://49.206.64.209:9010");
	//var socket = io.connect("http://localhost:9010");
	socket.on("connect", function(){
		sockid = socket.io.engine.id;
	});
	
	socket.on("spritegenerated", function(data){
		console.log(data);
		$("#destWrap").attr("download", "converted.png");
		$("#destWrap").attr("href", "dest/img/" + data);
		$("#destImg").attr("src", "dest/img/" + data);
	});

	return {
		
	}
})();