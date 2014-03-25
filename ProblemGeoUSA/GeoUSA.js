
var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
};

var width = 1060 - margin.left - margin.right;
var height = 800 - margin.bottom - margin.top;
var centered;

var bbVis = {
    x: 100,
    y: 10,
    w: width - 100,
    h: 300
};

/*
var detailVis = d3.select("#detailVis").append("svg").attr({
    width:350,
    height:200
})


var canvas = d3.select("#vis").append("svg").attr({
    width: width + margin.left + margin.right,
    height: height + margin.top + margin.bottom
    })

var svg = canvas.append("g").attr({
        transform: "translate(" + margin.left + "," + margin.top + ")"
    });
*/

var projection = d3.geo.albersUsa().translate([width / 2, height / 2]);//.precision(.1);
var path = d3.geo.path().projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
/*
svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);
*/

var g = svg.append("g");

console.log("hello world");

function loadStations() {
    d3.csv("../data/NSRDB_StationsMeta.csv",function(error,data){
        //....
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
		//.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
	    .attr("id", "state-borders")
	    .attr("d", path);


	// new code

	//	var usMap = topojson.feature(data, data.objects.states).features
	//	console.log(usMap);

	//	svg.selectAll("path").data(usMap).enter().append("path");
    // see also: http://bl.ocks.org/mbostock/4122298

    loadStats();
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



// ZOOMING
function zoomToBB() {


}

function resetZoom() {
    
}


