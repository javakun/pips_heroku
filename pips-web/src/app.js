'use strict';

// Loading dependencies
var express = require('express');
var path = require('path');

// Initializing express application
var app = express();

// Loading Config
var config = require('./lib/config');
var nib = require('nib');

// Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Logger
var logger = require('morgan');
app.use(logger('dev'));

// Cookies / Session
var cookieParser = require('cookie-parser');
//var session = require('./lib/helpers/session');

app.use(cookieParser());
//app.use(session);

// Layout setup
var exphbs = require('express-handlebars');
//var hbsHelpers = require('./lib/helpers/handlebars');

// Stylus setup
var stylus = require('stylus');

// Handlebars setup
app.engine(config().views.engine, exphbs({
  extname: config().views.extension,
  defaultLayout: config().views.layout,
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', config().views.engine);
app.use(express.static(path.join(__dirname, 'public')));

//routes
var home = require('./routes/home');
var users = require('./routes/users');
var createproject = require('./routes/createproject');
var submitresume = require('./routes/submitresume');

app.use('/', home);
app.use('/routes/users', users);
app.use('/createproject', createproject);
app.use('/submitresume', submitresume);

// Disabling x-powered-by
app.disable('x-powered-by');

// Export application or start the server
if (!!module.parent) {
  module.exports = app;
} else {
  app.listen(config().serverPort);
}
