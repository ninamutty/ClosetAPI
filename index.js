'use strict';
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');


app.get('/outfits', function(req, res) {
  res.json({outfits: "This is the first path for an express api for Closet"})
})

app.listen(3000)
