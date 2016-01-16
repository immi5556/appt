module.exports = function(app, opts){
	  app.options('*', opts.cors());
	  app.post('/endpoint/:action', opts.cors(opts.corsOptions), function(req, res){
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