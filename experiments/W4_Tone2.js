//cite https://www.youtube.com/watch?v=vmhRlDyPHMQ
let synth;
let audioStarted = false;

let t = 0;
let isAnimating = false;
let framesLeft = 0;

// Skala för melodin (pentatonisk  med slump)
const SCALE = ["C", "D", "E", "G", "A"];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  //synth + reverb
  synth = new Tone.PolySynth(Tone.Synth).toDestination();
  const reverb = new Tone.Reverb({ decay: 2.5, wet: 0.3 }).toDestination();
  synth.connect(reverb);
}

function draw() {
  background(0);

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

// Spela en kort, slumpad melodi
function playRandomMelody() {
  const now = Tone.now();
  let tAcc = 0; //

  // 5–9 toner, basoktav 3–5
  const steps = floor(random(4, 8));
  const baseOct = floor(random(3, 6));

  // Starta på slumpad skalposition
  let idx = floor(random(SCALE.length));

  for (let i = 0; i < steps; i++) {
    // Slumpad rytm (viktad mot 8:e)
    const durStr = random(["16n", "8n", "8n", "8n", "4n"]);
    const durSec = Tone.Time(durStr).toSeconds();

    // Små slumpade intervallrörelser
    idx = (idx + floor(random(-2, 3)) + SCALE.length) % SCALE.length;

    // Ibland hoppa upp en oktav för variation
    const octaveJump = random() < 0.15 ? 1 : 0;

    const noteName = SCALE[idx];
    const octave = baseOct + octaveJump;
    const note = `${noteName}${octave}`;

    // Velocity varierar lite
    const vel = random(0.4, 0.9);

    // Spela huvudtonen
    synth.triggerAttackRelease(note, durStr, now + tAcc, vel);

    // 25% chans på en samtidig "harmoni" (en tredje upp) med lägre velocity
    if (random() < 0.25) {
      const harmIdx = (idx + 2) % SCALE.length;
      const harmNote = `${SCALE[harmIdx]}${octave}`;
      synth.triggerAttackRelease(harmNote, durStr, now + tAcc, vel * 0.6);
    }

    tAcc += durSec;
  }
}

// Klick = spela melodi + kort animation
function mousePressed() {
  if (!audioStarted) {
    Tone.start();
    audioStarted = true;
  }

  // Spela en slumpad melodi vid klick
  playRandomMelody();

  // Starta kort animation
  framesLeft = 110;
  isAnimating = true;
}
