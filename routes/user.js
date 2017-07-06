'use strict';
var express = require('express');
var User = require('../user.js');

var outfitRouter = require('./outfit.js');
var outfitCollectionRouter = require('./outfitCollections.js');

var router = express.Router();
const mongoose = require('mongoose');


////////////////
/// '/users' ///
////////////////

//Get all users
router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).json({"status": 500, "error": err.message}); // 500 = internal server error
    }
    res.status(200).json({"status": 200, "users": users});
  });
});

//Get one user
router.get('/users/:id', function(req, res) {
  var id = req.params.id

  User.findOne({"_id": id}, function(err, user) {
    if (err) {
      return res.status(500).json({"status": 500, "error": err.message}); // 500 = internal server error
    }
    res.status(200).json({"status": 200, "user": user});
  });
});


//Create new user
router.post('/users', function(req, res) {
  var user = req.body;
  User.create(user, function(err, user) {
    if (err) {
      return res.status(500).json({"status": 500, "error": err.message});
    }
    res.status(200).json({"status": 200, 'user': user, "message": 'User Created'});
  });
});

//Delete a user
router.delete('/users/:id', function(req, res) {
  var id = req.params.id

  User.findOneAndRemove({"_id": id}, function(err, user) {
    if (err) {
      return res.status(500).json({"status": 500, message: err.message}); // 500 = internal server error
    }
    res.status(200).json({"status": 200, "message": "User Deleted"});
  });
});


//////////////////////////////////////////////////
/// 'user/:user_id/outfits' - Multiple Outfits ///
//////////////////////////////////////////////////

//Get all outfits for a user
router.get('/users/:id/outfits', function(req, res) {
  var id =  req.params.id;

  User.findOne({"_id": id}, function(err, user) {
    if (err) {
      return res.status(500).json({"status": 500, "message": err.message}); // 500 = internal server error
    }
    var outfits = user.outfits;
    return res.status(200).json({"status": 200, "outfits": outfits});
  });
});


///// Inclusive Outfit List
router.get('/users/:id/outfits/inclusive', function(req, res) {
  var id =  req.params.id;
  var categories = req.query.categories != undefined ? req.query.categories.split("+") : [];
  var tags = req.query.tags != undefined ? req.query.tags.split("+") : [];
  var favorite = req.query.favorite != undefined ? req.query.favorite : false;

  User.findOne({"_id": id}, function(err, user) {
    if (err) {
      return res.status(500).json({"status": 500, "message": err.message}); // 500 = internal server error
    }

    if (categories.length <= 0 && tags.length <= 0 && favorite == false) {
      var outfits = user.outfits;
      return res.status(200).json({"status": 200, "outfits": outfits});
    }

    var filteredOutfits = new Set();
    var allOutfits = user.outfits;

    if (categories.length > 0) {
      for (var outfit in allOutfits) {
        for (var category in categories) {
          if (allOutfits[outfit].category == undefined) continue;
          if (allOutfits[outfit].category == categories[category]) {
            filteredOutfits.add(allOutfits[outfit]);
          }
        }
      }
    }

    if (tags.length > 0) {
      for (var outfit in allOutfits) {
        for (var tag in tags) {
          var outfitTags = allOutfits[outfit].tags;
          if (outfitTags == undefined) continue;

          if (outfitTags.includes(tags[tag])) {
            filteredOutfits.add(allOutfits[outfit]);
          }
        }
      }
    }

    if (favorite == true) {
      for (var outfitIndex in allOutfits) {
        if (allOutfits[outfitIndex].favorite == true) {
          filteredOutfits.add(allOutfits[outfitIndex]);
        }
      }
    }


    return res.status(200).json({"status": 200, "favorite": favorite,"categories": categories, "tags": tags, "outfits": Array.from(filteredOutfits)});
  });
});


