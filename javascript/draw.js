function drawOrbit(orbit, x, y, z) {
  r = orbit.colour[0];
  g = orbit.colour[1];
  b = orbit.colour[2];
  a = orbit.colour[3] / 255;
  ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
  midx = Math.floor((canvas.width) / 2);
  midy = Math.floor(canvas.height / 2);  

  transformedPath = project(rotate(translate(orbit.path, x, y, z)));

  point = transformedPath.length - 1;  
  
  orbit.X = getPosition(orbit, date.getTime() / MSPERDAY)[0] - x - focusPlanet.X;
  orbit.Y = getPosition(orbit, date.getTime() / MSPERDAY)[1] - y - focusPlanet.Y;
  orbit.Z = getPosition(orbit, date.getTime() / MSPERDAY)[2] - z - focusPlanet.Z;

  ctx.moveTo(transformedPath[point][0] + midx, transformedPath[point][1] + midy);
  ctx.beginPath();
  ctx.lineTo(transformedPath[transformedPath.length - 1][0] + midx, transformedPath[transformedPath.length - 1][1] + midy)
  while (point--) {
    ctx.lineTo(transformedPath[point][0] + midx, transformedPath[point][1] + midy)
  }
  ctx.lineTo(transformedPath[transformedPath.length - 1][0] + midx, transformedPath[transformedPath.length - 1][1] + midy)
  ctx.stroke();

  orbitRadius = 25;
  actualPosition = translate([getPosition(orbit, date.getTime() / MSPERDAY)], x, y, z)[0];
  rotatedPosition = rotate([actualPosition])[0];
  centerOfPositionOnScreen = project([rotatedPosition])[0];
  edgeOfScreenPositionOnScreen = project([[rotatedPosition[0] + orbitRadius, rotatedPosition[1], rotatedPosition[2]]])[0];
  radius = Math.abs(centerOfPositionOnScreen[0] - edgeOfScreenPositionOnScreen[0]);
  projectedPosition = project(rotate([actualPosition]));
  
  orbit.screenX = projectedPosition[0][0];
  orbit.screenY = projectedPosition[0][1];

  orbit.radius = 20 * radius / scale;
  ctx.beginPath();
  ctx.arc(projectedPosition[0][0] + midx, projectedPosition[0][1] + midy, orbit.radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
  ctx.fill();
  drawText(orbit.tag,  projectedPosition[0][0] + midx + 15, projectedPosition[0][1] + midy - 5)

  for (var i = 0; i < orbit.children.length; ++i) {
    drawOrbit(planets[orbit.children[i]], actualPosition[0], actualPosition[1], actualPosition[2]);
  }
}

function redrawCanvas(time) {
  canvas.setAttribute("width", window.innerWidth - 250);
  canvas.setAttribute("height", window.innerHeight);

  msStart = Date.now();

  prevFrameTime = time - prevTime;
  fps = Math.round(1000 / (prevFrameTime));
  drawText(fps + "fps", 10, 20)

  for (i = 0; i < selectedOrbits[0].children.length; ++i) {
    origin = getPosition(focusPlanet, date.getTime() / MSPERDAY)
    drawOrbit(planets[selectedOrbits[0].children[i]], -focusPlanet.X, -focusPlanet.Y, -focusPlanet.Z);
  }

  //drawOrigin();
  date.setTime(date.getTime() + prevFrameTime * daysPerSecond * 840000 / 1000)

  prevTime = time;
  drawText((Date.now() - msStart) + "ms", 60, 20)
  syncvariables();
  window.requestAnimationFrame(redrawCanvas);
}

function drawText(text, x, y) {
  ctx.fillStyle = 'rgb(250,250,250)';
  ctx.font = "10pt Courier";
  ctx.fillText(text, x, y);
}

//draw back orbits
//draw objects
