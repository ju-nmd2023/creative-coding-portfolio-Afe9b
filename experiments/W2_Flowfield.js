//cite https://www.youtube.com/watch?v=1-QXuR-XX_s
//init flow function from ChatGPT

let points = [];
let mult;

let r1, r2, g1, g2, b1, b2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noiseDetail(1);
  blendMode(ADD);

  initFlow();
}

function initFlow() {
  background(0);
  points = [];

  const density = 30;
  const space = width / density;

  for (let x = 0; x < width; x += space) {
    for (let y = 0; y < height; y += space) {
      const p = createVector(x + random(-10, 10), y + random(-10, 10));
      points.push(p);
    }
  }

  shuffle(points, true);

  r1 = random(255);
  r2 = random(255);
  g1 = random(255);
  g2 = random(255);
  b1 = random(255);
  b2 = random(255);

  // “styrka”
  mult = random(0.002, 0.01);
}

function draw() {
  noStroke();

  const maxCount = Math.min(frameCount * 5, points.length);
  const cx = width / 2;
  const cy = height / 2;

  for (let i = 0; i < maxCount; i++) {
    const r = map(points[i].x, 0, width, r1, r2);
    const g = map(points[i].y, 0, height, g1, g2);
    const b = map(points[i].x, 0, width, b1, b2);
    const d = dist(cx, cy, points[i].x, points[i].y);
    const alpha = map(d, 0, 350, 255, 0, true);

    fill(r, g, b, alpha);

    const angle = map(
      noise(points[i].x * mult, points[i].y * mult),
      0,
      1,
      0,
      720
    );
    points[i].add(createVector(cos(angle), sin(angle)));

    if (d < 350) {
      ellipse(points[i].x, points[i].y, 1);
    }
  }
}

function mouseClicked() {
  initFlow(); // genereras nt bild vid klick
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initFlow();
}
