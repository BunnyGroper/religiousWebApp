var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
// mongoose.connect('mongodb://test:test@ds147167.mlab.com:47167/sikhreligion');
mongoose.connect('mongodb://localhost/sikhreligion');
var db = mongoose.connection;


// User Routes
var routes = require('./controller/index');
var bachan = require('./controller/user/bachan');
var contact = require('./controller/user/contact');
var download = require('./controller/user/download');
var hukumnama = require('./controller/user/hukumnama');
var kathas = require('./controller/user/kathas');
var quote = require('./controller/user/quote');
var schedule = require('./controller/user/schedule');
var simran = require('./controller/user/simran');
var viewKatha = require('./controller/user/viewKatha');


// Admin Routes
var login = require('./controller/admin/index');
var register = require('./controller/admin/register');
var home = require('./controller/admin/home');
var logout = require('./controller/admin/logout');

var adminBachan = require('./controller/admin/bachan');
var adminSimran = require('./controller/admin/simran');
var adminDownload = require('./controller/admin/download');
var adminQuotes = require('./controller/admin/quotes');
var adminKatha = require('./controller/admin/katha');
var adminviewKatha = require('./controller/admin/viewKatha');
var adminSchedule = require('./controller/admin/schedule');
var adminContact = require('./controller/admin/contact');
var adminImg = require('./controller/admin/img');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');




// uncomment after placing your favicon in /public

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle Expression Sessions
app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave:true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());


// Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});



// User Routing
app.use('/', routes);
app.use('/bachan', bachan);
app.use('/contact', contact);
app.use('/download', download);
app.use('/hukumnama', hukumnama);
app.use('/kathas', kathas);
app.use('/quote', quote);
app.use('/schedule', schedule);
app.use('/simran', simran);
app.use('/viewKatha',viewKatha);

// Admin Routing
app.use('/admin/login',login);
app.use('/admin/register',register);
app.use('/admin/home',home);
app.use('/admin/bachan',adminBachan);
app.use('/admin/simran',adminSimran);
app.use('/admin/download',adminDownload);
app.use('/admin/quote',adminQuotes);
app.use('/admin/katha',adminKatha);
app.use('/admin/viewKatha',adminviewKatha);
app.use('/admin/schedule',adminSchedule);
app.use('/admin/contact',adminContact);
app.use('/admin/logout',logout);
app.use('/admin/img',adminImg);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
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
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
