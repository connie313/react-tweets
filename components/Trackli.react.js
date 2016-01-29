/** @jsx React.DOM */

var React = require('react');

module.exports = Trackli = React.createClass({
  render: function(){
    var track = this.props.track;
    return (
      <tr className="track">
        <td>{track.customer}</td>
        <td id="trackId">{track.tracks}</td>
        <td id="collectTweets" >Collect tweets</td>
        <td id="sentimentCalculate">Calculate Sentiment</td>
      </tr>
    )
  }
});