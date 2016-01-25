// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    // Add User button click
    console.log("enter");
   var tweet_tmp=$("#initial-state").html();
   var tweets = JSON.parse(tweet_tmp);
   populateChart(tweets);// pie
   populateTimeseries(tweets);//timeseries
});
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