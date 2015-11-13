var canvas = document.getElementById("map");
// var xslider = document.getElementById("xSlider");
// var yslider = document.getElementById("ySlider");
// var zslider = document.getElementById("zSlider");
var scale = document.getElementById("scale");
var date = document.getElementById("date");
var fastback = document.getElementById("fastback")
var slowback = document.getElementById("slowback")
var pause = document.getElementById("pause")
var slowforward = document.getElementById("slowforward")
var fastforward = document.getElementById("fastforward")
var ctx = canvas.getContext("2d");

var xr = 0;
var yr = 0;
var zr = 0;
var daysPerSecond = 0;
var mousedown = false;

fastback.onclick = function(){daysPerSecond = -500;}
slowback.onclick = function(){daysPerSecond = -100;}
pause.onclick = function(){daysPerSecond = 0;}
slowforward.onclick = function(){daysPerSecond = 100;}
fastforward.onclick = function(){daysPerSecond = 365.2*60;}

function Orbit(colour, tag, meanDistance, eccentricity, inclination, longitudeOfAscending, longitudeOfPerigee, meanLongitude, meanLongitudeCoef, origin) {
	this.tag = tag;
	this.origin = origin;
	this.colour = colour;
	this.meanDistance = meanDistance;
	this.eccentricity = eccentricity;
	this.inclination = inclination;
	this.longitudeOfAscending = longitudeOfAscending;
	this.longitudeOfPerigee = longitudeOfPerigee;
	this.meanLongitude = meanLongitude;
	this.meanLongitudeCoef = meanLongitudeCoef;
	this.path = []
}

var mercury = new Orbit([255,255,0,255], "x", 0.38709893, 0.20563069, 7.00487, 48.33167, 77.45645, 252.25084, 538101628.29, 0);
var venus = new Orbit([255,255,0,255], "x", 0.72333199, 0.00677323, 3.39471, 76.68069, 131.53298, 181.97973, 210664136.06, 0);
var earth = new Orbit([255,255,0,255], "earth", 1.00000011, 0.01671022, 0.00005, -11.26064, 102.94719, 100.46435, 129597740.63, 0);
var mars = new Orbit([255,255,0,255], "x", 1.52366231, 0.09341233, 1.85061, -49.57854, 336.04084, 355.45332, 68905103.78, 0);
var jupiter = new Orbit([255,255,0,255], "x", 5.20336301, 0.04839266, 1.30530, 100.55615, 14.7538, 34.40438, 10925078.35, 0);
var saturn = new Orbit([255,255,0,255], "x", 9.53707032, 0.05415060, 2.48446, 113.71504, 92.43194, 49.94432, 4401052.95, 0);
var uranus = new Orbit([255,255,0,255], "x", 19.19126393, 0.04716771, 0.76986, 74.22988, 170.96424, 313.23218, 1542547.79, 0);
var neptune = new Orbit([255,255,0,255], "x", 30.06896348, 0.00858587 , 1.76917, 131.72169, 44.97135, 304.88003, 786449.21, 0);
var pluto = new Orbit([255,255,0,255], "x", 39.48168677, 0.24880766 , 17.14175, 110.30347, 224.06676, 238.92881, 522747.90, 0);

var selectedOrbits = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto];

Orbit.prototype.createOrbit = function() { //maybe add precision arg?
	this.path = [];
	for(d = 0; d < 365*earth.meanLongitudeCoef/this.meanLongitudeCoef; d = d + (earth.meanLongitudeCoef)/(this.meanLongitudeCoef)){
		this.path.push(getPosition(this, d));
	}
}

function initialiseOrbits(){
	for(i = 0; i < selectedOrbits.length; ++i){
		selectedOrbits[i].createOrbit();
	}
}

function removeOrbit(orbitTag){
	for(i = 0; i < selectedOrbits.length; ++i){
		if(selectedOrbits[i].tag == orbitTag){
			orbits.splice(orbit, 1)
		}
	}
}

function doScroll(e){ //maybe add sensitivity arg?
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    if(delta == -1){
    	scale.value = (parseFloat(scale.value) * 0.8).toString()
    }

    else{
    	scale.value = (parseFloat(scale.value) * 1.25).toString()
    }
    
    e.preventDefault();
};

function initialisePage(){

	if (window.addEventListener){
   		window.addEventListener("mousewheel", doScroll, false);
    	window.addEventListener("DOMMouseScroll", doScroll, false);
	}

	else{
    	window.attachEvent("onmousewheel", doScroll);
	}

	canvas.onmousedown = function(e){mousedown = true; prevMouseX = e.clientX/100; prevMouseY = e.clientY/100;};
	canvas.onmouseup = function(){mousedown = false;};

	canvas.onmousemove = function(e){
		mouseX = e.clientX/100;
		mouseY = e.clientY/100;

		if(mousedown){
			deltax = mouseX - prevMouseX;
			deltay = mouseY - prevMouseY;
			zr += deltax;
			xr += deltay
		}		

		prevMouseX = mouseX;
		prevMouseY = mouseY;
	}
}

prevTime = 0;
initialiseOrbits();
redrawCanvas();