var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var config = require('./config');
var routes = require('./routes/index');
var users = require('./routes/users');
//var apictrl = require('./api/ctrl/apictrl');
var userctrl = require('./api/ctrl/userctrl');

// port = process.env.PORT || 8080;

var app = express();

mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); 

 // mongoose.connect('mongodb://localhost/demoapp'); 
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//view engine setup for html
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));


app.use(userctrl);

//include image file 
app.use('/img', express.static('public/images'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// var RestaurantController = require('./app/controllers/restaurantctrl');
// var CharityController = require('./api/app');

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
