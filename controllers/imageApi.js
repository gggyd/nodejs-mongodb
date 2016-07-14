var path   = require('path'),
    Models = require('../models'),
    Image = Models.Image
    ;

module.exports = {
  images: function(req, res) {
    Image.find({}, {}, {
      sort: { 'timestamp': -1 }
    }, function(err, images) {
      if (err) { throw err; }

      res.json(images);
    })
  }
}