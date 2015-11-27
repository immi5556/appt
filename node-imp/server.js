var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session'), localSession = {};
var daler = require('./dal/daler.js').daler;
var logger = require('./logger/logger.js').logger;

app.use(session({secret: 'LORDJESUSMYSAVIOUR', resave: true,
    saveUninitialized: true}));

app.set('view engine', 'jade');

require('./routes/staticrouting.js')(app, daler, localSession, logger);
require('./routes/htmlrouting.js')(app, daler, localSession, logger);
require('./routes/servicerouting.js')(app, daler, localSession, bodyParser, logger);

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});