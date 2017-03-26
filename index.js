'use strict';
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var fs = require('fs');

let DataBase = process.env.DB_DEV_URL;

AWS.config.update({
  region: "us-west-2",
  endpoint: DataBase
});

var db = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

//Create Table //
var params = {
    TableName : "Users",
    KeySchema: [
        { AttributeName: "uid", KeyType: "HASH"},
        // { AttributeName: "provider", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
        { AttributeName: "uid", AttributeType: "N" },
        // { AttributeName: "provider", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

// db.createTable(params, function(err, data) {
//     if (err) {
//         console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
//     }
// });

//Read Seed Data//
console.log("Importing users into DynamoDB. Please wait.");
var user = JSON.parse(fs.readFileSync('./seeds/users.json', 'utf8'));
user.forEach(function(user) {
    console.log(user.provider);
    console.log(user.uid);
    var params = {
        TableName: "Users",
        Item: {
            "provider": user.provider,
            "uid": user.uid,
            "name": user.name,
            "email": user.email,
            "username": user.username,
            "password": user.password,
            "location": user.location,
            "image_url": user.image_url,
            "created_at": user.created_at,
            "updated_at": user.updated_at,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "age_range": user.age_range,
            "gender": user.gender,
            "outfits": user.outfits
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add user", user.name, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", user.name);
       }
    });
});


///Deleting Table
// var params = {
//     TableName : "Movies"
// };s
//
// db.deleteTable(params, function(err, data) {
//     if (err) {
//         console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
//     }
// });

// console.log("Importing movies into DynamoDB. Please wait.");



app.get('/outfits', function(req, res) {
  res.json({outfits: "This is the first path for an express api for Closet"})
})

app.listen(3000)
