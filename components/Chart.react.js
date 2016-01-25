/** @jsx React.DOM */

var React = require('react');

module.exports = Chart = React.createClass({
  render: function(){
    return (
    	<div className="embed-responsive">
        	<iframe className="react-chart" src="https://plot.ly/~fengjiao/17"></iframe>
       </div>
	    )
    }
});