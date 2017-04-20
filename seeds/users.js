'use strict';
var User = require('./../models/user.js');

var users = [
  { provider: "Facebook",
    uid: 1235,
    name: "Nina Mutty",
    email: "nina@me.com",
    username: "nmutty",
    password: "password",
    location: "Seattle",
    image_url: "http://placecage/300/200",
    created_at: "1490568639543",
    updated_at: "1490568639543",
    first_name: "Nina",
    last_name: "Mutty",
    age_range: "20-30",
    gender: "female",
    outfits: [
      {
        name: "Jeans and Tshirt",
        category: "casual",
        reworn_count: 2,
        favorite: true,
        created_at: "1490568639543",
        updated_at: "1490568639543",
        photo_file_name: "",
        photo_content_type: "",
        photo_file_size: 0,
        photo_updated_at: "1490568639543",
        user_id: "uid",
        last_worn: "1490568639543",
        tags: [
          "sneakers",
          "jeans",
          "tshirt",
          "comfy"
        ]
      },
      {
        name: "Bear Dress and Booties",
        category: "business",
        reworn_count: 3,
        favorite: true,
        created_at: "1490568639543",
        updated_at: "1490568639543",
        photo_file_name: "",
        photo_content_type: "",
        photo_file_size: 0,
        photo_updated_at: "1490568639543",
        user_id: "uid",
        last_worn: "1490568639543",
        tags: [
          "dress",
          "booties",
          "fun"
        ]
      },
      {
        name: "Cavempt and Booties",
        category: "casual",
        reworn_count: 0,
        favorite: false,
        created_at: "1490568639543",
        updated_at: "1490568639543",
        photo_file_name: "",
        photo_content_type: "",
        photo_file_size: 0,
        photo_updated_at: "1490568639543",
        user_id: "uid",
        last_worn: "1490568639543",
        tags: [
          "booties",
          "jeans",
          "tshirt",
          "comfy"
        ]
      }
    ]
  }
]



users.forEach(function(user, index) {
  // find by name will need to change to user and name when users are included
  User.find({'email': user.uid}, function(err, users) {
    if (!err && !users.length) {
      var newUser = new User({
        provider: user.provider,
        uid: user.uid,
        name: user.name,
        email: user.email,
        username: user.username,
        password: user.password,
        location: user.location,
        image_url: user.image_url,
        created_at: user.created_at,
        updated_at: user.updated_at,
        first_name: user.first_name,
        last_name: user.last_name,
        age_range: user.age_range,
        gender: user.gender,
        outfits: []
      });
      user.outfits.forEach(function(outfit, index) {
        newUser.outfits.push({
          name: outfit.name,
          category: outfit.category,
          reworn_count: outfit.reworn_count,
          favorite: outfit.favorite,
          created_at: outfit.created_at,
          updated_at: outfit.updated_at,
          photo_file_name: outfit.photo_file_name,
          photo_content_type: outfit.photo_content_type,
          photo_file_size: outfit.photo_file_size,
          photo_updated_at: outfit.photo_updated_at,
          user_id: outfit.user_id,
          last_worn: outfit.last_worn,
          tags: outfit.tags,
        }); //end newUser.subscriptions
      }); // end users.subscriptions

      newUser.save()
    }; // end if
  }); //end User.find
}); //end users.forEach




// [
//   { "provider": "Facebook",
//     "uid": 1235,
//     "name": "Nina Mutty",
//     "email": "nina@me.com",
//     "username": "nmutty",
//     "password": "password",
//     "location": "Seattle",
//     "image_url": "http://placecage/300/200",
//     "created_at": "1490568639543",
//     "updated_at": "1490568639543",
//     "first_name": "Nina",
//     "last_name": "Mutty",
//     "age_range": "20-30",
//     "gender": "female",
//     "outfits": [
//       {
//         "name": "Jeans and Tshirt",
//         "category": "casual",
//         "reworn_count": 2,
//         "favorite": true,
//         "created_at": "1490568639543",
//         "updated_at": "1490568639543",
//         "photo_file_name": "",
//         "photo_content_type": "",
//         "photo_file_size": 0,
//         "photo_updated_at": "1490568639543",
//         "user_id": "uid",
//         "last_worn": "1490568639543",
//         "tags": [
//           "sneakers",
//           "jeans",
//           "tshirt",
//           "comfy"
//         ]
//       },
//       {
//         "name": "Bear Dress and Booties",
//         "category": "business",
//         "reworn_count": 3,
//         "favorite": true,
//         "created_at": "1490568639543",
//         "updated_at": "1490568639543",
//         "photo_file_name": "",
//         "photo_content_type": "",
//         "photo_file_size": 0,
//         "photo_updated_at": "1490568639543",
//         "user_id": "uid",
//         "last_worn": "1490568639543",
//         "tags": [
//           "dress",
//           "booties",
//           "fun"
//         ]
//       },
//       {
//         "name": "Cavempt and Booties",
//         "category": "casual",
//         "reworn_count": 0,
//         "favorite": false,
//         "created_at": "1490568639543",
//         "updated_at": "1490568639543",
//         "photo_file_name": "",
//         "photo_content_type": "",
//         "photo_file_size": 0,
//         "photo_updated_at": "1490568639543",
//         "user_id": "uid",
//         "last_worn": "1490568639543",
//         "tags": [
//           "booties",
//           "jeans",
//           "tshirt",
//           "comfy"
//         ]
//       }
//     ]
//   }
// ]
//
