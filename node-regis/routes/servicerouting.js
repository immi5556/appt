module.exports = function(opts){
  opts.app.use(opts.bodyParser.json());
  opts.app.post('/endpoint/:action', function(req, res){
  	 var obj = req.body;
  	 opts.daler.checkDomain(obj, function(err){
  	 	if(err){
  	 		res.status(500).send(err);
  	 		return;
  	 	}
  	 	res.send(req.body);
  	 });
  });
}