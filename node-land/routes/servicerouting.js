module.exports = function(app, opts){
	  app.post('/endpoint/:action', function(req, res){
	  	//opts.logger.log('reached...');
	  	//opts.logger.log(req.params.action);
	  	//opts.logger.log(req.headers);
	  	var obj = req.body;
	  	obj.action = req.params.action;
	  	opts.logger.log('body: ' + JSON.stringify(req.body));
	  	opts.service.execute(opts, obj);
		res.send(req.body);
	  });
}