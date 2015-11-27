var wrapper = function () {

	 var Execute = function(opts, objs) {
		if ((objs.action || '').toLowerCase() == 'ccreate'){
			objs.action = 'ccreate';
			objs.uniqueid = opts.guid.v4();
			opts.daler.insertLanders(objs);
			opts.mailer.send(opts, objs);
		}
	 }
	return {
		execute: Execute
	}
}


module.exports.service = wrapper();