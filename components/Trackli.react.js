/** @jsx React.DOM */

var React = require('react');

module.exports = Trackli= React.createClass({
  render: function(){
    var track = this.props.track;
    return (
      <li className="track">
        <a >{track.customer}</a>
        <a id="trackId">{track.tracks}</a>
        <button id="collectTweets" >Collect tweets</button>
      </li>
    )
  }
});