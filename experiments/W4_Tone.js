//cite https://www.youtube.com/watch?v=vmhRlDyPHMQ
let synth;
let audioStarted = false;

let t = 0;
let isAnimating = false;
let framesLeft = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  //synth
  synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const reverb = new Tone.Reverb({ decay: 2.5, wet: 0.3 }).toDestination();
  synth.connect(reverb);
}

function draw() {
  background(0);

  //
  if (isAnimating) {
    t += 1;
    framesLeft--;
    if (framesLeft <= 0) {
      isAnimating = false;
    }
  }

  rotateX(60);

  noFill();

  for (let i = 0; i < 20; i++) {
    const r = map(sin(t / 2), -1, 1, 100, 255);
    const g = map(i, 0, 20, 0, 255);
    const b = map(cos(t), -1, 1, 255, 0);
    stroke(r, g, b);

    beginShape();
    for (let j = 0; j <= 360; j += 10) {
      const rad = i * 8;
      const x = rad * cos(j);
      const y = rad * sin(j);

      const z = sin(t * 2 + i * 10) * 50;
      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}

// Klick = spela ljud + kort animation
function mousePressed() {
  if (!audioStarted) {
    Tone.start();
    audioStarted = true;
  }

  // Ljud Cite Co-pilot
  const notes = ["C", "D", "E", "G", "A"];
  const octave = floor(map(mouseY, 0, height, 6, 3));
  const noteName =
    notes[floor(map(mouseX, 0, width, 0, notes.length)) % notes.length];
  const note = `${noteName}${octave}`;
  const velocity = map(mouseY, 0, height, 0.9, 0.3);
  synth.triggerAttackRelease(note, "8n", Tone.now(), velocity);

  // Starta kort animation
  framesLeft = 60;
  isAnimating = true;
}
