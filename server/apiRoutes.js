var express = require('express'),
    router = express.Router(),
    imageApi = require('../controllers/imageApi'),
    appConfig = require('../appConfig')
    ;

module.exports = function(app) {
  router.get(appConfig.base.api + '/images', imageApi.images);

  app.use(router);
}
    