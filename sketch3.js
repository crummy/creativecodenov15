var angers = [];
var angerImages = [];
var joys = [];
var joyImages = [];
var lonelys = [];
var lonelyImages = [];
var selectedEmotion = "";

function setup() {
  createCanvas(1280, 720);
  
  angerImages.push(loadImage("pics/Anger 1-02.png"));
  angerImages.push(loadImage("pics/Anger 2-02-02.png"));
  angerImages.push(loadImage("pics/Anger 3-02.png"));
  angerImages.push(loadImage("pics/Anger 4-02.png"));
  
  joyImages.push(loadImage("pics/Joy1-02.png"));
  joyImages.push(loadImage("pics/Joy2-02.png"));
  joyImages.push(loadImage("pics/Joy3-02.png"));
  joyImages.push(loadImage("pics/Joy4-02.png"));
  
  lonelyImages.push(loadImage("pics/Lonely1-02.png"));
  lonelyImages.push(loadImage("pics/Lonely2-02.png"));
  lonelyImages.push(loadImage("pics/Lonely3-02.png"));
  lonelyImages.push(loadImage("pics/Lonely4-02.png"));
}

function draw() {
  clear();
  drawUI();
  moveAngers();
  moveJoys();
  moveLonelys();
  applyMovements();
  drawEmotions();
}

function drawEmotions() {
  imageMode(CENTER);
  stroke(0);
  for (var i = 0; i < angers.length; ++i) {
    image(angers[i].image, angers[i].x, angers[i].y)
  }
  for (var i = 0; i < lonelys.length; ++i) {
    image(lonelys[i].image, lonelys[i].x, lonelys[i].y);
  }
  for (var i = 0; i < joys.length; ++i) {

    translate(joys[i].x, joys[i].y)
        rotate(joys[i].r);
    image(joys[i].image, 0, 0);
    resetMatrix();
  }
}

function applyMovements() {
  for (var i = 0; i < angers.length; ++i) {
    limitMovement(angers[i]);
    angers[i].x += angers[i].dx;
    angers[i].y += angers[i].dy;
  }
  for (var i = 0; i < joys.length; ++i) {
    limitMovement(joys[i]);
    joys[i].r += joys[i].dr;
    joys[i].x += joys[i].dx;
    joys[i].y += joys[i].dy;
  }
  for (var i = 0; i < lonelys.length; ++i) {
    limitMovement(lonelys[i]);
    lonelys[i].x += lonelys[i].dx;
    lonelys[i].y += lonelys[i].dy;
  }
}

function limitMovement(emotion) {
  var maxSpeed = 4;
  if (emotion.dx > maxSpeed) emotion.dx = maxSpeed;
  if (emotion.dx < -maxSpeed) emotion.dx = -maxSpeed;
  if (emotion.dy > maxSpeed) emotion.dy = maxSpeed;
  if (emotion.dy < -maxSpeed) emotion.dy = -maxSpeed;
  if (emotion.x < 0) {
    if (emotion.dx < 0) emotion.dx = -emotion.dx;
    emotion.x = 0;
  } else if (emotion.x > width) {
    if (emotion.dx > 0) emotion.dx = -emotion.dx;
    emotion.x = width;
  }
  if (emotion.y < 0) {
    if (emotion.dy < 0) emotion.dy = -emotion.dy;
    emotion.y = 0;
  }
  if (emotion.y > height) {
    if (emotion.dy > height) emotion.dy = -emotion.dy;
    emotion.y = height;
  }
  emotion.dx * 0.99;
  emotion.dy * 0.99;
}

function moveAngers() {
  for (var i = 0; i < angers.length; ++i) {
    for (var j = 0; j < angers.length; ++j) {
      if (i == j) continue;
      
      var towardsVector = towards(angers[i], angers[j]);
      if (Math.abs(towardsVector.x) < 32 && Math.abs(towardsVector.y) < 32) {
        // too close
        angers[i].dx = -angers[i].dx * 10;
        angers[i].dy = -angers[i].dy * 10;
      } else {
        angers[i].dx += towardsVector.x * 0.001;
        angers[i].dy += towardsVector.y * 0.001;
      }
    }
  }
}

function moveJoys() {
  for (var i = 0; i < joys.length; ++i) {
    if (frameCount % 60 == 0) {
      joys[i].dx = (Math.random() - 0.5) * 10;
      joys[i].dy = (Math.random() - 0.5) * 10;
      joys[i].dr = (Math.random() - 0.5) * 0.2;
    }   
  }
}

function moveLonelys() {
  for (var i = 0; i < lonelys.length; ++i) {
    for (var j = 0; j < lonelys.length; ++j) {
      if (i == j) continue;
      
      var towardsVector = towards(lonelys[i], lonelys[j]);
      lonelys[i].dx = -towardsVector.x * 0.001;
      lonelys[i].dy = -towardsVector.y * 0.001;
    }
  }
}

function towards(a, b) {
  return {x: b.x - a.x, y: b.y - a.y};
}

function drawUI() {
  if (selectedEmotion == "joy") {
    background(252, 204, 249);
  } else if (selectedEmotion == "anger") {
    background(252, 227, 204);
  } else if (selectedEmotion == "lonely") {
    background(204, 240, 252);
  }
  textSize(24);
  stroke(255);
  drawAngerButton();
  drawJoyButton();
  drawLonelyButton();
}

function mouseClicked() {
  var x = mouseX;
  var y = mouseY;
  if (x > 8 && x < 128) {
    if (y > 8 && y < 32) {
      selectedEmotion = "anger";
      return false;
    } else if (y > 48 && y < 80) {
      selectedEmotion = "joy";
      return false;
    } else if (y > 88 && y < 120) {
      selectedEmotion = "lonely";
      return false;
    }
  }
  createEmotionAt(x, y);
}

function createEmotionAt(x, y) {
  console.log("creating emotion " + selectedEmotion + " at " + x + ", " + y);
  if (selectedEmotion == "anger") {
    var image = angerImages[Math.floor(Math.random()*angerImages.length)];
    angers.push({x: x, y: y, dx: 0, dy: 0, image: image});
  } else if (selectedEmotion == "joy") {
    var image = joyImages[Math.floor(Math.random()*joyImages.length)];
    joys.push({x: x, y: y, dx: 0, dy: 0, image: image, r: 0, dr: 0})
  } else if (selectedEmotion == "lonely") {
    var image = lonelyImages[Math.floor(Math.random()*lonelyImages.length)];
    lonelys.push({x: x, y: y, dx: 0, dy: 0, image: image});
  }
}

function drawAngerButton() {
  fill(20);
  rect(8, 8, 128, 32);
  fill(200);
  text("Anger", 8, 8, 128, 32);
}

function drawJoyButton() {
  fill(20);
  rect(8, 48, 128, 32);
  fill(200);
  text("Joy", 8, 48, 128, 32);
}

function drawLonelyButton() {
  fill(20);
  rect(8, 88, 128, 32);
  fill(200);
  text("Loneliness", 8, 88, 128, 32);
}