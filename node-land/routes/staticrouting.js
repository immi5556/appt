module.exports = function(app, opts){
  var path = require('path');
  var staticoptions = {
    //root: __dirname,
    dotfiles: 'deny',
    headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };  

  app.get('/js/:jsfile', function(req, res){
      res.sendfile(path.resolve('./js/' + req.params.jsfile), staticoptions, opts.logger.consoleLog(req, res));
  });

  app.get('/css/:cssfile', function(req, res){
      res.sendfile(path.resolve('./css/' + req.params.cssfile), staticoptions, opts.logger.consoleLog(req, res));
  });

  app.get('/content/img/:imgfile', function(req, res){
      res.sendFile(path.resolve('./content/img/' + req.params.imgfile), staticoptions, opts.logger.consoleLog(req, res));
  });

  app.get('/images/:imgfile', function(req, res){
      res.sendfile(path.resolve('./images/' + req.params.imgfile), staticoptions, opts.logger.consoleLog(req, res));
  });
}