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
  layoutsDir: path.join(__dirname, './src/views/layouts'),
  partialsDir: path.join(__dirname, './src/views/partials')
}));

// View engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', config().views.engine);
app.use(express.static(path.join(__dirname, './src/public')));

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
app.use('/', home);
app.use('/users', users);
app.use('/create', createproject);
app.use('/submit', submitresume);
app.use('/aboutus', aboutus);
app.use('/catalogueevents', catalogueevents);
app.use('/cataloguegroups', cataloguegroups);
app.use('/catalogueprojects', catalogueprojects);
app.use('/createaccount', createaccount);
app.use('/createproject', createproject)
app.use('/createprofile', createprofile);
app.use('/createevent', createevent);
app.use('/creategroup', creategroup);
app.use('/editevent', editevent);
app.use('/editgroup', editgroup);
app.use('/submitIPA', submitIPA);
app.use('/submitsuggestion', submitsuggestion);
app.use('/event', event);
app.use('/login', login);
app.use('/profile', profile);
app.use('/project', project);
app.use('/viewalltags', viewalltags);
app.use('/viewtagged', viewtagged);

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
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
    res.send(err.message);
  });
}

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
  res.send(err.message);
});

// Export application or start the server
if (!!module.parent) {
  module.exports = app;
} else {
  app.listen(config().serverPort);
}
