require('./lib/server');
//
// const express = require('express');
// const { MongoClient } = require('mongodb');
// const morgan = require('morgan');
//
// const app = express();
//
// let db;
//
// function checkDb(req, res, next) {
//   if (db) { return next(); }
//   return res.send('DB is not ready');
// }
//
// app.use(morgan('dev'));
//
// const router = new express.Router();
//
// app.use('/test', router);
//
// router.get('/', (req, res) => {
//   res.send('test');
// });
//
// router.post('/add', checkDb, (req, res) => {
//   const list = db.collection('list');
//   const obj = { test: Math.random() };
//
//   list.insert(obj, (err) => {
//     if (err) { throw err; }
//     res.status(201).send('Ok');
//   });
// });
//
// router.get('/list', checkDb, (req, res) => {
//   db.collection('list').find({}).toArray((err, data) => {
//     if (err) { throw err; }
//     res.json(data);
//   });
// });
//
// const port = process.env.PORT || 3000;
//
// app.listen(port);
//
// /* eslint-disable no-console */
// console.log('Listening on port: ', port);
//
// MongoClient.connect(process.env.MONGO_DB_URL, (err, _db) => {
//   if (err) { throw err; }
//   db = _db;
// });
