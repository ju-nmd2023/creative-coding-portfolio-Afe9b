function setup() {
  createCanvas(1000, 1000);
  strokeWeight(2);
  rectMode(CENTER);
  noLoop();
}

const randomDisplacement = 10;
const rotateMultiplier = 10;
const offset = 0;
const squareSize = 40;

function drawSquare(w, h) {
  rect(0, 0, w, h);
}

function draw() {
  background(0, 0, 11);

  const size = min(width, height);

  //Cite ChatGPT https://chatgpt.com/share/68c30a52-2b6c-8007-9b02-59ab28fe2b8a
  for (let xPos = squareSize; xPos <= size - squareSize; xPos += squareSize) {
    for (let yPos = squareSize; yPos <= size - squareSize; yPos += squareSize) {
      const rowFactor = yPos / size;
      const colFactor = xPos / size;

      const rotDeg =
        random(-rotateMultiplier, rotateMultiplier) * (rowFactor + colFactor);
      const rotateAmt = radians(rotDeg);

      const translateAmt =
        random(-randomDisplacement, randomDisplacement) * rowFactor;

      push();
      translate(xPos + translateAmt + offset, yPos + translateAmt + offset); // Cite https://generativeartistry.com/tutorials/cubic-disarray/
      rotate(rotateAmt);

      // Random color on Square
      /*stroke(random(255, 255), random(50, 200), random(100, 255));
      if (random() < 0.3) {
        fill(random(255), random(255), random(255), 120); // Random Fill
      } else {
        noFill();
      }*/

      drawSquare(squareSize, squareSize);
      pop();
    }
  }
}
