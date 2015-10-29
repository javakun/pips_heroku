'use strict';

//loading dependencies
var express = require('express');
var path = require('path');

//initializing express application
var app = express();

//Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Logger
var logger = require('morgan');
app.use(logger('dev'));

// Cookies / Session
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// layouts Setup
var exphbs = require('express-handlebars');

// Stylus Setup
var stylus = require('stylus');
var nib = require('nib');

// Compile Stylus on the fly
if (!config().html.css.stylusPrecompile) {
  app.use(
    stylus.middleware({
      src: __dirname + '/stylus',
      dest: __dirname + '/public/css',
      compile: function(str, path) {
        return stylus(str)
          .set('filename', path)
          .set('compress', config().html.css.compress)
          .set(nib());
      }
    })
  );
}

// Handlebars Setup
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts',
  partialDir: __dirname + '/views/partials'
}));

// View and Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', config().views.engine);
app.use(express.static(path.join(__dirname, 'public')));

//Routes
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

// Export application or Initialize server
if (!!(module.parent)){
  module.exports = app;
}else {
  app.listen(3000);
}
