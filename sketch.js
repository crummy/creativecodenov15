// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 1-1: stroke and fill

function setup() {
  createCanvas(1280, 720);
  noStroke();
  fill(150);
  for (var x = 0; x < width; x += 10) {
    for (var y = 0; y < height; y += 10) {
      var distance = distanceToCenter(x, y);
      var colour = getColour(distance);
      fill(colour);
      rect(x, y, 10, 10);
      console.log(x, y, colour, distance);
    }
  }
}

function draw() {

}

function distanceToCenter(x, y) {
  return Math.sqrt((x*x)+(y*y));
}

function getColour(distance) {
  var colour = Math.sin(distance + frameCount) * 255;
  return color(colour, colour, colour);
}