module.exports = function(app, daler, localSession, bodyParser, logger){
  app.use(bodyParser.json());
  app.post('/endpoint/:action', function(req, res){
  	var obj = req.body;
	  res.send(req.body);
  });
}