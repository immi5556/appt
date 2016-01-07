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

  app.get('/scripts/:jsfile', function(req, res){
      res.sendFile(path.resolve('./scripts/' + req.params.jsfile), staticoptions, logger.consoleLog(req, res));
  });

  app.get('/styles/:cssfile', function(req, res){
      res.sendFile(path.resolve('./styles/' + req.params.cssfile), staticoptions, logger.consoleLog(req, res));
  });

  app.get('/content/images/:imgfile', function(req, res){
      res.sendFile(path.resolve('./content/images/' + req.params.imgfile), staticoptions, logger.consoleLog(req, res));
  });

  app.get('/images/sample/:imgfile', function(req, res){
      res.sendFile(path.resolve('./content/img/tiles/' + req.params.imgfile), staticoptions, logger.consoleLog(req, res));
  });

  app.get('/js/:datafile', function(req, res){
      res.sendFile(path.resolve('./data/' + req.params.datafile), staticoptions, logger.consoleLog(req, res));
  });
}