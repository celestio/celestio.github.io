//USE TYPE ARAAYS FOR COORDINATES

var canvas = document.getElementById("map");
var xslider = document.getElementById("xSlider");
var yslider = document.getElementById("ySlider");
var zslider = document.getElementById("zSlider");
var graph = document.getElementById("scale");
var ctx = canvas.getContext("2d");

var pixl = ctx.createImageData(1,1);
var d  = pixl.data;  
var curve = []

var mercury = {meanDistance:0.38709893, eccentricity:0.20563069, inclination:7.00487, longitudeOfAscending:48.33167, longitudeOfPerigee:77.45645, meanLongitude:252.25084, meanLongitudeCoef:538101628.29}
var venus = {meanDistance:0.72333199, eccentricity:0.00677323, inclination:3.39471, longitudeOfAscending:76.68069, longitudeOfPerigee:131.53298, meanLongitude:181.97973, meanLongitudeCoef:210664136.06}
var earth = {meanDistance:1.00000011, eccentricity:0.01671022, inclination:0.00005, longitudeOfAscending:-11.26064, longitudeOfPerigee:102.94719, meanLongitude:100.46435, meanLongitudeCoef:129597740.63}
var mars = {meanDistance:1.52366231, eccentricity:0.09341233, inclination:1.85061, longitudeOfAscending:-49.57854, longitudeOfPerigee:336.04084, meanLongitude:355.45332, meanLongitudeCoef:68905103.78}
var jupiter = {meanDistance:5.20336301, eccentricity:0.04839266, inclination:1.30530, longitudeOfAscending:100.55615, longitudeOfPerigee:14.7538, meanLongitude:34.40438, meanLongitudeCoef:10925078.35}
var saturn = {meanDistance:9.53707032, eccentricity:0.05415060, inclination:2.48446, longitudeOfAscending:113.71504, longitudeOfPerigee:92.43194, meanLongitude:49.94432, meanLongitudeCoef:4401052.95}
var uranus = {meanDistance:19.19126393, eccentricity:0.04716771, inclination:0.76986, longitudeOfAscending:74.22988, longitudeOfPerigee:170.96424, meanLongitude:313.23218, meanLongitudeCoef:1542547.79}
var neptune = {meanDistance:30.06896348, eccentricity:0.00858587 , inclination:1.76917, longitudeOfAscending:131.72169, longitudeOfPerigee:44.97135, meanLongitude:304.88003, meanLongitudeCoef:786449.21}
var pluto = {meanDistance:39.48168677, eccentricity:0.24880766 , inclination:17.14175, longitudeOfAscending:110.30347, longitudeOfPerigee:224.06676, meanLongitude:238.92881, meanLongitudeCoef:522747.90}

planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto]

function refreshMap(){
	series = []
	for(p = 0; p < planets.length; ++p){
		curve = []
		for(x = 0; x < 365*earth.meanLongitudeCoef/planets[p].meanLongitudeCoef; x = x + 5 * planets[p].meanDistance^2){
			curve.push(getPosition(planets[p], x))
		}
		series.push(curve)
	}
	rescaleCanvas()
}

refreshMap()

function rescaleCanvas(){
	canvas.style.height = window.innerHeight;
	canvas.style.width = window.innerWidth - 250;
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth - 250;
	var start = new Date().getTime();
	var x = transform(curve,xslider.value,yslider.value,zslider.value)
	drawSeries(x, [255,255,255,255]);     
	var end = new Date().getTime();
	console.log(end - start)
}

function transform(series, xr, yr, zr){
	var cosx = Math.cos(xr)
	var cosy = Math.cos(yr)
	var cosz = Math.cos(zr)
	var sinx = Math.sin(xr)
	var siny = Math.sin(yr)
	var sinz = Math.sin(zr)

	var transformed = []

	var a = cosy*cosz;
	var b = -sinz*cosy;
	var c = siny;
	var d = cosx*sinz + cosz*sinx*siny;
	var e = cosx*cosz - siny*sinz*sinx;
	var f = -sinx*cosy;
	var g = sinz*sinx - siny*cosz*cosx;
	var h = cosx*siny*sinz + cosz*sinx;
	var i = cosx*cosy;

	for(point = 0, len = series.length; point < len; ++point){
		x = series[point][0];
		y = series[point][1];
		z = series[point][2];
		transformed.push(
		[x * a + y * b + z * c,
		 x * d + y * e + z * f,
		 x * g + y * h + z * i]);
	}

	return transformed;
}

