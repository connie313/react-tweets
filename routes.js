var JSX = require('node-jsx').install(),
  React = require('react'),
  TweetsApp = React.createFactory(require('./components/TweetsApp.react')),
  Tweet = require('./models/Tweet'),
  Track = require('./models/Track'),
  qs = require('querystring'),
  TracksApp = React.createFactory(require('./components/TracksApp.react')),
  DashboardApp = React.createFactory(require('./components/DashboardApp.react'));
  
module.exports = {
  index: function(req, res) {
    // Call static model method to get tweets in the db
    Tweet.getTweets(0,0, function(tweets, pages) {
      // Render React to a string, passing in our fetched tweets
      var markup = React.renderToString(
        TweetsApp({
          tweets: tweets
        })
      );

      // Render our 'home' template
      res.render('home', {
        markup: markup, // Pass rendered react markup
        state: JSON.stringify(tweets) // Pass current state to client side
      });

    });
  },
  dashboard: function(req, res) {
    // Call static model method to get tweets in the db
    Tweet.getTweets(0,0, function(tweets, pages) {
      // Render React to a string, passing in our fetched tweets
      var markup = React.renderToString(
        DashboardApp({
          tweets: tweets
        })
      );
      res.render('dashboard', {
        markup: markup, // Pass rendered react markup
        state: JSON.stringify(tweets) // Pass current state to client side
      });

    });
  },

  page: function(req, res) {
    // Fetch tweets by page via param
    Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {

      // Render as JSON
      res.send(tweets);

    });
  },
  twit: function(req, res) {
    // Call static model method to get tweets in the db
    Track.getTracks(function(tracks, pages) {

      // Render React to a string, passing in our fetched tweets
      var markup = React.renderToString(
        TracksApp({
          tracks: tracks
        })
      );

      // Render our 'home' template
      res.render('twit', {
        markup: markup, // Pass rendered react markup
        state: JSON.stringify(tracks) // Pass current state to client side
      });

    });
  }

}
