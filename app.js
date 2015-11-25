'use strict';
//permanent id
var id;
// Loading dependencies
var express = require('express');
var path = require('path');
var session = require('express-session');

// Initializing express application
var app = express();


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

app.use(cookieParser());

// View engine setup
app.set('views', path.join(__dirname, './src/views'));
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, './src/public')));

// Session Setup
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'PIPS'
}));

//routes
var users = require('./src/routes/users');
var catalogueevents = require('./src/routes/catalogueevents');
var cataloguegroups = require('./src/routes/cataloguegroups');
var catalogueprojects = require('./src/routes/catalogueprojects');
var cataloguefollowers = require('./src/routes/cataloguefollowers');
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
app.use('/', login);
app.use('/users', users);
app.use('/create', createproject);
app.use('/submit', submitresume);
app.use('/catalogueevents', catalogueevents);
app.use('/cataloguegroups', cataloguegroups);
app.use('/catalogueprojects', catalogueprojects);
app.use('/cataloguefollowers', cataloguefollowers);
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
app.use(function (req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
});

// error handlers
if (app.get('env') === 'development') {
 app.use(function (err, req, res, next) {
   res.status(err.status || 500);
   res.send({
     message: err.message,
     error: err
   });
 });
}

// production error handler
app.use(function (err, req, res, next) {
 res.status(err.status || 500);
 res.send({
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
