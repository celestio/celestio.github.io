function drawOrbit(path, colour){
	var midx = Math.floor((canvas.width)/2);
	var midy = Math.floor(canvas.height/2);

	r = colour[0];
	g = colour[1];
	b = colour[2];
	a = colour[3]/255;

		
	var point = path.length - 1;

	ctx.strokeStyle="rgba("+r+","+g+","+b+","+a+")";

	ctx.moveTo(path[point][0] + midx, path[point][1] + midy);	
	ctx.beginPath();
	ctx.lineTo(path[path.length - 1][0]*graph.value + midx, path[path.length - 1][1]*graph.value + midy)
	while(point--){
		ctx.lineTo(path[point][0]*graph.value + midx, path[point][1]*graph.value + midy)
	}
	ctx.lineTo(path[path.length - 1][0]*graph.value + midx, path[path.length - 1][1]*graph.value + midy)
	ctx.stroke();	
}