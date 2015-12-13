var requestIp = require('request-ip');
var geoip = require('geoip-lite');


module.exports = function(app, opts){


var sessionManage = function(req){
  opts.localSession = req.session;
    if (!opts.localSession.city){
    var ip = requestIp.getClientIp(req);
    ip = ip.replace('::ffff:', '');
    var geo = (geoip.lookup(ip) || {});
    console.log("The IP is %s, city : %s", geoip.pretty(ip),(geo.city || 'Nil'));
      opts.localSession.city = geo.city || 'Nil';
      opts.daler.logTrace(geo);
    }
  }

  // app.post('/upload/:uuid', function (req, res) {
  //   //console.log(req.body);
  //   uploadFile(req, res, function(err, resp){
  //     var obj = req.body;
  //     console.log("complee uploading...");
  //     console.log(req.files);
  //     obj.logopic = (req.files.logopic || [''])[0].path;
  //     obj.selIcon = (req.files.selIcon || [''])[0].path
  //     opts.daler.checkDomain(obj, function(err){
  //       if(err){
  //         res.status(500).send(err);
  //         return;
  //       }
  //       res.redirect("/" + req.params.uuid);
  //    });
  //   });
  // });

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
    sessionManage(req);
    opts.daler.getRegister({ uniqueid: req.params.uuid }, function(data){
      console.log(data);
      res.render('index/regis', { val: data });
    });
  });

  app.get('/', function (req, res) {
    sessionManage(req);
    res.writeHead(301, { Location: 'http://landing.que.one/'});
    res.end();
  });
}