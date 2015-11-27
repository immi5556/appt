var http = require('http');
var url = require('url');
var requestIp = require('request-ip');
var geoip = require('geoip-lite');

var app = http.createServer(function(req, res){
	var qs = url.parse(req.url, true).query;
	if (!qs.ip) {
		qs.ip = requestIp.getClientIp(req);
		qs.ip = qs.ip.replace('::ffff:', '');
		console.log(qs.ip);
		console.log("The IP is %s", geoip.pretty(qs.ip));
	};
	
	var geo = geoip.lookup(qs.ip);
	console.log(geo);
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(geo));
});

app.listen(8085);