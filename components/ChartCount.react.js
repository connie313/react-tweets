/** @jsx React.DOM */

var React = require('react');


module.exports = Chart = React.createClass({
  render: function(){
  	var count = this.props.count;
    return (
    	<div>
    		<h1><a href="#top">{count}</a></h1>
        	<iframe className="react-chart" src='/tracks/tweetlist'></iframe>
		</div>
	    )
    }
});