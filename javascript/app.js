//http://ssd.jpl.nasa.gov/?sat_elem

var MSPERDAY = 840000
var VIEWDISTANCE = 100

var canvas = document.getElementById("map");
var dateInput = document.getElementById("date");
var speedInput = document.getElementById("speed")
var ctx = canvas.getContext("2d");
var prevTime = 0;
var xr = 0;
var yr = 0;
var zr = 0;
var daysPerSecond = 100;
var mousedown = false;
var scale = 600;
var date = new Date();

dateInput.oninput = function() {
  date.value = dateInput.value;
}
speedInput.oninput = function() {  
  if(this.value == 0){
    daysPerSecond = 0
  }
  else if(this.value > 0){
    daysPerSecond = Math.pow(Math.E, this.value)
  }
  else{
    daysPerSecond = -Math.pow(Math.E, -this.value)
  }
}

function Orbit(colour, tag, meanDistance, eccentricity, inclination, longitudeOfAscending, longitudeOfPerigee, meanLongitude, meanLongitudeCoef, children) {
  this.tag = tag;
  this.children = children;
  this.colour = colour;
  this.meanDistance = meanDistance;
  this.eccentricity = eccentricity;
  this.inclination = inclination;
  this.longitudeOfAscending = longitudeOfAscending;
  this.longitudeOfPerigee = longitudeOfPerigee;
  this.meanLongitude = meanLongitude;
  this.meanLongitudeCoef = meanLongitudeCoef;
  this.path = [];
  this.distance = 0;
  this.radius = 0;
  this.screenX = 0;
  this.screenY = 0;
  this.X = 0;
  this.Y = 0;
  this.Z = 0;
}

Orbit.prototype.createOrbit = function() { //maybe add precision arg?
  this.path = [];
  for (d = 0; d < 375 * planets.earth.meanLongitudeCoef / this.meanLongitudeCoef; d = d + (planets.earth.meanLongitudeCoef) / (2 * this.meanLongitudeCoef)) {
    this.path.push(getPosition(this, d));
  }
}

var planets = {
  moon: new Orbit([255, 255, 255, 255], "moon", 0.00257356604, 0.0549006, 5.14, 125.08, 318.15, 100.46435, 3.0),
  mercury: new Orbit([255, 0, 255, 255], "mercury", 0.38709893, 0.20563069, 7.00487, 48.33167, 77.45645, 252.25084, 4.09233875876, []),
  venus: new Orbit([255, 0, 0, 255], "venus", 0.72333199, 0.00677323, 3.39471, 76.68069, 131.53298, 181.97973, 1.60213048307, []),
  earth: new Orbit([0, 255, 255, 255], "earth", 1.00000011, 0.01671022, 0.00005, -11.26064, 102.94719, 100.46435, 0.963, ["moon"]),
  mars: new Orbit([0, 255, 0, 255], "mars", 1.52366231, 0.09341233, 1.85061, -49.57854, 336.04084, 355.45332, 0.52403272293, []),
  jupiter: new Orbit([0, 0, 255, 255], "jupiter", 5.20336301, 0.04839266, 1.30530, 100.55615, 14.7538, 34.40438, 0.08308676566, []),
  saturn: new Orbit([255, 255, 0, 255], "saturn", 9.53707032, 0.05415060, 2.48446, 113.71504, 92.43194, 49.94432, 0.0334706311, []),
  uranus: new Orbit([255, 0, 255, 255], "uranus", 19.19126393, 0.04716771, 0.76986, 74.22988, 170.96424, 313.23218, 0.01173129354, []),
  neptune: new Orbit([0, 255, 0, 255], "neptune", 30.06896348, 0.00858587, 1.76917, 131.72169, 44.97135, 304.88003, 0.00598105709, []),
  pluto: new Orbit([0, 255, 255, 255], "pluto", 39.48168677, 0.24880766, 17.14175, 110.30347, 224.06676, 238.92881, 0.00395169701, []),
  sun: new Orbit([255, 255, 0, 255], "sun", 0, 0, 0, 0, 0, 0, 0, ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"])
}
var selectedOrbits = [planets.sun];
var focusPlanet = planets.sun;

function initialiseOrbits(parent) {
  parent.createOrbit();
  for (var i = 0; i < parent.children.length; ++i) {
    initialiseOrbits(planets[parent.children[i]]);
  }
}

function doScroll(e) { //maybe add sensitivity arg?
  e = window.event || e;
  var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

  if (delta == -1) {
    scale = scale * 0.8;
  } else {
    scale = scale * 1.25;
  }

  e.preventDefault();
};

function checkForPlanet(parent, x, y) {
  for (var i = 0; i < parent.children.length; ++i) {
    checkForPlanet(planets[parent.children[i]], x, y);
  }
  if(Math.abs(x - midx - 250 - parent.screenX) < (parent.radius + 7) & Math.abs(y - midy - parent.screenY) < (parent.radius + 7)){
    focusPlanet = planets[parent.tag];
  }
}

function initialisePage() {

  if (window.addEventListener) {
    window.addEventListener("mousewheel", doScroll, false);
    window.addEventListener("DOMMouseScroll", doScroll, false);
  } else {
    window.attachEvent("onmousewheel", doScroll);
  }

  canvas.onmousedown = function(e) {
    mousedown = true;
    prevMouseX = e.clientX / 100;
    prevMouseY = e.clientY / 100;
    checkForPlanet(planets.sun, e.clientX, e.clientY)
  };
  canvas.onmouseup = function() {
    mousedown = false;
  };

  canvas.onmousemove = function(e) {
    mouseX = e.clientX / 100;
    mouseY = e.clientY / 100;

    if (mousedown) {
      deltax = mouseX - prevMouseX;
      deltay = mouseY - prevMouseY;
      zr -= deltax * 0.75;
      xr += deltay * 0.75;
    }

    prevMouseX = mouseX;
    prevMouseY = mouseY;
  }
}

function syncvariables() {
  dateInput.value = date.toISOString();
  //scaleInput.value = scale | 0;
}

initialiseOrbits(planets.sun);
syncvariables();

redrawCanvas(0)
