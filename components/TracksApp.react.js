/** @jsx React.DOM */

var React = require('react');
var Trackli = require('./Trackli.react.js');

// Export the TweetsApp component
module.exports = TracksApp = React.createClass({

   // Set the initial component state
  // Render the component
  render: function(){
     // Build list items of single track components using map
    var content = this.props.tracks.map(function(track){
      return (
        <Trackli key={track._id} track={track} />
      )
    });

    return (
      <div className="tracks-app">
        <div id="wrapper">
        <h2>Track List</h2>
        <div id="trackList">
        <table>
        <thead>
          <tr><th>Customer</th><th>Tracks</th><th>Delete</th></tr>
        </thead>
        <tbody>
          <ul className="tracks">{content}</ul>
        </tbody>
        </table>
        </div>
        <h2>Add Track Keywords</h2>
        <div id="addTracks">
          <fieldset>
            <input id="inputCustomer" type="text" placeholder="Customer"></input>
            <input id="inputTracks" type="text" placeholder="Tracks"></input>
            <button id="btnAddTracks">Add tracks</button>  
            <button id="btnCalcuTracks">Calculate tracks</button>  
          </fieldset>
        </div>
        </div>
      </div>
    )

  }

});