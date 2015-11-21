var tree;

function setup() {
  createCanvas(1280, 720);
  fill(150);
  var depth = 5;
  tree = createTree(depth, width/2, height/2, false);
}

function draw() {
  drawTree(tree);
}

function drawTree(t) {
  line(t.start.x, t.start.y, t.end.x, t.end.y);
  if (t.l) drawTree(t.l);
  if (t.r) drawTree(t.r);
}

function createTree(depth, x, y, left) {
  if (depth < 0) return;
    console.log(depth);
  this.start = {x: x, y: y};
  this.end = {x: left? x - 10 : x + 10, y: y + depth * 10}
  this.l = createTree(depth - 1, this.end.x, this.end.y, false)
  this.y = createTree(depth - 1, this.end.x, this.end.y, true);
  return this;
}