var song;
var fft;

var volhistory = [];

function preload() {
  song = loadSound('assets/summersun.mp3');
  fontBold = loadFont('assets/Didot-HTF-B42-Bold.ttf');
}

function setup() {
  song.play();
  // create a new Amplitude analyzer
  fft = new p5.FFT();
  song.amp(0.2);
  // Patch the input to an volume analyzer
  createCanvas(500, 500);
}

function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
  } else {
    song.play();
  }
}

function draw() {
  background(239,206,206);
  fill(255);
  noStroke();
  var spectrum = fft.analyze();
  noStroke();
  translate(width / 2, height / 1.2);
  for (var i = 0; i < spectrum.length; i++) {
    var angle = map(i, 0, spectrum.length, 0, 360);
    var amp = spectrum[i];
    var r = map(amp, 0, 100, 50, 80);
    fill(237,121,71);
    var x = 2.95 * r * cos(angle);
    var y = 3 * r * sin(angle);
    stroke(237,121,71);
    line(0, 0, x, y);
    noStroke();
  }
  //translate(width / 2, height / 2);
  noStroke();
  rectMode(CORNER);
  fill(219,186,186);
  rect(-250, -30, 500, 30);
  fill(180,190,200);
  rect(-250, -40, 500, 10);
  fill(119,147,194);
  rect(-250, -20, 500, 30);
  fill(175,199,219);
  rect(-250, -5, 500, 50);
  fill(25, 45, 70);
  rect(-250, 40, 500, 44);
  fill(40, 60, 94);
  fill(255);
}