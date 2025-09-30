// Cite https://www.youtube.com/watch?v=9nytdkUzgZ0

let imgBackground;
let segments = 12;
let angleStep;
let rotationSpeedBackground = 0.4;
let time = 0;
let radius = 10;
let textureRotationSpeed = 0.4;
let maxrotationAngle = 90;

let currentAngleBackground = 0;
let tintColor; // Change when click

function preload() {
  imgBackground = loadImage("star8.png");
}

function setup() {
  createCanvas(innerWidth, innerHeight, WEBGL);
  angleMode(DEGREES);
  angleStep = 360 / segments;
  noStroke();
  tintColor = color(255, 255, 255); // No Tint at start
}

function draw() {
  background(0);

  const { offsetX, offsetY } = computeOffsets();

  push();
  applyBackgroundRotation();

  for (let i = 0; i < segments; i++) {
    const textureRotation = computeTextureRotation(i);
    drawSegment(i, offsetX, offsetY, textureRotation);
  }

  pop();

  time += 1;
}

function computeOffsets() {
  const offsetX = cos(time) * radius;
  const offsetY = sin(time) * radius;
  return { offsetX, offsetY };
}

function computeTextureRotation(i) {
  return (
    (i % 2 === 0 ? 1 : -1) *
    maxrotationAngle *
    abs(sin(time * textureRotationSpeed))
  );
}

function applyBackgroundRotation() {
  rotate(currentAngleBackground);
  currentAngleBackground += rotationSpeedBackground;
}

function drawSegment(i, offsetX, offsetY, textureRotation) {
  push();
  rotate(i * angleStep);
  beginShape();

  tint(tintColor);

  texture(imgBackground);

  vertex(
    0,
    0,
    imgBackground.width / 4 + offsetX,
    imgBackground.height / 2 + offsetY
  );

  vertex(
    (width / 4) * cos(-angleStep / 2),
    (height / 4) * sin(-angleStep / 2),
    cos(textureRotation) * imgBackground.width,
    0
  );

  vertex(
    (width / 10) * cos(angleStep / 2),
    (height / 10) * sin(angleStep / 2),
    imgBackground.width,
    imgBackground.height * cos(textureRotation)
  );

  endShape(CLOSE);
  pop();
}

// Random color "tint" when click
function mousePressed() {
  tintColor = color(random(255), random(255), random(255));
}