///// Exclusive Outfit List
router.get('/users/:id/outfits/strict', function(req, res) {
  var id =  req.params.id;
  var categories = req.query.categories != undefined ? req.query.categories.split("+") : [];
  var tags = req.query.tags != undefined ? req.query.tags.split("+") : [];
  var favorite = req.query.favorite != undefined ? req.query.favorite : false;
  if (favorite == "true") favorite = true;
  if (favorite == "false") favorite = false;

  User.findOne({"_id": id}, function(err, user) {
    if (err) {
      return res.status(500).json({"status": 500, "message": err.message}); // 500 = internal server error
    }
    if (categories.length <= 0 && tags.length <= 0 && favorite == false) {
      var outfits = user.outfits;
      return res.status(200).json({"status": 200, "outfits": outfits});
    }
    var filteredOutfits = new Set();
    var allOutfits = user.outfits;

    if (categories.length > 0 && tags.length > 0 && favorite == true) {
      for (var outfitIndex in allOutfits) {
        var outfitTags = allOutfits[outfitIndex].tags;
        var outfit = allOutfits[outfitIndex];
        if (outfit.category == undefined || outfitTags == undefined) continue;
        for (var tagIndex in tags) {
          for (var categoryIndex in categories) {
            var category = categories[categoryIndex];
            var tag = tags[tagIndex];
            if (outfit.category == category && outfit.favorite == true && outfitTags.includes(tag)) {
              filteredOutfits.add(outfit);
            }
          }
        }
      }
      return res.status(200).json({"status": 200, "favorite": favorite,"categories": categories, "tags": tags, "outfits": Array.from(filteredOutfits)});
    }

    if (categories.length > 0 && tags.length > 0 && favorite == false) {
      for (var outfitIndex in allOutfits) {
        var outfitTags = allOutfits[outfitIndex].tags;
        var outfit = allOutfits[outfitIndex];
        if (outfit.category == undefined || outfitTags == undefined) continue;
        for (var tagIndex in tags) {
          for (var categoryIndex in categories) {
            var category = categories[categoryIndex];
            var tag = tags[tagIndex];
            if (outfit.category == category && outfitTags.includes(tag)) {
              filteredOutfits.add(outfit);
            }
          }
        }
      }
      return res.status(200).json({"status": 200, "favorite": favorite,"categories": categories, "tags": tags, "outfits": Array.from(filteredOutfits)});
    }

    if (categories.length > 0 && favorite == true) {
      for (var outfitIndex in allOutfits) {
        var outfit = allOutfits[outfitIndex];
        if (outfit.category == undefined) continue;
        for (var categoryIndex in categories) {
          var category = categories[categoryIndex];
          if (outfit.category == category && outfit.favorite == true) {
            filteredOutfits.add(outfit);
          }
        }
      }
      return res.status(200).json({"status": 200, "favorite": favorite,"categories": categories, "tags": tags, "outfits": Array.from(filteredOutfits)});
    }

    if (tags.length > 0 && favorite == true) {
      for (var outfitIndex in allOutfits) {
        var outfit = allOutfits[outfitIndex];
        var outfitTags = outfit.tags;

        if (outfitTags == undefined) continue;
        for (var tagIndex in tags) {
          var tag = tags[tagIndex];
          if (outfitTags.includes(tag)&& outfit.favorite == true) {
            filteredOutfits.add(outfit);
          }
        }
      }
      return res.status(200).json({"status": 200, "favorite": favorite,"categories": categories, "tags": tags, "outfits": Array.from(filteredOutfits)});
    }

    if (categories.length > 0) {
      for (var outfit in allOutfits) {
        for (var category in categories) {
          if (allOutfits[outfit].category == undefined) continue;
          if (allOutfits[outfit].category == categories[category]) {
            filteredOutfits.add(allOutfits[outfit]);
          }
        }
      }
      return res.status(200).json({"status": 200, "favorite": favorite,"categories": categories, "tags": tags, "outfits": Array.from(filteredOutfits)});
    }

    if (tags.length > 0) {
      for (var outfitIndex in allOutfits) {
        for (var tagIndex in tags) {
          var outfitTags = allOutfits[outfitIndex].tags;
          if (outfitTags == undefined) continue;

          if (outfitTags.includes(tags[tagIndex])) {
            filteredOutfits.add(allOutfits[outfitIndex]);
          }
        }
      }
      return res.status(200).json({"status": 200, "favorite": favorite,"categories": categories, "tags": tags, "outfits": Array.from(filteredOutfits)});
    }

    if (favorite == true) {
      for (var outfitIndex in allOutfits) {
        if (allOutfits[outfitIndex].favorite == true) {
          filteredOutfits.add(allOutfits[outfitIndex]);
        }
      }
      return res.status(200).json({"status": 200, "favorite": favorite,"categories": categories, "tags": tags, "outfits": Array.from(filteredOutfits)});
    }


    return res.status(200).json({"status": 200, "favorite": favorite,"categories": categories, "tags": tags, "outfits": Array.from(filteredOutfits)});
  });
});






