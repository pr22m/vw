var express = require('express');

var app = express();

app.get("/", function(req, res){
  res.send('test');
});

app.get("/db", function(req, res){
  res.send(process.env.MONGO_DB_URL);
});

var port = process.env.PORT || 3000;

app.listen(port);

console.log('Listening on port: ', port);
