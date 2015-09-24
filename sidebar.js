function draw() {
  var c = document.getElementById("SideBar");
  var ctx = c.getContext("2d");
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = 300;
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0, 0, 300, window.innerHeight);
}

draw();
