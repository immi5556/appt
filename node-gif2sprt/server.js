var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var favicon = require('serve-favicon');
var chokidar = require('chokidar');
var fs = require('fs');
var path = require('path');
var upload = require('jquery-file-upload-middleware');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var spawner = function(srcfile){
	//montage ./magik-fldr/src/heli.gif -tile x1 -geometry +0+0  -alpha On -background "rgba(0, 0, 0, 0.0)" -quality 100 ./magik-fldr/dest/heli.png
	var fname = path.basename(srcfile);
	var cmd = 'montage ./magik-fldr/src/' + srcfile + ' -tile x1 -geometry +0+0 -alpha On -background "rgba(0,0,0, 0.0)" -quality 100 ./magik-fldr/dest/' + fname + '.png';
	//const child = spawn(cmd);
	const child = exec(cmd);
	child.on('error', (err, stdout, stderr) => {
		if (err)
	  		console.log(err);
	  	console.log(stdout);
	});
}

// One-liner for current directory, ignores .dotfiles
chokidar.watch('./../node-gif2sprt/magik-fldr/dest', {ignored: /[\/\\]\./}).on('all', function(event, fnn) {
//fs.watch('./../node-gif2sprt/magik-fldr/src', {persistent: true}, function(event, fnn) {
  console.log(event, fnn);
  if (event == 'add' || event == 'change'){
  	var fnn1 = path.basename(fnn, ".png");
  	var spl = fnn1.split('--');
  	io.to('/#' + spl[1]).emit("spritegenerated", fnn1 + '.png');
  }
});

upload.configure({
    uploadDir: __dirname + '/magik-fldr/src'
});
upload.on('begin', function (fileInfo, req, res) {      
	console.log(req.fields.socketid);
	fileInfo.name = ('aa-' + (new Date%9e6).toString(36)) + '--' + req.fields.socketid;
});
upload.on('end', function (fileInfo, req, res) { 
	console.log(req.fields.socketid);
	//spawner(fileInfo.name);
	//io.to('/#' + req.fields.socketid).emit("spritegenerated", fileInfo);
});
upload.on('error', function (e, req, res) {
    console.log(e.message);
});

app.use("/uploadimg", upload.fileHandler());

app.get('/js/:jsfile', function(req, res){
      res.sendFile(__dirname + '/content/js/' + req.params.jsfile);
});

app.get('/upload/:jsfile', function(req, res){
      res.sendFile(__dirname + '/content/upload-js/' + req.params.jsfile);
});

app.get('/src/img/:imgfile', function(req, res){
      res.sendFile(__dirname + '/magik-fldr/src/' + req.params.imgfile);
});

app.get('/dest/img/:imgfile', function(req, res){
      res.sendFile(__dirname + '/magik-fldr/dest/' + req.params.imgfile);
});

app.get('/css/img/:imgfile', function(req, res){
      res.sendFile(__dirname + '/content/img/' + req.params.imgfile);
});

app.get('/cvrtproc/:filename', function(req, res){
	spawner(req.params.filename);
      res.json({
      	message: "In progress"
      });
});

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

var server = app.listen(9010, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Gif to Sprite port listining at http://%s:%s', host, port);
});

var io = require('socket.io')(server);
var files = {};

io.on('connection', function (socket) {
	//user connected
	console.log("user connected" + socket.id);
	
	var file = {
		socketid: socket.id
	}

	files[socket.id] = file;

	socket.on("disconnect", function () {
		console.log("disconnected " + socket.id);
		delete files[socket.id];
	});
  	//user changed identity
});

//montage ./magik-fldr/src/heli.gif -tile x1 -geometry +0+0  -alpha On -background "rgba(0, 0, 0, 0.0)" -quality 100 ./magik-fldr/dest/heli.png