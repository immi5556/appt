var requestIp = require('request-ip');
var geoip = require('geoip-lite');

module.exports = function(app, opts){
  app.get('/', function (req, res) {
    opts.localSession = req.session;
  	if (!opts.localSession.city){
		var ip = requestIp.getClientIp(req);
		ip = ip.replace('::ffff:', '');
		var geo = (geoip.lookup(ip) || {});
		console.log("The IP is %s, city : %s", geoip.pretty(ip),(geo.city || 'Nil'));
  		opts.localSession.city = geo.city || 'Nil';
  		opts.daler.logTrace(geo);
  	}
    res.sendfile('./views/index.html');
  });
}