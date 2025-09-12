function setup() {
  createCanvas(1000, 1000);
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
  background(255, 130, 11);

  const size = min(width, height);

  for (let xPos = squareSize; xPos <= size - squareSize; xPos += squareSize) {
    for (let yPos = squareSize; yPos <= size - squareSize; yPos += squareSize) {
      const rowFactor = yPos / size;

      const rotDeg = random(-rotateMultiplier, rotateMultiplier) * rowFactor;
      const rotateAmt = radians(rotDeg);

      const translateAmt =
        random(-randomDisplacement, randomDisplacement) * rowFactor;

      push();
      translate(xPos + translateAmt + offset, yPos + translateAmt + offset); //Cite
      rotate(rotateAmt);
      drawSquare(squareSize, squareSize);
      pop();
    }
  }
}
