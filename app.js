const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { init } = require('./src/lib/mongoose');
const routers = require('./src/modules/routes');
const passport = require('./src/lib/passport');
const result = require('./src/utils/helpers/result');

const app = express();
init();

app.use(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routers);

// catch 404 and forward to error handler
app.use(function (req, res) {
    return result.error(res, { message: 'Not Found', status: 404 });
});

// error handler
app.use(function (err, req, res, /* next */) {
    return result.error(res, err);
});

module.exports = app;
