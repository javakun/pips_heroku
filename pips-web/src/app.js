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
var aboutus = require('./routes/aboutus');
var catalogueevents = require('./routes/catalogueevents');
var cataloguegroups = require('./routes/cataloguegroups');
var catalogueprojects = require('./routes/catalogueprojects');
var createaccount = require('./routes/createaccount');
var createproject = require('./routes/createproject');
var createprofile = require('./routes/createprofile');
var createevent = require('./routes/createevent');
var creategroup = require('./routes/creategroup');
var editevent = require('./routes/editevent');
var editgroup = require('./routes/editgroup');
var submitresume = require('./routes/submitresume');
var submitIPA = require('./routes/submitIPA');
var submitsuggestion = require('./routes/submitsuggestion');
var event = require('./routes/event');
var login = require('./routes/login');
var profile = require('./routes/profile');
var project = require('./routes/project');
var viewalltags = require('./routes/viewalltags');
var viewtagged = require('./routes/viewtagged');

//using routes
app.use('/', home);
app.use('/routes/users', users);
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

// Disabling x-powered-by
app.disable('x-powered-by');

// Export application or start the server
if (!!module.parent) {
  module.exports = app;
} else {
  app.listen(config().serverPort);
}
