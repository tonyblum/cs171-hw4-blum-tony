
var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

var width = 1060 - margin.left - margin.right;
var height = 800 - margin.bottom - margin.top;
var centered;

var projection = d3.geo.albersUsa().translate([width / 2, height / 2]);//.precision(.1);
var path = d3.geo.path().projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g");

console.log("hello world");


// http://gis.stackexchange.com/questions/34769/how-can-i-render-latitude-longitude-coordinates-on-a-map-with-d3
var circle = svg.append("circle").attr("r",5).attr("transform", function() {return "translate(" + projection([-75,43]) + ")";});


function loadStations() {
    d3.csv("../data/NSRDB_StationsMeta.csv", function(error,data){
        console.log(data);

	var latitude = 42.35;
	var longitude = 71.06;
	var screencoord = projection([longitude, latitude]);

/*
	g.append("g")
	.attr("id", "states")
    	.selectAll("path")	
	.data(latitude)
	.enter().append("path");
*/
	
    });
}

function loadStats() {

    d3.json("../data/reducedMonthStationHour2003_2004.json", function(error,data){
        completeDataSet= data;

		//....
		
        loadStations();
    })

}

d3.json("../data/us-named.json", function(error, data) {

	var usMap = topojson.feature(data, data.objects.states).features
	console.log(usMap);

      g.append("g")
      .attr("id", "states")
    .selectAll("path")
      .data(usMap)
    .enter().append("path")
      .attr("d", path)
      .on("click", clicked);

	  g.append("path")		
		.datum(usMap)  
	    .attr("id", "state-borders")
	    .attr("d", path);

    loadStations();
});

	function clicked(d) {
	  var x, y, k;

	  if (d && centered !== d) {
		var centroid = path.centroid(d);
		x = centroid[0];
		y = centroid[1];
		k = 4;
		centered = d;
	  } else {
		x = width / 2;
		y = height / 2;
		k = 1;
		centered = null;
	  }
	
	  g.selectAll("path")
		  .classed("active", centered && function(d) { return d === centered; });

	  g.transition()
		  .duration(750)
		  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
		  .style("stroke-width", 1.5 / k + "px");
	}

// ALL THESE FUNCTIONS are just a RECOMMENDATION !!!!
var createDetailVis = function(){

}


var updateDetailVis = function(data, name){
  
}




