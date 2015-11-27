var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session'), localSession = {};
var daler = require('./dal/daler.js').daler;
var logger = require('./logger/logger.js').logger;
var jade = require('jade');

app.use(session({secret: 'LORDJESUSMYSAVIOUR', resave: true,
    saveUninitialized: true}));

app.locals.moment = require('moment');
app.set('view engine', 'jade');

var opts ={
	app: app,
	bodyParser: bodyParser,
	session: session,
	localSession: localSession,
	daler: daler,
	logger: logger,
	jade: jade
}

require('./routes/staticrouting.js')(app, daler, localSession, logger);
require('./routes/htmlrouting.js')(app, daler, localSession, logger);
require('./routes/servicerouting.js')(opts);

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});