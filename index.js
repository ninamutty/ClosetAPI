'use strict';
// var router = express.Router();
require('dotenv').config()
var express = require('express');
var router = require('./routes/user.js');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
// var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
// var expressJWT = require('express-jwt'); // used to create, sign, and verify tokens
// var unless = require('express-unless');
var User   = require('./user'); // get our mongoose model
// var cors = require('cors');

var app = express();

// require('./seeds/users.js');

var port = 3000;

// connect to database
mongoose.connect(process.env.DB_DEV_URL, function(err) {
  if (err) {
    console.log('Failed to connect to mongodb!');
  } else {
    console.log('Successfully connected to Mongo!');
  }
});

router.get('/', function(req, res) {
  res.send('Hello and Welcome! The API is at http://localhost:' + port + '/api');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port);
console.log('Magic happens at http://localhost:' + port);

app.use('/api', router);  //first parameter is name space and second route is the router - routes will automatically be added
