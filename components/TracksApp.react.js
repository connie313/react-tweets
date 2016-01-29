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
      <div className="tracks-app container-fluid" id="wrapper">
        <div className="row">
          <div className="col-md-12" id="trackList">
            <h3>
              Search/filter
            </h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>
                    Customer
                  </th>
                  <th>
                    Track
                  </th>
                  <th>
                    Operation1
                  </th>
                  <th>
                    Operation2
                  </th>
                </tr>
              </thead>
              <tbody className="tracks">
                {content}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" >
            <h3>
              Add Track Keyword
            </h3>
            <div id="addTracks">
            <fieldset>
              <div className="form-group">
                <label for="inputCustomer">
                  Customer
                </label>
                <input type="text" className="form-control" id="inputCustomer" />
              </div>
              <div className="form-group">
                <label for="inputTracks">
                  Track
                </label>
                <input type="text" className="form-control" id="inputTracks" />
              </div>
              <button className="btn btn-default" id="btnAddTracks">
                Add tracks
              </button>
              <button className="btn btn-default" id="btnCalcuTracks">
                Calculate tracks
              </button>
            </fieldset>
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-md-12" id="twitterStream">
            <h3>
              Stream API
            </h3>
            <fieldset>
              <div className="form-group">
                <label for="inputTracks">
                  Track
                </label>
                <input type="text" className="form-control" id="inputOneTrack"  placeholder="Track"/>
              </div>
              <div className="form-group">
                <label for="inputTracklist">
                  Tracklist
                </label>
                <input type="text" className="form-control" id="inputTracklist" placeholder="Tracklist" />
              </div>
              <div className="form-group">
                <label for="InputLocation">
                  Location
                </label>
                <input type="text" className="form-control" id="InputLocation" placeholder="location" />
              </div>
              <button id="btnOneTracks" className="btn btn-default">
                Stream API
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    )

  }

});