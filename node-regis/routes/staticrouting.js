module.exports = function(app, daler, localSession, logger){
  var path = require('path');
  var staticoptions = {
    //root: __dirname,
    dotfiles: 'deny',
    headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };  

  app.get('/uploaded/:afile', function(req, res){
      res.sendFile(path.resolve('./content/uploads/logos/' + req.params.afile), staticoptions, logger.consoleLog(req, res));
  });

  app.get('static/:folder/:afile', function(req, res){
      res.sendFile(path.resolve('./public/' + req.params.folder + '/' + req.params.afile), staticoptions, logger.consoleLog(req, res));
  });

  app.get('/scripts/:jsfile', function(req, res){
      res.sendFile(path.resolve('./scripts/' + req.params.jsfile), staticoptions, logger.consoleLog(req, res));
  });

  app.get('/scripts/upl/:jsfile', function(req, res){
      res.sendFile(path.resolve('./scripts/upload-js/' + req.params.jsfile), staticoptions, logger.consoleLog(req, res));
  });

  app.get('/styles/:cssfile', function(req, res){
      res.sendFile(path.resolve('./styles/' + req.params.cssfile), staticoptions, logger.consoleLog(req, res));
  });

  app.get('/content/img/:imgfile', function(req, res){
      res.sendFile(path.resolve('./content/img/' + req.params.imgfile), staticoptions, logger.consoleLog(req, res));
  });


  app.get('/content/uploads/logos/:imgfile', function(req, res){
      res.sendFile(path.resolve('./content/uploads/logos/' + req.params.imgfile), logger.consoleLog(req, res));
  });

  app.get('/images/sample/:imgfile', function(req, res){
      res.sendFile(path.resolve('./content/img/tiles/' + req.params.imgfile), staticoptions, logger.consoleLog(req, res));
  });
}