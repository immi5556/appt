var MongoClient = require('mongodb').MongoClient;

var wrapper = function () {

		var Landing = { 
	  	title: 'Within 30', 
	  	message: 'My Saviour!',
	  	header: {
	  		sections: [
	  		{
	  			content: 'Within 30'
	  		},
	  		{
	  			content: 'detailed expression about the site'
	  		}
	  		]
	  	},
	  	companyContent: {
	  	},
	  	tileContent: {	
	  		sections: [
	  		{
	  			content: 'Saloon'
	  		},
	  		{
	  			content: 'Dentist'
	  		},
	  		{
	  			content: 'Doctor'
	  		}
	  		]
	  	}
	  };

	  var dbaudit;
	  MongoClient.connect("mongodb://localhost:27017/Audit", function(err, db) {
		if(err) { return console.dir(err); }
		dbaudit = db;
	  });

	 var LogTrace = function(obj){
		obj.createdat = Date.now();
		dbaudit.collection('logusers').insert(obj);
	 }
	return {
		landing : Landing,
		logTrace: LogTrace
	}
}


module.exports.daler = wrapper();