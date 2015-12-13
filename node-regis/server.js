var express = require('express');
var upload = require('jquery-file-upload-middleware');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session'), localSession = {};
var daler = require('./dal/daler.js').daler;
var logger = require('./logger/logger.js').logger;
var utils = require('./utils/utils.js').qutils;
var jade = require('jade');
var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/favicon.ico'));
app.use('/static', express.static('public'));
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
	jade: jade,
	utils: utils
}

upload.configure({
    uploadDir: __dirname + '/content/uploads/logos',
    uploadUrl: '/uploads/'
});

app.use('/upload', upload.fileHandler());
        

require('./routes/staticrouting.js')(app, daler, localSession, logger);
require('./routes/htmlrouting.js')(app, opts);
require('./routes/servicerouting.js')(opts);

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});