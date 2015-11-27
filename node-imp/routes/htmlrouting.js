var requestIp = require('request-ip');
var geoip = require('geoip-lite');

module.exports = function(app, daler, localSession, logger){
  app.get('/', function (req, res) {
    localSession = req.session;
  	if (!localSession.city){
		var ip = requestIp.getClientIp(req);
		ip = ip.replace('::ffff:', '');
		var geo = (geoip.lookup(ip) || {});
		console.log("The IP is %s, city : %s", geoip.pretty(ip),(geo.city || 'Nil'));
  		localSession.city = geo.city || 'Nil';
  		daler.logTrace(geo);
  	}
    res.render('index', daler.landing);
  });
}