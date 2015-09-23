function draw() 
{
	var c = document.getElementById("SideBar");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(0,0,150,75);
	ctx.canvas.height = window.innerHeight;
	ctx.canvas.width = window.innerWidth;
}

draw();