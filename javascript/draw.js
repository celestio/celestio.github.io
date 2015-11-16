function drawOrbit(orbitPath, colour){
	midx = Math.floor((canvas.width)/2);
	midy = Math.floor(canvas.height/2);

	r = colour[0];
	g = colour[1];
	b = colour[2];
	a = colour[3]/255;

	transformedPath = addPerspective(rotate(orbitPath));
		
	var point = transformedPath.length - 1;

	ctx.strokeStyle="rgba("+r+","+g+","+b+","+a+")";

	ctx.moveTo(transformedPath[point][0] + midx, transformedPath[point][1] + midy);	
	ctx.beginPath();

	ctx.lineTo(transformedPath[transformedPath.length - 1][0]*scale + midx, transformedPath[transformedPath.length - 1][1]*scale + midy)	
	while(point--){
		ctx.lineTo(transformedPath[point][0]*scale + midx, transformedPath[point][1]*scale + midy)
	}
	ctx.lineTo(transformedPath[transformedPath.length - 1][0]*scale + midx, transformedPath[transformedPath.length - 1][1]*scale + midy)
	ctx.stroke();	
}

function drawObject(orbit){
	midx = Math.floor((canvas.width)/2);
	midy = Math.floor(canvas.height/2);
	
	r = orbit.colour[0]
	g = orbit.colour[1]
	b = orbit.colour[2]
	a = orbit.colour[3]
	
	position = addPerspective(rotate([getPosition(orbit, date)]));
	
	ctx.beginPath();
	ctx.arc(position[0][0]*scale + midx, position[0][1]*scale + midy, 10, 0, 2*Math.PI);
	ctx.strokeStyle="black";
	ctx.stroke();
	
	ctx.fillStyle="rgba("+r+","+g+","+b+","+a+")";
	ctx.fill();

	//please redo
	ctx.beginPath();
	ctx.arc(midx, midy, 10, 0, 2*Math.PI);
	ctx.strokeStyle="black";
	ctx.stroke();
	
	ctx.fillStyle="rgba("+r+","+g+","+b+","+a+")";
	ctx.fill();
}

function redrawCanvas(time){
	canvas.setAttribute("width", window.innerWidth - 250); 
	canvas.setAttribute("height", window.innerHeight);
	
	msStart = Date.now();
	
	prevFrameTime = time - prevTime;
	fps = Math.round(1000/(prevFrameTime));	
	ctx.fillStyle = 'rgb(250,250,250)';
    ctx.font = "10pt Courier";
    ctx.fillText(fps+"fps", 10, 20);	

	for (i = 0; i < selectedOrbits.length; ++i) {
		drawOrbit(selectedOrbits[i].path, selectedOrbits[i].colour);
		drawObject(selectedOrbits[i])
	};
	date = (parseFloat(date) + prevFrameTime*daysPerSecond/1000).toString()

	prevTime = time;	
	ctx.fillStyle = 'rgb(250,250,250)';
    	ctx.font = "10pt Courier";
    	ctx.fillText((Date.now() - msStart) + "ms", 60, 20);	
	syncvariables()	
	window.requestAnimationFrame(redrawCanvas);
}
