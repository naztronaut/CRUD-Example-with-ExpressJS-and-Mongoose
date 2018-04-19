var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
var logger = require('morgan');
let mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Connection settings
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cscie3-shard-00-00-uitso.mongodb.net:27017,cscie3-shard-00-01-uitso.mongodb.net:27017,cscie3-shard-00-02-uitso.mongodb.net:27017/pokemon?ssl=true&replicaSet=CSCIE3-shard-0&authSource=admin`);
let db = mongoose.connection;
db.on('error', (err)=>{console.error(`connection error:${err}`);});

var indexRouter = require('./routes/index');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
