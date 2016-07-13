var express = require('express'),
    config = require('./server/configure'),
    app = express(),
    mongoose = require('mongoose');

app.set('port', process.env.PORT || 3500);
app.set('views', __dirname + '/views');
app = config(app);
// mongoose.connect('mongodb://localhost/imgPloadr');
mongoose.connect('mongodb://gggyd:gggyd.123@ds021884.mlab.com:21884/imgploadr');
mongoose.connection.on('open', function() {
  console.log('Mongoose connected');
});

app.listen(app.get('port'), function() {
  console.log('Server up: Http://0.0.0.0:' + app.get('port'));
});