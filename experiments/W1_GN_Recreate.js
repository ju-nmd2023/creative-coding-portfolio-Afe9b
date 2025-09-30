function setup() {
  createCanvas(windowWidth, windowHeight); // canvas fyller hela fönstret
  strokeWeight(2);
  noFill();
  rectMode(CENTER);
  noLoop();
}

const randomDisplacement = 10;
const rotateMultiplier = 20;
const offset = 0;
const squareSize = 50;

function drawSquare(w, h) {
  rect(0, 0, w, h);
}

function draw() {
  background(255, 255, 255); // täcker alltid hela canvas

  const size = min(width, height);

  push();
  translate(width / 2 - size / 2, height / 2 - size / 2); // centrera bilden

  for (let xPos = squareSize; xPos <= size - squareSize; xPos += squareSize) {
    for (let yPos = squareSize; yPos <= size - squareSize; yPos += squareSize) {
      const rowFactor = yPos / size;

      const rotDeg = random(-rotateMultiplier, rotateMultiplier) * rowFactor;
      const rotateAmt = radians(rotDeg);

      const translateAmt =
        random(-randomDisplacement, randomDisplacement) * rowFactor;

      push();
      translate(xPos + translateAmt + offset, yPos + translateAmt + offset);
      rotate(rotateAmt);
      drawSquare(squareSize, squareSize);
      pop();
    }
  }

  pop();
}

//
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
