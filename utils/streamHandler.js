var Tweet = require('../models/Tweet');
var sentimental = require('Sentimental'); 
module.exports = function(stream, io, tracklist, location){

  // When tweets get sent our way ...
  stream.on('data', function(data) {
    var tweet_score=performCalculation(data);
    
    if (data['user'] !== undefined) {
      console.log("data"+JSON.stringify(data));

      // Construct a new tweet object make difference between location-given and location-missed
      var location_tweet = {};
      if(data['place']){
        location_tweet = {
          'coordinates': data['place']['bounding_box']['coordinates'][0],
          'place'      : data['place']['full_name']
        }
      }else{
        location_tweet = {
          'coordinates': null,
          'place'      : null
        }
      }
      
      var tweet = {
        twid: data['id_str'],
        active: false,
        author: data['user']['name'],
        avatar: data['user']['profile_image_url'],
        coordinates: location_tweet.coordinates ,
        place: location_tweet.place,
        body: data['text'],
        date: data['created_at'],
        screenname: data['user']['screen_name'],
        score: tweet_score,
        track: tracklist,
        location: location
      };

      // Create a new model instance with our object
      var tweetEntry = new Tweet(tweet);
      console.log("new tweets come");
      // Save 'er to the database
      tweetEntry.save(function(err) {
        if (!err) {
          // If everything is cool, socket.io emits the tweet.
          io.emit('tweet', tweet);
          redirect('/dashboard');
        }
      });

    }

  });

  // perform calculation
  function performCalculation(tweetSet){
    //set a results variable
    var results = 0;
    // iterate through the tweets, pulling the text, retweet count, and favorite count
    tweet = tweetSet['text'];
    console.log("tweetify:"+tweet);
    if(tweet == undefined){
      return 0;
    }
    retweets = tweetSet['retweet_count'];
    favorites = tweetSet['favorite_count'];
    // remove the hashtag from the tweet text
    // tweetify = JSON.stringify(tweet);
    // console.log("tweetify:"+tweet);
    // if(tweet){
    tweet = tweet.replace('#', '');
    //   console.log("replace already");
    // }
    // perfrom sentiment on the text
    var score = sentimental.analyze(tweet)['score'];
    
    // calculate score
    console.log("score:"+score);
    results = score;
    if(score > 0){
      if(retweets > 0) {
        results += (Math.log(retweets)/Math.log(2));
      }
      if(favorites > 0) {
        results += (Math.log(favorites)/Math.log(2));
      }
    }
    else if(score < 0){
      if(retweets > 0) {
        results -= (Math.log(retweets)/Math.log(2));
      }
      if(favorites > 0) {
        results -= (Math.log(favorites)/Math.log(2));
      }
    }
    else {
      results += 0;
    }
    console.log("results:"+results);
    return results
  };

};
