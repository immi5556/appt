var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jade = require('jade');
var daler = require('./dal/daler.js').daler;
var url = require('url');
var path = require('path');
var favicon = require('serve-favicon');

var opts ={
	app: app,
	bodyParser: bodyParser,
	daler: daler,
	jade: jade
}

app.use(favicon(__dirname + '/favicon.ico'));
app.use('/static', express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.get('/uploaded/:imgfile', function(req, res){
      res.sendFile(path.resolve('./public/images/logos/' + req.params.imgfile), function(req, res){

      });
 });

app.get("/", function(req, res){
	var domain = req.headers.host,
    subDomain = domain.split('.')[0];
    console.log(req.headers);
    if (subDomain.indexOf('localhost') > -1) 
    	subDomain = 'test';
    //else if(parseInt(subDomain) > 40){
    //	subDomain = 'test2';
    //}
    else {
    	var ur = url.parse(req.headers.referer);
    	domain = ur.host;
    	subDomain = domain.split('.')[0];
    }
    
    console.log(domain);
    
	daler.getDetails(subDomain, function(err, data) {
		if (err){
			res.status(500).send(err);
			return;
		}
		res.render('index', { val: data[0] });
	});
});

app.get("/sched", function(req, res){
	res.sendfile("schednd.html");
});


app.get("/hosp", function(req, res){
	res.sendfile("index.html");
});

app.get("/clock", function(req, res){
	res.sendfile("clock.html");
});

require('./routes/servicerouting.js')(opts);

var server = app.listen(8082, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Schedule app listening at http://%s:%s', host, port);
});