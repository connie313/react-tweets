var React = require('react');


module.exports = Chart = React.createClass({
	
	

 render: function(){

	var dataset = [ 30 , 10 , 43 , 55 , 13 ];
    return (
    	<div className="chart">
    		<div id="pie"></div>
    		<div className="timeseries"></div>
    		<div id="dot"></div>
		</div>
	    )
    }
});