var requestIp = require('request-ip');
var geoip = require('geoip-lite');


module.exports = function(app, opts){


var sessionManage = function(req, callback){
  opts.localSession = req.session;
    if (!opts.localSession.city){
    var ip = requestIp.getClientIp(req);
    ip = ip.replace('::ffff:', '');
    var geo = (geoip.lookup(ip) || {});
    console.log("The IP is %s, city : %s", geoip.pretty(ip),(geo.city || 'Nil'));
      opts.localSession.city = geo.city || 'Nil';
      opts.localSession.geo = geo;
      opts.daler.logTrace(geo);
    }
    if (callback){
      callback(opts.localSession.geo);
    }
  }

  app.get('/admin', function (req, res) {
    sessionManage(req);
    opts.daler.getRegisters(undefined, function(data){
      res.render('index/admin', { val: data });
    });
  });


  app.get('/regnew/:uuid', function (req, res) {
      //res.sendfile('views/static/regnew.html');
      sessionManage(req);
      opts.daler.getRegister({ uniqueid: req.params.uuid }, function(data){
        console.log(data);
        res.render('index/regis', { val: data });
      });
  });


  app.get('/regn', function (req, res) {
    res.render('index/regis', { val: {} });
  });

  app.get('/:uuid', function (req, res) {
    opts.daler.getRegister({ uniqueid: req.params.uuid }, function(data){
      if (data.geo){
        console.log(data);
        res.render('index/regis', { val: data });
      }
      else {
        sessionManage(req, function(geo){
          data.geo = opts.utils.extend({
            country: "", region: "", city: "", metro:0, ll: [0, 0]
          }, geo, true);
          console.log(data);
          res.render('index/regis', { val: data });
        });
      }
    });
  });

  app.get('/', function (req, res) {
    sessionManage(req);
    res.writeHead(301, { Location: 'http://landing.que.one/'});
    res.end();
  });
}