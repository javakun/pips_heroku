'use strict';
//permanent id
var id;
// Loading dependencies
var express = require('express');
var path = require('path');
var session = require('express-session');

// Initializing express application
var app = express();

var client = require('./db').getClient();
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

function restrict(req, res, next) {
  if (req.session.user) next();
  else {
    res.redirect('/');
  }
}

//using routes
app.use('/', login);
app.use('/users', restrict, users);
app.use('/create', restrict, createproject);
app.use('/submit', restrict, submitresume);
app.use('/catalogueevents', restrict, catalogueevents);
app.use('/cataloguegroups', restrict, cataloguegroups);
app.use('/catalogueprojects', restrict, catalogueprojects);
app.use('/cataloguefollowers', restrict, cataloguefollowers);
app.use('/createaccount', createaccount);
app.use('/createproject', restrict, createproject)
app.use('/createprofile', restrict, createprofile);
app.use('/createevent', restrict, createevent);
app.use('/creategroup', restrict, creategroup);
app.use('/editevent', restrict, editevent);
app.use('/editgroup', restrict, editgroup);
app.use('/submitIPA', restrict, submitIPA);
app.use('/submitsuggestion', restrict, submitsuggestion);
app.use('/event', restrict, event);
app.use('/profile',restrict, profile);
app.use('/project', restrict, project);
app.use('/viewalltags', restrict, viewalltags);
app.use('/viewtagged', restrict, viewtagged);



function exitHandler(options, err) {
    if (err) client.end();
    if (options.exit) client.end();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{exit:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


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
