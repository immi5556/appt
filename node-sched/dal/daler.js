var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var objectId = mongo.ObjectId;
var wrapper = function () {
	var dbaudit, dbland, dbclient, dbsched;
	MongoClient.connect("mongodb://localhost:27017/Audit", function(err, db) {
	  if(err) { return console.dir(err); }
	  dbaudit = db;
	});

	MongoClient.connect("mongodb://localhost:27017/Clients", function(err, db) {
	  if(err) { return console.dir(err); }
	  dbclient = db;
	});

	MongoClient.connect("mongodb://localhost:27017/Schedule", function(err, db) {
	  if(err) { return console.dir(err); }
	  dbsched = db;
	});

	var LogSchedule = function(obj){
	  var collection = dbaudit .collection('logschedule');
	  obj.createdat = Date.now();
	  collection.insert(obj);
	}

	var GetDetails = function(data, callback){
		//dbclient.collection('Clients').find({ registration: { website:  { subdomain: data.registration.website.subdomain } } }).toArray(function(err, docs) {
		dbclient.collection('Clients').find({ 'subdomain' : data } ).toArray(function(err, docs) {	
			if (err) console.dir(err);
			if (!docs.length){
				callback("Invalid subdomain.");
			}else {
				console.log(docs[0]);
				callback(undefined, docs);
			}
		});
	}

	var InsertSchedule = function(data){
		var collection = dbsched.collection(data.subdomain);
		data.createdat = Date.now();
		collection.insert(data);	
	}

	return {
		logSchedule: LogSchedule,
		getDetails: GetDetails,
		insertSchedule: InsertSchedule
	}
}


module.exports.daler = wrapper();