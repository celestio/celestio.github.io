var canvas = document.getElementById("map");
var xslider = document.getElementById("xSlider");
var yslider = document.getElementById("ySlider");
var zslider = document.getElementById("zSlider");
var graph = document.getElementById("scale");
var ctx = canvas.getContext("2d");


//please do database shit
var mercury = {colour:[255,255,0,255], tag,:"x", meanDistance:0.38709893, eccentricity:0.20563069, inclination:7.00487, longitudeOfAscending:48.33167, longitudeOfPerigee:77.45645, meanLongitude:252.25084, meanLongitudeCoef:538101628.29};
var venus = {colour:[255,255,0,255], tag,:"x", meanDistance:0.72333199, eccentricity:0.00677323, inclination:3.39471, longitudeOfAscending:76.68069, longitudeOfPerigee:131.53298, meanLongitude:181.97973, meanLongitudeCoef:210664136.06};
var earth = {colour:[255,255,0,255], tag,:"earth", meanDistance:1.00000011, eccentricity:0.01671022, inclination:0.00005, longitudeOfAscending:-11.26064, longitudeOfPerigee:102.94719, meanLongitude:100.46435, meanLongitudeCoef:129597740.63};
var mars = {colour:[255,255,0,255], tag,:"x", meanDistance:1.52366231, eccentricity:0.09341233, inclination:1.85061, longitudeOfAscending:-49.57854, longitudeOfPerigee:336.04084, meanLongitude:355.45332, meanLongitudeCoef:68905103.78};
var jupiter = {colour:[255,255,0,255], tag,:"x", meanDistance:5.20336301, eccentricity:0.04839266, inclination:1.30530, longitudeOfAscending:100.55615, longitudeOfPerigee:14.7538, meanLongitude:34.40438, meanLongitudeCoef:10925078.35};
var saturn = {colour:[255,255,0,255], tag,:"x", meanDistance:9.53707032, eccentricity:0.05415060, inclination:2.48446, longitudeOfAscending:113.71504, longitudeOfPerigee:92.43194, meanLongitude:49.94432, meanLongitudeCoef:4401052.95};
var uranus = {colour:[255,255,0,255], tag,:"x", meanDistance:19.19126393, eccentricity:0.04716771, inclination:0.76986, longitudeOfAscending:74.22988, longitudeOfPerigee:170.96424, meanLongitude:313.23218, meanLongitudeCoef:1542547.79};
var neptune = {colour:[255,255,0,255], tag,:"x", meanDistance:30.06896348, eccentricity:0.00858587 , inclination:1.76917, longitudeOfAscending:131.72169, longitudeOfPerigee:44.97135, meanLongitude:304.88003, meanLongitudeCoef:786449.21};
var pluto = {colour:[255,255,0,255], tag,:"x", meanDistance:39.48168677, eccentricity:0.24880766 , inclination:17.14175, longitudeOfAscending:110.30347, longitudeOfPerigee:224.06676, meanLongitude:238.92881, meanLongitudeCoef:522747.90};
var moon = {host:"earth", colour:[255,255,0,255], tag,:"x", meanDistance:0.2, eccentricity:0 , inclination:0, longitudeOfAscending:90, longitudeOfPerigee:90, meanLongitude:100, meanLongitudeCoef:522747.90};
planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto];

var orbits = [];

function Orbit(name, host, colour, meanDistance, eccentricity, inclination, longitudeOfAscending, longitudeOfPerigee, meanLongitude, meanLongitudeCoef, path) {}

Orbit.prototype.createOrbit = function() { //maybe add precision arg?
	path = [];
	for(d = 0; d < 365*earth.meanLongitudeCoef/planets[x].meanLongitudeCoef; d = d + 5 * planets[x].meanDistance^2){
		path.push(getPosition(this, d));
	}
	return path;
}

function removeOrbit(objectTag){
	for(orbit = 0; orbit < orbits.length){
		if(orbits[orbit] == objectTag){
			orbits.splice(orbit, 1)
		}
	}
}

refreshMap()

function rescaleCanvas(){
	canvas.style.height = window.innerHeight;
	canvas.style.width = window.innerWidth - 250;
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth - 250;
	var start = new Date().getTime();
	var x = transform(series,xslider.value,yslider.value,zslider.value)
	drawSeries(x, [255,255,255,255]);     
	var end = new Date().getTime();
	console.log(end - start)
}




rescaleCanvas()
