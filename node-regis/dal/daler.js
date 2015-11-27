var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var objectId = mongo.ObjectId;
var wrapper = function () {
	var dbaudit, dbland, dbclient;
	MongoClient.connect("mongodb://localhost:27017/Audit", function(err, db) {
	  if(err) { return console.dir(err); }
	  dbaudit = db;
	});

	MongoClient.connect("mongodb://localhost:27017/Landing", function(err, db) {
	  if(err) { return console.dir(err); }
	  dbland = db;
	});

	MongoClient.connect("mongodb://localhost:27017/Clients", function(err, db) {
	  if(err) { return console.dir(err); }
	  dbclient = db;
	});

	var LogTrace = function(obj){
	  var collection = dbaudit .collection('logregisters');
	  obj.createdat = Date.now();
	  collection.insert(obj);
	}

	var GetRegisters = function(filter, callback){
		var result; 
		dbland.collection('userlanding').find((filter || {})).toArray(function(err, docs){
			result = docs;	
			console.log(result);
			if (callback)
				callback(result);
		});
	}

	var UpdateRegisters = function(data, callback){
		dbland.collection('userlanding').findAndModify({ _id:  objectId(data._oid) }, []
		,{$set: { action : 'cupdate' } }
		,function(err, docs){
			if (err) console.dir(err);
			console.log(docs);
			LogTrace(docs);
		});
	}

	var CheckDomain = function(data, callback){
		//dbclient.collection('Clients').find({ registration: { website:  { subdomain: data.registration.website.subdomain } } }).toArray(function(err, docs) {
		dbclient.collection('Clients').find({ 'registration.website.subdomain' : data.registration.website.subdomain } ).toArray(function(err, docs) {	
			if (err) console.dir(err);
			if (docs.length){
				callback("Subdomain already taken");
			}else {
				console.log(docs);
				CreatetClient(data);
				UpdateRegisters(data);
				callback(undefined);
			}
		});
	}

	var CreatetClient = function(data, callback) {
		var collection = dbclient.collection('Clients');
	  	data.createdat = Date.now();
	  	collection.insert(data);
	};

	return {
		logTrace: LogTrace,
		getRegisters: GetRegisters,
		updateRegister: UpdateRegisters,
		checkDomain: CheckDomain,
		createClient: CreatetClient
	}
}


module.exports.daler = wrapper();