var createError = require('http-errors');
var express = require('express');
var path = require('path');
const multer = require('multer');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const config = require('./config');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');
const mediaRouter = require('./routes/mediaRoutes');
const LocalStorage  = require('passport-local');
const User = require('./models/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());



passport.use(new LocalStorage(
  (username, password, done) => {
    User.findOne({ email: username }).then(user => {
      if (!user) {
        return done(null, false, { message: 'No User Found' });
      }
      return done(null, user);
    })
  }
))


passport.serializeUser((user, done) => {
  console.log("User serialised");
  return done(null, user._id);
});

passport.deserializeUser((id, done) => {
  return done(null, { id });
});


app.use(express.static(path.join(__dirname, 'public')));

app.use('/profile', express.static('upload/images'));

app.use(cors());

app.use('/', indexRouter);
app.use('/api/v1/user', usersRouter);
app.use('/api/v1/media', mediaRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    message: err.message
  });
});

module.exports = app;
