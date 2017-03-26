'use strict';
const mongoose = require('mongoose');

var outfitSchema = new mongoose.Schema({
  "name": String,
  "category": String,
  "reworn_count": Number,
  "favorite": Boolean,
  "created_at": Date,
  "updated_at": Date,
  "photo_file_name": String,
  "photo_content_type": String,
  "photo_file_size": Number,
  "photo_updated_at": Date,
  "user_id": String,
  "last_worn": Date,
  "tags": [String]
});

var usersSchema = new mongoose.Schema({
  "provider": String,
  "uid": String,
  "name": String,
  "email": String,
  "username": String,
  "password": String,
  "location": String,
  "image_url": String,
  "created_at": Date,
  "updated_at": Date,
  "first_name": String,
  "last_name": String,
  "age_range": String,
  "gender": String,
  "outfits": [outfitSchema]
});

var model = mongoose.model("User", usersSchema);

module.exports = model;
