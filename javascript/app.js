//USE TYPE ARAAYS FOR COORDINATES

var canvas = document.getElementById("map");
var xslider = document.getElementById("xSlider");
var yslider = document.getElementById("ySlider");
var zslider = document.getElementById("zSlider");
var graph = document.getElementById("date");
var ctx = canvas.getContext("2d");

var pixl = ctx.createImageData(1,1);
var d  = pixl.data;  
var curve = []

function curveGen(){
	curve = []
	for(x = -15; x < 15; x = x + 0.005){
		curve.push([x*25,100*eval(graph.value),-10])
	}
	for(x = -15; x < 15; x = x + 0.005){
		curve.push([x*25,100*eval(graph.value),10])
	}
}


function rescaleCanvas(){
	canvas.style.height = window.innerHeight;
	canvas.style.width = window.innerWidth - 250;
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth - 250;
	var start = new Date().getTime();
	var x = transform(curve,xslider.value,yslider.value,zslider.value)
	drawSeries(x, [0,0,0,255]);     
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

function drawSeries(series, colour){
	var midx = Math.floor((canvas.width)/2);
	var midy = Math.floor(canvas.height/2);

	r = colour[0];
	g = colour[1];
	b = colour[2];
	a = colour[3]/255;

	
	var point = series.length;
	while(point--){
		ctx.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
		ctx.fillRect(series[point][0] + midx, series[point][1] + midy, 1, 1 );
	}
}

/*need a time => days function
function getPosition(orbit, days){
	double RADS = 0.017453292519943295;
    double cy = days / 36525;
    double meanDistance = entity.orbit.meanDistance a
    double eccentricity = entity.orbit.eccentricity e
    double inclination = entity.orbit.inclination* RADS; i
    double longitudeOfAscending = entity.orbit.longitudeOfAscending * RADS; O
    double longitudeOfPerigee = entity.orbit.longitudeOfPerigee * RADS; w
    double meanLongitud = mod2pi(entity.orbit.meanLongitude) * RADS); L

    double M = mod2pi(L - w);
    double E = M + ((e * Math.Sin(M)) * (1.0 + (e * Math.Cos(M))));
    double E1 = 0.0;

    do
    {
        E1 = E;
        E = E1 - (E1 - e * Math.Sin(E1) - M) / (1 - e * Math.Cos(E1));
    }
    while (Math.Abs(E - E1) > 0.0000000000001);

    double V = 2 * Math.Atan(Math.Sqrt((1 + e) / (1 - e)) * Math.Tan(0.5 * E1));
    double R = (a * (1 - (e * e))) / (1 + (e * (Math.Cos(V))));

    double xh = R * (Math.Cos(O) * Math.Cos(V + w - O) - Math.Sin(O) * Math.Sin(V + w - O) * Math.Cos(i));
    double yh = R * (Math.Sin(O) * Math.Cos(V + w - O) + Math.Cos(O) * Math.Sin(V + w - O) * Math.Cos(i));
    double zh = R * (Math.Sin(V + w - O) * Math.Sin(i));

    return new double[] { xh, yh, zh };
}

function mod2pi(x)
{
    double b = x / (2 * Math.PI);
    double a = (2 * Math.PI) * (b - abs_floor(b));
    if (a < 0) a = (2 * Math.PI) + a;
    return a;
}

function abs_floor( x)
{
    double r;
    if (x >= 0.0) r = Math.Floor(x);
    else r = Math.Ceiling(x);
    return r;
}*/





rescaleCanvas()
