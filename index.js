'use strict';
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

// AWS = require('aws-sdk');
// Doc = require("dynamodb-doc");
// var Dynamodb = new AWS.DynamoDB();
// var DocClient = new Doc.DynamoDB(Dynamodb);

app.get('/outfits', function(req, res) {
  res.json({outfits: "This is the first path for an express api for Closet"})
})

app.listen(8080)
