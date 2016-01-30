var MongoClient = require('mongodb').MongoClient;

var wrapper = function (opt) {
	var quizdb, auditdb, opts = opt;
	MongoClient.connect("mongodb://localhost:27080/Quizer", function(err, db) {
	  if(err) { return console.dir(err); }
	  	quizdb = db;
	});

	MongoClient.connect("mongodb://localhost:27080/Audit", function(err, db) {
	  if(err) { return console.dir(err); }
	  	auditdb = db;
	});

	var LogTrace = function(obj){
		obj.createdat = opts.moment.utc().format();
		auditdb.collection("Audit").insert(obj);
	}

	var InsertQuestions = function(obj){
	 	var collection = landingdb.collection('Questions');
		obj.createdat = Date.now();
		collection.insert(obj);	
	}

	return {
		insertQuestions: InsertQuestions,
		logTrace: LogTrace
	}
}


module.exports.daler = function(opt) {
	return wrapper(opt);
}