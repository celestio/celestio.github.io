function drawOrbit(orbitPath, colour){
	midx = Math.floor((canvas.width)/2);
	midy = Math.floor(canvas.height/2);

	r = colour[0];
	g = colour[1];
	b = colour[2];
	a = colour[3]/255;

	transformedPath = transform(orbitPath)
		
	var point = transformedPath.length - 1;

	ctx.strokeStyle="rgba("+r+","+g+","+b+","+a+")";

	ctx.moveTo(transformedPath[point][0] + midx, transformedPath[point][1] + midy);	
	ctx.beginPath();

	ctx.lineTo(transformedPath[transformedPath.length - 1][0]*graph.value + midx, transformedPath[transformedPath.length - 1][1]*graph.value + midy)	
	while(point--){
		ctx.lineTo(transformedPath[point][0]*graph.value + midx, transformedPath[point][1]*graph.value + midy)
	}
	ctx.lineTo(transformedPath[transformedPath.length - 1][0]*graph.value + midx, transformedPath[transformedPath.length - 1][1]*graph.value + midy)

	ctx.stroke();	
}

function drawObject(orbit){
	
	midx = Math.floor((canvas.width)/2);
	midy = Math.floor(canvas.height/2);
	
	position = getPosition(orbit, date.value)
	
	ctx.beginPath();
	ctx.arc(position[0] + midx, position[1] + midy, 10, 0, 2*Math.PI);
	ctx.strokeStyle = '#000000';
	ctx.stroke();
	ctx.fillStyle = '#FF0000';
	ctx.fill();
}
