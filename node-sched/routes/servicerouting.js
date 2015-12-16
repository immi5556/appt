module.exports = function(opts){
  opts.app.use(opts.bodyParser.json());
  opts.app.post('/endpoint/:action', function(req, res){
  	var obj = req.body;
  	if (req.params.action == 'insert') {
	    opts.daler.logSchedule(obj);
		opts.daler.insertSchedule(obj);
	    res.send(req.body);
	}
	if (req.params.action == 'getresources') {
		console.log(obj.subdomain);
	 	opts.daler.getDetails(obj.subdomain, function(err, data) {
	  	 	if (err){
				res.status(500).send(err);
				return;
			}
			res.send(data[0]);
	  	});
	}
  });
}