//Favorite outfits
// router.get('/users/:id/outfits/favorites', function(req, res) {
//   var id =  req.params.id;
//
//   User.findOne({"_id": id}, function(err, user) {
//     if (err) {
//       return res.status(500).json({"status": 500, "message": err.message}); // 500 = internal server error
//     }
//     var outfits = [];
//     var allOutfits = user.outfits;
//     for (var outfit in allOutfits) {
//       if (allOutfits[outfit].favorite == true) {
//         outfits.push(allOutfits[outfit]);
//       }
//     }
//     res.status(200).json({"status": 200, "favorites": true, "outfits": outfits});
//   });
// });





///////////////////////////////////////////////
/// 'user/:user_id/outfits' - Single Outfit ///
///////////////////////////////////////////////

//Get one outfit for a user
router.get('/users/:user_id/outfits/:id', function(req, res) {
  var outfit_id = req.params.id
  var user_id =  req.params.user_id;

  User.findOne({"_id": user_id}, function(err, user) {
    if (err) {
      return res.status(500).json({"status": 500, "message": err.message}); // 500 = internal server error
    }
    var outfit = user.outfits.id(outfit_id);
    res.status(200).json({"status": 200, "outfit": outfit});
  });
});

//Create new outfit for a user
router.post('/users/:id/outfits', function(req, res) {
  var id = req.params.id
  var outfit = req.body;

  User.findOne({"_id": id}, function(err, user) {
    if (err) {
      return res.status(500).json({"status": 500, "message": err.message}); // 500 = internal server error
    }
    user.outfits.push(outfit);

    var createdOutfit = user.outfits[user.outfits.length - 1]
    user.save(function (err) {
      if (err) {
        return res.status(500).json({"status": 500, "message": err.message}); // 500 = internal server error
      }
      res.status(200).json({"status": 200, "outfit": createdOutfit, "message": 'Outfit Created'});
    });
  });
});

// Update an outfit for a user
router.put('/users/:user_id/outfits/:id', function(req, res) {
  var id = req.params.id
  var user_id = req.params.user_id
  var outfit = req.body;

  User.findOne({"_id": user_id}, function(err, user) {
    if (err) {
      return res.status(500).json({"status": 500, "message": err.message}); // 500 = internal server error
    }

    if (user.outfits.id(id)) {
      var update = user.outfits.id(id);
      update.name = outfit.name;
      update.category = outfit.category;
      update.reworn_count = outfit.reworn_count;
      update.favorite = outfit.favorite;
      update.created_at = outfit.created_at;
      update.updated_at = outfit.updated_at;
      update.photo_file_name = outfit.photo_file_name;
      update.photo_content_type = outfit.photo_content_type;
      update.photo_file_size = outfit.photo_file_size;
      update.photo_updated_at = outfit.photo_updated_at;
      update.user_id = outfit.user_id;
      update.last_worn = outfit.last_worn;
      update.tags = outfit.tags;
    } else {
      return res.status(404).json({"status": 404, "message": err.message});
    }

    user.save(function (err) {
      if (err) {
        return res.status(500).json({"status": 500, "message": err.message}); // 500 = internal server error
      }
      res.status(200).json({"status": 200, "outfit": update, "message": 'Subscription Updated'});
    });
  });
}); //end put


//Delete an outfit
router.delete('/users/:user_id/outfits/:id', function(req, res) {
  var id = req.params.id
  var user_id = req.params.user_id

  //ADD IN VALIDATIONS
  User.findOne({"_id": user_id}, function(err, user) {
    if (err) {
      return res.status(500).json({"status": 500, "message": err.message}); // 500 = internal server error
    }

    if (user.outfits.id(id)) {
      var doc = user.outfits.id(id).remove();
    } else {
      return res.status(404).json({"status": 404, "message": err.message});
    }
    user.save(function(err) {
      if (err) {
        return res.status(500).json({"status": 500, "message": err.message}); // 500 = internal server error
      }
      res.status(200).json({"status": 200, "message": "Subscription Deleted"});
    })
  });
});

module.exports = router;
