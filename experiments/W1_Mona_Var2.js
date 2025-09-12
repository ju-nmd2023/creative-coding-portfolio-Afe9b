/*function setup() {
  createCanvas(innerWidth, innerHeight);
  background(34, 39, 46);
}

function draw() {
  background(34, 39, 46, 40);
  noStroke();
  fill(108, 182, 255);

  push();
  translate(width / 2, height / 2);

  push();
  rotate(frameCount / 8);
  ellipse(25, 0, 50);
  pop();

  push();
  rotate(-frameCount / 10);
  ellipse(75, 0, 50);
  pop();

  push();
  rotate(frameCount / 12);
  ellipse(125, 0, 50);
  pop();

  push();
  rotate(-frameCount / 14);
  ellipse(175, 0, 50);
  pop();

  pop();
}*/

function setup() {
  createCanvas(500, 500);
}

const size = 100;
const layers = 10;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  //const half = size / 2;
  const variance = size / 20;
  noFill();
  //strokeWeight(5);
  //rectMode(CENTER);
  for (let i = 0; i < layers; i++) {
    if (Math.random() > 0.5) {
      continue;
    }
    const s = (size / layers) * i;
    const half = s / 2;
    strokeWeight(random(5, 20));
    beginShape();
    vertex(
      getRandomValue(x - half, variance),
      getRandomValue(y - half, variance)
    );
    vertex(
      getRandomValue(x + half, variance),
      getRandomValue(y - half, variance)
    );
    vertex(
      getRandomValue(x + half, variance),
      getRandomValue(y + half, variance)
    );
    vertex(
      getRandomValue(x - half, variance),
      getRandomValue(y + half, variance)
    );
    endShape(CLOSE);
    rect(x - half, y - half, s, s);
  }
}

function draw() {
  background(255, 255, 255);

  const bigSize = min(width, height);
  drawLayers(width / 2, height / 2, bigSize, layers);

  noLoop();
}
