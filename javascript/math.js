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
	
	return [x, y, z];
}

function mod2pi(x){
	var b = x / (2 * Math.PI);
	var a = (2 * Math.PI) * (b - abs_floor(b));
	if (a < 0) a = (2 * Math.PI) + a;
	return a;
}

function abs_floor(x){
	var r;
	if (x >= 0.0) r = Math.floor(x);
	else r = Math.ceil(x);
	return r;
}

function rotate(orbitPath){
	var cosx = Math.cos(xr)
	var cosy = Math.cos(yr)
	var cosz = Math.cos(zr)
	var sinx = Math.sin(xr)
	var siny = Math.sin(yr)
	var sinz = Math.sin(zr)

	var a = cosy*cosz;
	var b = -sinz*cosy;
	var c = siny;
	var d = cosx*sinz + cosz*sinx*siny;
	var e = cosx*cosz - siny*sinz*sinx;
	var f = -sinx*cosy;
	var g = sinz*sinx - siny*cosz*cosx;
	var h = cosx*siny*sinz + cosz*sinx;
	var i = cosx*cosy;

	transformedPath = []

	for(point = 0; point < orbitPath.length; ++point){
		x = orbitPath[point][0];
		y = orbitPath[point][1];
		z = orbitPath[point][2];
		transformedPath.push(
		[x * a + y * b + z * c,
		 x * d + y * e + z * f,
		 x * g + y * h + z * i]);
		 
	}
	return transformedPath;
}

function project(orbitPath){
	transformedPath = [];
	for(point = 0; point < orbitPath.length; ++point){
		transformedPath.push([orbitPath[point][0]*scale/(viewDistance+orbitPath[point][2]),orbitPath[point][1]*scale/(viewDistance+orbitPath[point][2])])
	}
	return transformedPath;
}
