var express = require("express");
var app = express();
var http = require('http');
var holla = require('holla');
var server = require('http').createServer(app).listen(8087);
//var server = http.createServer().listen(8087);
var rtc = holla.createServer(server);

app.get('/', function (req, res) {
  res.sendfile("index.html")
});

app.get('/holla.js', function(req, res){
   res.sendFile(path.resolve('./holla.js'));
});

console.log('Server running on port 8087');