var express = require('express');
var app = express();
var jade = require('jade');
var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/favicon.ico'));
app.use('/static', express.static(__dirname + '/content'));

app.set('view engine', 'jade');

app.get("/", function(req, res){
	res.sendfile("index.html");
});

var server = app.listen(8084, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Vaporize chat app listening at http://%s:%s', host, port);
});

var io = require('socket.io')(server);
var fishes = {};

var randoms = function(min, max){
			return Math.floor((Math.random() * (max - min)) + min);
		}

app.get('/admin', function (req, res) {
    res.render('index/admin', { val: fishes });
  });

io.on('connection', function (socket) {
	//user connected
	console.log("user connected" + socket.id)
	
	if (Object.keys(fishes).length > 13){
		console.log("exceeded");
		io.to(socket.id).emit("exceeded", "Rooms are fully packed.");
		return;
	}

	var newfish = {
		nickname: ('aa-' + (new Date%9e6).toString(36)),
		fishidx: randoms(1, 16),
		socketid: socket.id
	}
	newfish.displayname = newfish.nickname;
	io.to(socket.id).emit("allfishes", fishes);
	io.to(socket.id).emit("itsu", newfish);

	fishes[socket.id] = newfish;
	io.emit('newfish', newfish);

  	//user post message
	socket.on('posted', function (data) {
		io.to(data.touser.socketid).emit("received", data);
  	});

  	socket.on("displaychange", function (data) {
  		if (fishes[data.socketid]){
	  		fishes[data.socketid].displayname = data.displayname;
	  	}
		io.emit('changedisplay', data);
	});

	socket.on("disconnect", function () {
		console.log("disconnected " + socket.id);
		io.emit('fishdrop', fishes[socket.id]);
		delete fishes[socket.id];
	});
  	//user changed identity
});
