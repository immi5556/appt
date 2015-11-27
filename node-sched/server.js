var express = require('express');
var app = express();

app.use('/static', express.static(__dirname + '/public'));

app.get("/", function(req, res){
	res.sendfile("index.html");
});

app.get("/sched", function(req, res){
	res.sendfile("schednd.html");
});

app.get("/clock", function(req, res){
	res.sendfile("clock.html");
});

var server = app.listen(8082, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Schedule app listening at http://%s:%s', host, port);
});