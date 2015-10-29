'use strict';

// Loading dependencies
var express = require('express');
var path = require('path');

// Initializing express application
var app = express();

// Loading Config
var config = require('./src/lib/config');
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
  layoutsDir: __dirname + './scr/views/layouts',
  partialsDir: __dirname + './scr/views/partials'
}));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', config().views.engine);
app.use(express.static(path.join(__dirname, 'public')));

//routes
var home = require('./src/routes/home');
var users = require('./src/routes/users');
var aboutus = require('./src/routes/aboutus');
var catalogueevents = require('./src/routes/catalogueevents');
var cataloguegroups = require('./src/routes/cataloguegroups');
var catalogueprojects = require('./src/routes/catalogueprojects');
var createaccount = require('./src/routes/createaccount');
var createproject = require('./src/routes/createproject');
var createprofile = require('./src/routes/createprofile');
var createevent = require('./src/routes/createevent');
var creategroup = require('./src/routes/creategroup');
var editevent = require('./src/routes/editevent');
var editgroup = require('./src/routes/editgroup');
var submitresume = require('./src/routes/submitresume');
var submitIPA = require('./src/routes/submitIPA');
var submitsuggestion = require('./src/routes/submitsuggestion');
var event = require('./src/routes/event');
var login = require('./src/routes/login');
var profile = require('./src/routes/profile');
var project = require('./src/routes/project');
var viewalltags = require('./src/routes/viewalltags');
var viewtagged = require('./src/routes/viewtagged');

//using routes
app.use('./src/view/home/', home);
app.use('./src/view/create/', createproject);
app.use('./src/view/submit/', submitresume);
app.use('./src/view/aboutus/', aboutus);
app.use('./src/view/catalogue/', catalogueevents);
app.use('./src/view/catalogue/', cataloguegroups);
app.use('./src/view/catalogue/', catalogueprojects);
app.use('./src/view/create/', createaccount);
app.use('./src/view/create/', createproject)
app.use('./src/view/create/', createprofile);
app.use('./src/view/create/', createevent);
app.use('./src/view/create', creategroup);
app.use('./src/view/edit/', editevent);
app.use('./src/view/edit/', editgroup);
app.use('./src/view/submit/', submitIPA);
app.use('./src/view/submit/', submitsuggestion);
app.use('./src/view/page/', event);
app.use('./src/view/page/', login);
app.use('./src/view/page/', profile);
app.use('./src/view/page/', project);
app.use('./src/view/view/', viewalltags);
app.use('./src/view/view/', viewtagged);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Export application or start the server
if (!!module.parent) {
  module.exports = app;
} else {
  app.listen(config().serverPort);
}
