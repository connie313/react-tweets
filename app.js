/** @jsx React.DOM */

var React = require('react');
var TweetsApp = require('./components/TweetsApp.react');
var TracksApp = require('./components/TracksApp.react');
// Snag the initial state that was passed from the server side
var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);
var initialStateTrack = JSON.parse(document.getElementById('initial-state-track').innerHTML);

// Render the components, picking up where react left off on the server
React.renderComponent(
  <TweetsApp tweets={initialState}/>,
  <TracksApp tracks={initialStateTrack}>,
  document.getElementById('react-app')
);
