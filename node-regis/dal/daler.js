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

	var GetRegister = function(filter, callback){
		console.log(filter);
		dbland.collection('userlanding').find((filter)).toArray(function(err, docs){
			console.log(docs);
			if (docs.length && docs[0].referenceClientId){
				GetClient({_id: objectId(docs[0].referenceClientId)}, function(err1, doc1){
				  if (callback){
				  	if (doc1.length) {
				  		var nn = doc1[0];
				  		nn.landing = docs[0];
				  		callback(nn);
				  	}else {
				  		callback({
				  			landing: docs[0],
				  			client: ''		
				  		});
				  	}
				  }
				});
			}
			else{
				callback({
					landing: docs[0],
					client: undefined
				});
			}
		});
	}

	var UpdateRegisters = function(data, callback){
		dbland.collection('userlanding').findAndModify({ _id:  objectId(data.landing._idstore) }, []
		,{$set: { action : 'cupdate', referenceClientId: data.referenceClientId } }
		,function(err, docs){
			if (err) {
				console.dir(err);
				callback(err);
			}
			console.log("updated...");
			console.log(docs);
			LogTrace(docs);
		});
	}

	var CheckDomain = function(data, callback){
		console.log(data);
		dbclient.collection('Clients').find({ 'subdomain' : data.subdomain } ).toArray(function(err, docs) {	
			if (err) console.dir(err);
			if (docs.length && !data._clientid){
				callback("Subdomain already taken");
			}else if(data._clientid){
				UpdateClient(data, function(err2, docs2){
					if (err2) {
						console.dir(err2);
						callback(err2);
					}
					callback(undefined);
				});
			}
			else {
				console.log(docs);
				CreatetClient(data, function(err1, docs1){
					if (err1) {
						console.dir(err1);
						callback(err1);
					}
					console.log(docs1);
					data.referenceClientId = data._id;
					UpdateRegisters(data);
					callback(undefined);
				});
			}
		});
	}

	var GetClient = function(filter, callback){
		console.log(filter);
		dbclient.collection('Clients').find((filter)).toArray(function(err, docs){
			console.log(docs);
			if (callback)
				callback(undefined, docs);
		});
	}

	var UpdateClient = function(data, callback){
		var __id = objectId(data._clientid);
		dbclient.collection('Clients').findAndModify({ _id:  __id }, []
		,{$set: data }
		,function(err, docs){
			if (err) {
				console.dir(err);
				callback(err);
			}
			console.log("updated...");
			console.log(docs);
			LogTrace(docs);
			callback(undefined);
		});
	}

	var CreatetClient = function(data, callback) {
		var collection = dbclient.collection('Clients');
	  	data.createdat = Date.now();
	  	collection.insert(data, function(err, docs){
	  		if (err) {
				console.dir(err);
				callback(err);
			}
			console.log(docs);
			callback(undefined, docs);
	  	});
	};

	return {
		logTrace: LogTrace,
		getRegisters: GetRegisters,
		getRegister: GetRegister,
		updateRegister: UpdateRegisters,
		checkDomain: CheckDomain,
		createClient: CreatetClient
	}
}


module.exports.daler = wrapper();