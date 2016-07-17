var path = require('path'),
    routes = require('./routes'),
    apiRoutes = require('./apiRoutes'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    multer = require('multer'),
    cors = require('cors'),
    moment = require('moment');

// CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(multer({
    dest: path.join(__dirname, 'public/upload/temp')
  }));
  app.use(multer({dest:'./uploads/'}));
  app.use(bodyParser.urlencoded({
    'extended': true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser('some-secret-value-here'));
  app.use(allowCrossDomain);

  routes(app);
  apiRoutes(app);

  app.use('/public/', express.static(path.join(__dirname, '../public')));
  app.use('/node_modules/', express.static(path.join(__dirname, '../node_modules')));
  if ('development' === app.get('env')) {
    app.use(errorHandler);
  }

  app.engine('handlebars', exphbs.create({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: [app.get('views') + '/partials'],
    helpers: {
      timeago: function(timestamp) {
        return moment(timestamp).startOf('minute').fromNow();
      }
    }
  }).engine);
  app.set('view engine', 'handlebars');

  return app;
};