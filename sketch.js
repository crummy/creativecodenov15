// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 1-1: stroke and fill

function setup() {
  createCanvas(320, 480);
  noStroke();
  fill(150);

}

function draw() {
  var boxSize = 6;
  for (var x = 0; x < width; x += boxSize) {
    for (var y = 0; y < height; y += boxSize) {
      var distance = distanceToCenter(x, y);
      var colour = getColour(distance);
      fill(colour);
      rect(x, y, boxSize, boxSize);
    }
  }
}

function distanceToCenter(x, y) {
  return (x*x)+(y*y);
}

function getColour(distance) {
  var r = Math.sin((distance - frameCount * 1000) * .0001);
  var g = Math.sin((distance - frameCount * 1000) * .0002);
  var b = Math.sin((distance - frameCount * 1000) * .0004);
  return color((r+1)/2 * 255, (g+1)/2 * 255, (b+1)/2 * 255);
}