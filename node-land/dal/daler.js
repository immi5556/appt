var MongoClient = require('mongodb').MongoClient;

var wrapper = function () {
	var auditdb, landingdb;
	MongoClient.connect("mongodb://localhost:27017/Audit", function(err, db) {
	  if(err) { return console.dir(err); }
	  	auditdb = db;
	});
	
	MongoClient.connect("mongodb://localhost:27017/Landing", function(err, db) {
	  if(err) { return console.dir(err); }
	  	landingdb = db;
	});

	var LogTrace = function(obj){
		var collection = auditdb.collection('loglanding');
		obj.createdat = Date.now();
		collection.insert(obj);
	}

	var LogEmail = function(obj){
		var collection = auditdb.collection('logemail');
		obj.createdat = Date.now();
		collection.insert(obj);
	}

	var InsertLanders = function(obj){
	 	var collection = landingdb.collection('userlanding');
		obj.createdat = Date.now();
		collection.insert(obj);	
	}

	return {
		logTrace: LogTrace,
		logEmail: LogEmail,
		insertLanders: InsertLanders
	}
}


module.exports.daler = wrapper();