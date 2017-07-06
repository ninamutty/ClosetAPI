'use strict';
var express = require('express');
var User = require('../user.js');
var outfitRouter = express.Router();
const mongoose = require('mongoose');

////////////////////////////////////
/// 'user/:user_id/subcriptions' ///
////////////////////////////////////

//Get all outfits for a user
outfitRouter.get('/users/:id/outfits', function(req, res) {
  var id =  req.params.id;
  // console.log(user_id);

  User.findOne({"_id": id}, function(err, user) {
    if (err) {
      return res.status(500).json({"status": 500, "message": err.message}); // 500 = internal server error
    }
    var outfits = user.outfits;
    res.status(200).json({"status": 200, "outfits": outfits});
  });
});


//Get one subscription for a user
outfitRouter.get('/users/:user_id/outfits/:id', function(req, res) {
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








// todo: Be able to creat new, edit, delete subscriptions that correspond to a user

// //Create new subscription for a user
// outfitRouter.post('/users/:id/subscriptions', function(req, res) {
//   var id = req.params.id
//   var subscription = req.body;
//
//   User.findOne({"_id": id}, function(err, user) {
//     if (err) {
//       return res.status(500).json({message: err.message}); // 500 = internal server error
//     }
//     user.subscriptions.push(subscription);
//
//     var createdSubscription = user.subscriptions[user.subscriptions.length - 1]
//     user.save(function (err) {
//       if (err) {
//         return res.status(500).json({message: err.message}); // 500 = internal server error
//       }
//       res.status(200).json({subscription: createdSubscription, "message": 'Subscription Created'});
//     });
//   });
// });
//
//
//
// // Update a Subscription for a user
// outfitRouter.put('/users/:user_id/subscriptions/:id', function(req, res) {
//   var id = req.params.id
//   var user_id = req.params.user_id
//   var subscription = req.body;
//
//   User.findOne({"_id": user_id}, function(err, user) {
//     if (err) {
//       return res.status(500).json({message: err.message}); // 500 = internal server error
//     }
//
//     if (user.subscriptions.id(id)) {
//       var update = user.subscriptions.id(id);
//       update.name = subscription.name;
//       update.cost = subscription.cost;
//       update.nextBillingDate = subscription.nextBillingDate;
//       update.notificationDate = subscription.notificationDate;
//       update.firstBillDate = subscription.firstBillDate;
//       update.billingCycle = subscription.billingCycle;
//       update.daysBeforeBilling = subscription.daysBeforeBilling;
//       update.category = subscription.category;
//       update.userRating = subscription.userRating;
//     } else {
//       return res.status(404).json({message: err.message});
//     }
//
//     user.save(function (err) {
//       if (err) {
//         return res.status(500).json({message: err.message}); // 500 = internal server error
//       }
//       res.status(200).json({subscription: update, "message": 'Subscription Updated'});
//     });
//
//   });
//
// }); //end put
//
//
// //Delete a Subscription
// outfitRouter.delete('/users/:user_id/subscriptions/:id', function(req, res) {
//   var id = req.params.id
//   var user_id = req.params.user_id
//
//   //ADD IN VALIDATIONS
//   User.findOne({"_id": user_id}, function(err, user) {
//     if (err) {
//       return res.status(500).json({message: err.message}); // 500 = internal server error
//     }
//
//     if (user.subscriptions.id(id)) {
//       var doc = user.subscriptions.id(id).remove();
//     } else {
//       return res.status(404).json({message: err.message});
//     }
//     user.save(function(err) {
//       if (err) {
//         return res.status(500).json({message: err.message}); // 500 = internal server error
//       }
//       res.status(200).json({"message": "Subscription Deleted"});
//     })
//   });
// });



module.exports = outfitRouter;
