var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var uuid = require('node-uuid');
var session = require('express-session'), localSession = {};
var daler = require('./dal/daler.js').daler;
var logger = require('./logger/logger.js').logger;
var mailer = require('./libs/emailer.js').emailer;
var qutils = require('./utils/utils.js').qutils;
var service = require('./bl/servicemapper.js').service;


app.use(session({secret: 'LORDJESUSMYSAVIOUR', resave: true,
    saveUninitialized: true}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var opts = {
	daler: daler, 
	localSession: localSession, 
	bodyParser: bodyParser, 
	logger: logger,
	mailer: mailer,
	qutils: qutils,
	service: service,
	guid: uuid
};

require('./routes/staticrouting.js')(app, opts);
require('./routes/htmlrouting.js')(app, opts);
require('./routes/servicerouting.js')(app, opts);

var server = app.listen(9095, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Landing app listening at http://%s:%s', host, port);
});