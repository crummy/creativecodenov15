var tree;
var branchesSlider;
var lengthSlider;
var angleSlider;
var maxDepth = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawStaticUI();
  var maxDepth = 10;
  var treeStart = createVector(width/2, height * 0.8);
  tree = new createTree(maxDepth, treeStart, 0);
}

function draw() {
  background(127, 117, 95);
  tree.sway(frameCount * 0.01);
  drawTree(tree, branchesSlider.value());
  drawLiveUI();
}

function drawLiveUI() {
  fill(0);
  stroke(0);
  drawSliderLabels("Branches", branchesSlider);
  drawSliderLabels("Length", lengthSlider);
  drawSliderLabels("Angle", angleSlider);
}

function drawSliderLabels(name, slider) {
  textAlign(RIGHT);
  text(name + ": ", slider.position().x, slider.position().y + 14);
  textAlign(LEFT);
  text(slider.value(), slider.position().x + slider.size().width + 4, slider.position().y + 14);
}

function drawStaticUI() {
  branchesSlider = createSlider(1, maxDepth, 5);
  branchesSlider.position(64, 8);
  lengthSlider = createSlider(1, 100, 60);
  lengthSlider.position(64, 32);
  angleSlider = createSlider(1, 100, 30);
  angleSlider.position(64, 56);
}

function drawTree(t, depth) {
  stroke(255, 235, 191);
  if (t == undefined || depth < 0) return;
  line(t.start.x, t.start.y, t.end.x, t.end.y);
  drawTree(t.l, depth - 1);
  drawTree(t.r, depth - 1);
}

function createTree(depth, origin, angle) {
  this.depth = depth;
  this.start = origin;
  this.angle = angle;
  var length = depth * 10;
  this.end = createVector(origin.x + Math.sin(angle)*length, origin.y - Math.cos(angle)*length);
  if (depth > 0) {;
    this.l = new createTree(this.depth - 1, this.end, angle-1);
    this.r = new createTree(this.depth - 1, this.end, angle+1);
  }
  this.sway = function sway(amount) {
    var angle = Math.sin(this.angle * angleSlider.value() * 0.01 + amount);
    this.end.x = origin.x + Math.sin(angle)*lengthSlider.value();
    this.end.y = origin.y - Math.cos(angle)*lengthSlider.value();
    if (depth > 0) {
      this.l.sway(amount);
      this.r.sway(amount);
    }
  }
}
