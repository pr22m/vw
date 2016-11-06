var express = require('express');
var mongodb = require('mongodb');
var morgan = require('morgan');

var app = express();
var db;

function checkDb(req, res, next){
  if (db){return next();}

  res.send('DB is not ready');
}

app.use(morgan("dev"));

var router = new express.Router();

app.use("/test", router);

router.get("/", function(req, res){
  res.send('test');
});

router.post("/add", checkDb, function(req, res){
  var list = db.collection("list");
  var obj = {test : Math.random()};

  list.insert(obj, function(err){
    if (err) {throw err;}
	
    res.status(201).send("Ok");
  });
});

router.get("/list", checkDb, function(req, res){
  db.collection("list").find({}).toArray(function(err, data){
    if (err) {throw err;}
 
    res.json(data);
  });  
});

var port = process.env.PORT || 3000;

app.listen(port);

console.log('Listening on port: ', port);

mongodb.MongoClient.connect(process.env.MONGO_DB_URL, function(err, _db){
  if (err) {throw err;}

  db = _db;
});
