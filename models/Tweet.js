var mongoose = require('mongoose');

// Create a new schema for our tweet data
var schema = new mongoose.Schema({
    twid       : String
  , active     : Boolean
  , author     : String
  , avatar     : String
  , coordinates: String
  , place      : String
  , body       : String
  , date       : Date
  , screenname : String
  , score      : String
  , track      : String
  , location   : String
});

// Create a static getTweets method to return tweet data from the db
schema.statics.getTweets = function(page, skip, callback) {

  var tweets = [];

  // Query the db, using skip and limit to achieve page chunks
  Tweet.find({},'twid active author avatar coordinates place body date screenname score track location').sort({date: 'desc'}).exec(function(err,docs){

    // If everything is cool...
    if(!err) {
      tweets = docs;  // We got tweets
      tweets.forEach(function(tweet){
        tweet.active = true; // Set them to active
      });
    }

    // Pass them back to the specified callback
    callback(tweets);

  });

};
// Create a static getCount method to return tweet data from the db
schema.statics.getCount = function(page, skip, callback) {

  var tweets = [];

  // Query the db, using skip and limit to achieve page chunks
  Tweet.find({},'twid ').sort({date: 'desc'}).exec(function(err,docs){

    // If everything is cool...
    if(!err) {
      tweets = docs;  // We got tweets
      tweets.forEach(function(tweet){
        tweet.active = true; // Set them to active
      });
    }

    // Pass them back to the specified callback
    callback(tweets);

  });

};

// Return a Tweet model based upon the defined schema
module.exports = Tweet = mongoose.model('Tweet', schema);