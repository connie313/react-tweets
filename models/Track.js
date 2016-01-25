var mongoose = require('mongoose');


// Create a new schema for our tweet data
var schema = new mongoose.Schema({
    customer     : String
  , tracks     : String
});

// Create a static getTweets method to return tweet data from the db
schema.statics.getTracks = function( callback) {

  var tracks = [];

  // Query the db, using skip and limit to achieve page chunks
  Track.find({},'customer tracks').exec(function(err,docs){

    // If everything is cool...
    if(!err) {
      tracks = docs;  // We got tweets
    }

    // Pass them back to the specified callback
    callback(tracks);

  });

};


// Return a Tweet model based upon the defined schema
module.exports = Track = mongoose.model('Track', schema);