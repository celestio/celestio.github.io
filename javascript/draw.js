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