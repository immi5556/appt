var requestIp = require('request-ip');
var geoip = require('geoip-lite');

module.exports = function(app, daler, localSession, logger){

  var translateIsoCode = function(iso){
    if (iso == 'IN')
      return "India";
    if (iso == 'US')
      return "United States";
    if (iso == 'GB')
      return "United Kingdom"
    if (iso == 'AU')
      return "Australia"
    if (iso == 'CN')
      return "China"

    return 'Nil'
  }

  app.get('/', function (req, res) {
    localSession = req.session;
  	if (!localSession.city){
		  var ip = requestIp.getClientIp(req);
		  ip = ip.replace('::ffff:', '');
		  var geo = (geoip.lookup(ip) || {});
      localSession.ip = geoip.pretty(ip);
  		localSession.city = geo.city || 'Nil';
      localSession.country = translateIsoCode(geo.country) || 'Nil';
      localSession.isocode = geo.country;
  		daler.logTrace(geo);
  	}
    console.log("The IP is %s, city : %s", localSession.ip,(localSession.city || 'Nil'));
    res.sendfile("views/static/__index.html")
  });
}