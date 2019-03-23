var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var cors = require('cors')
var app = express();
var validator = require('express-validator');
app.use(validator());
/**
 * Routes
 */
var account = require('./routes/account/register');
var login = require('./routes/account/login');
var adminLogin = require('./routes/account/admin-login');
var admin = require('./routes/admin/admin');
var user = require('./routes/locom/users');
var dashboard = require('./routes/locom/dashboard');
var storeJob = require('./routes/store/job-feeds');
var storeSetting = require('./routes/store/setting');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(account);
app.use(login);
app.use(dashboard);
app.use(storeJob);
app.use(user);
app.use(storeSetting);
app.use(adminLogin);
app.use(admin);
 /**
   * Validations For Requests
   */

  // app.use(validator());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
