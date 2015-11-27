var requestIp = require('request-ip');
var geoip = require('geoip-lite');

module.exports = function(app, daler, localSession, logger){

var sessionManage = function(req){
  localSession = req.session;
    if (!localSession.city){
    var ip = requestIp.getClientIp(req);
    ip = ip.replace('::ffff:', '');
    var geo = (geoip.lookup(ip) || {});
    console.log("The IP is %s, city : %s", geoip.pretty(ip),(geo.city || 'Nil'));
      localSession.city = geo.city || 'Nil';
      daler.logTrace(geo);
    }
  }

  app.get('/admin', function (req, res) {
    sessionManage(req);
    daler.getRegisters(undefined, function(data){
      res.render('index/admin', { val: data });
    });
  });

  app.get('/:uuid', function (req, res) {
    sessionManage(req);
    daler.getRegisters({ uniqueid: req.params.uuid }, function(data){
      console.log(data);
      res.render('index', { val: data });
    });
  });

  app.get('/', function (req, res) {
    sessionManage(req);
    res.writeHead(301, { Location: 'http://landing.que.one/'});
    res.end();
  });
}