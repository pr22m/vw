const express = require('express');
const morgan = require('morgan');

const user = require('./routes/user');

const app = express();

app.use(morgan('dev'));

app.use('/user', user);

const port = process.env.PORT || 3000;

app.listen(port);

/* eslint-disable no-console */
console.log('Listening on port: ', port);
