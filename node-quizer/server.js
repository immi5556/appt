var opts = {};
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var uuid = require('node-uuid');
var session = require('express-session'), localSession = {};
var daler = require('./dal/daler.js').daler(opts);
var logger = require('./logger/logger.js').logger;
var mailer = require('./libs/emailer.js').emailer;
var qutils = require('./utils/utils.js').qutils;
var cors = require('cors');
var moment = require('moment');

app.use(session({secret: 'LORDJESUSMYSAVIOUR', resave: true,
    saveUninitialized: true}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var whitelist = ['http://que.one', 'http://www.que.one'];
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};

	opts.daler = daler, 
	opts.localSession = localSession, 
	opts.bodyParser = bodyParser, 
	opts.logger = logger,
	opts.mailer = mailer,
	opts.qutils = qutils,
	opts.guid = uuid,
	opts.moment = moment,
	opts.cors = cors,
	opts.corsOptions = corsOptions

require('./routes/staticrouting.js')(app, opts);
require('./routes/htmlrouting.js')(app, opts);
require('./routes/servicerouting.js')(app, opts);

var server = app.listen(9005, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Quizer app listening at http://%s:%s', host, port);
});