function drawSeries(map, colour){
	var midx = Math.floor((canvas.width)/2);
	var midy = Math.floor(canvas.height/2);

	r = colour[0];
	g = colour[1];
	b = colour[2];
	a = colour[3]/255;

	for(series = 0; series < map.length; ++series){
		
		var point = map[series].length;
		
		ctx.beginPath();
		ctx.strokeStyle="red";
		ctx.moveTo(20,20);
		
		while(--point){
			ctx.lineTo(map[series][point][0] + midx, map[series][point][1] + midy)
		}
		ctx.stroke();
	}
	
	//	var point = series.length; 
	//while(point--){ 
		//ctx.fillStyle = "rgba("+r+","+g+","+b+","+a+")"; 
	//	ctx.fillRect(series[point][0] + midx, series[point][1] + midy, 1, 1 ); 
	//} 

}

function getPosition(orbit, days){
	var RADS = 0.017453292519943295;
	var cy = days / 36525;
	var meanDistance = orbit.meanDistance;
	var eccentricity = orbit.eccentricity;
	var inclination = orbit.inclination* RADS; 
	var longitudeOfAscending = orbit.longitudeOfAscending * RADS; 
	var longitudeOfPerigee = orbit.longitudeOfPerigee * RADS; 
	var meanLongitude = mod2pi((orbit.meanLongitude + orbit.meanLongitudeCoef*cy/3600) * RADS); 
	
	var meanAnomaly = mod2pi(meanLongitude - longitudeOfPerigee);
	var eccentricAnomalyApprox = meanAnomaly + eccentricity * Math.sin(meanAnomaly) * (1.0 + eccentricity * Math.cos(meanAnomaly));
	var eccentricAnomaly = 0;
	
	do
	{
		eccentricAnomaly = eccentricAnomalyApprox;
		eccentricAnomalyApprox = eccentricAnomaly - (eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly) / (1 - eccentricity * Math.cos(eccentricAnomaly));
	}
	while (Math.abs(eccentricAnomaly - eccentricAnomalyApprox) > 0.0000000001);
	
	var trueAnomaly = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(0.5 * eccentricAnomaly));
	var helioCentricRadius = (meanDistance * (1 - (eccentricity * eccentricity))) / (1 + (eccentricity * (Math.cos(trueAnomaly))));
	
	var x = helioCentricRadius * (Math.cos(longitudeOfAscending) * Math.cos(trueAnomaly + longitudeOfPerigee - longitudeOfAscending) - Math.sin(longitudeOfAscending) * Math.sin(trueAnomaly + longitudeOfPerigee - longitudeOfAscending) * Math.cos(inclination));
	var y = helioCentricRadius * (Math.sin(longitudeOfAscending) * Math.cos(trueAnomaly + longitudeOfPerigee - longitudeOfAscending) + Math.cos(longitudeOfAscending) * Math.sin(trueAnomaly + longitudeOfPerigee - longitudeOfAscending) * Math.cos(inclination));
	var z = helioCentricRadius * (Math.sin(trueAnomaly + longitudeOfPerigee - longitudeOfAscending) * Math.sin(inclination));
	
	return [x*graph.value, y*graph.value, z*graph.value];
}

function mod2pi(x)
{
	var b = x / (2 * Math.PI);
	var a = (2 * Math.PI) * (b - abs_floor(b));
	if (a < 0) a = (2 * Math.PI) + a;
	return a;
}

function abs_floor(x)
{
	var r;
	if (x >= 0.0) r = Math.floor(x);
	else r = Math.ceil(x);
	return r;
}
rescaleCanvas()
