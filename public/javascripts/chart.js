// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    // Add User button click
   var tweet_tmp=$("#initial-state").html();

   $('#dash').on('click', dashboard);
   $('#showt').on('click', showtweets);
   
   var tweets = JSON.parse(tweet_tmp);
   populateChart(tweets);// pie
   populateTimeseries(tweets);//timeseries
   populateTimeOfDay(tweets);//time of day
});
function dashboard(){

};
function populateChart(tweets){
	var width = 400;
	var height = 400;
	var dataset = [ 30 , 10 , 43 , 55 , 13 ];

	var svg = d3.select("#pie")
				.append("svg")
				.attr("width", width)
				.attr("height", height);

	var pie = d3.layout.pie();

	var piedata = pie(dataset);

	var outerRadius = 150;	//外半径
	var innerRadius = 0;	//内半径，为0则中间没有空白

	var arc = d3.svg.arc()	//弧生成器
				.innerRadius(innerRadius)	//设置内半径
				.outerRadius(outerRadius);	//设置外半径

	var color = d3.scale.category10();

	var arcs = svg.selectAll("g")
				  .data(piedata)
				  .enter()
				  .append("g")
				  .attr("transform","translate("+ (width/2) +","+ (width/2) +")");
				  
	arcs.append("path")
		.attr("fill",function(d,i){
			return color(i);
		})
		.attr("d",function(d){
			return arc(d);
		});

	arcs.append("text")
		.attr("transform",function(d){
			return "translate(" + arc.centroid(d) + ")";
		})
		.attr("text-anchor","middle")
		.text(function(d){
			return d.data;
		});

	console.log(dataset);
	console.log(piedata);
};
function populateTimeseries(tweets){
	var width = 400;
	var height = 400;
	var dataset = [];
	console.log("second:"+tweets);
	for(var i=0;i<tweets.length;i++){
		dataset.push({'value':Date.parse(tweets[i].date)});
	}
	var domEl = 'timeseries';
    var brushEnabled = false;
    console.log(dataset);
    timeseries(domEl, dataset, brushEnabled);
};
function populateTimeOfDay(tweets){
	var parseTime = d3.time.format.utc("%H:%M").parse,
    midnight = parseTime("00:00");

	var margin = {top: 30, right: 30, bottom: 30, left: 30},
	    width = 960 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

	var x = d3.time.scale.utc()
	    .domain([midnight, d3.time.day.utc.offset(midnight, 1)])
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var svg = d3.select("body").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.csv("tweets.csv", type, function(error, data) {
	  if (error) throw error;

	  y.domain([0, d3.max(data, function(d) { return d.rate; })]);

	  svg.append("g")
	      .attr("class", "axis axis--x")
	      .attr("transform", "translate(0," + height + ")")
	      .call(d3.svg.axis()
	          .scale(x)
	          .orient("bottom")
	          .tickFormat(d3.time.format.utc("%I %p")));

	  svg.append("g")
	      .attr("class", "dots")
	    .selectAll("path")
	      .data(data)
	    .enter().append("path")
	      .attr("transform", function(d) { return "translate(" + x(d.time) + "," + y(d.rate) + ")"; })
	      .attr("d", d3.svg.symbol()
	          .size(40));

	  var tick = svg.append("g")
	      .attr("class", "axis axis--y")
	      .call(d3.svg.axis()
	          .scale(y)
	          .tickSize(-width)
	          .orient("left"))
	    .select(".tick:last-of-type");

	  var title = tick.append("text")
	      .attr("dy", ".32em")
	      .text("tweets per hour");

	  tick.select("line")
	      .attr("x1", title.node().getBBox().width + 6);
	});

	function type(d) {
	  d.rate = +d.count / 327 * 60; // January 8 to November 30
	  d.time = parseTime(d.time);
	  d.time.setUTCHours((d.time.getUTCHours() + 24 - 7) % 24);
	  return d;
	}
};
