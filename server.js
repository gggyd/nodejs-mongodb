var express = require('express'),
    config = require('./server/configure'),
    app = express();

app.set('port', process.env.PORT || 3500);
app.set('views', __dirname + '/views');
app = config(app);

app.get ('/', function(req, res) {
  res.send('Hello World');
});

app.listen(app.get('port'), function() {
  console.log('Server up: Http://0.0.0.0:' + app.get('port'));
});