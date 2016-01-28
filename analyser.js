var express = require('express');
var app = express();
var router = express.Router();

var twit = require('twit');
var sentimental = require('Sentimental'); 
var config = require('./config');
router.get('/index', function(req, res) {
   res.send("pong!", 200);
});


router.post('/search', function(req, res) {
  // grab the request from the client
  var choices = ["hello","hi"];
  // grab the current date
  var today = new Date();
  // establish the twitter config (grab your keys at dev.twitter.com)
  // Create a new ntwitter instance
 var twitter = new twit({
    consumer_key: "maVo5lZEF0Lsz1851SjBOaDQP",
    consumer_secret: "kUFCrZsod1XmtzgdPLkDLCzCRFBB0K9JfWnEQlmoNVJHbhkf7R",
    access_token: "496341027-YNRbA3it78RrNKUq6A4zmKx6R7OTCt1qNgxTpkt9",
    access_token_secret: "0kl1R8F5Y0bejPcDYq7baFheDlKz3bR9iHe73QO349Nb6"
  });
  // set highest score
  var highestScore = -Infinity;
  // set highest choice
  var highestChoice = null;
  // create new array
  var array = [];
  // set score
  var score = 0;
  console.log("----------")

  // iterate through the choices array from the request
  for(var i = 0; i < choices.length; i++) {
    (function(i) {
    // add choice to new array
    array.push(choices[i])
    // grad 20 tweets from today
    twitter.get('search/tweets', {q: '' + choices[i] + ' since:' + today.getFullYear() + '-' + 
      (today.getMonth() + 1) + '-' + today.getDate(), count:20}, function(err, data) {
        // perfrom sentiment analysis (see below)
        console.log("what is it:"+data['statuses']);
        score = performAnalysis(data['statuses']);
        console.log("score:", score)
        console.log("choice:", choices[i])
        //  determine winner
        if(score > highestScore) {
          highestScore = score;
          highestChoice = choices[i];
          console.log("winner:",choices[i])
        }
        console.log("")
      });
    })(i)
  }
  // send response back to the server side; why the need for the timeout?
  setTimeout(function() { res.end(JSON.stringify({'score': highestScore, 'choice': highestChoice})) }, 5000);	
});

function performAnalysis(tweetSet) {
  //set a results variable
  var results = 0;
  // iterate through the tweets, pulling the text, retweet count, and favorite count
  for(var i = 0; i < tweetSet.length; i++) {
    tweet = tweetSet[i]['text'];
    retweets = tweetSet[i]['retweet_count'];
    favorites = tweetSet[i]['favorite_count'];
    console.log("analysis1:"+tweet);
    console.log("analysis2:"+retweets);
    console.log("analysis3:"+retweets);
    // remove the hashtag from the tweet text
    // tweet = tweet.replace('#', '');
    // perfrom sentiment on the text
    var score = sentimental.analyze(tweet)['score'];
    console.log("analysis:"+score);
    // calculate score
    results += score;
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
  }
  // return score
  results = results / tweetSet.length;
  return results
};
module.exports = router;
