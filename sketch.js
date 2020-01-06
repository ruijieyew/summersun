var song;
var fft;
let a = 0;

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
  createCanvas(500,500);
}


function draw() {
  if (song.isPlaying()) {
    a = a + 0.05;
  }
    noStroke();
  from = color(31,151,196);
  to = color(178,135,169);
  c1 = lerpColor(from, to,map(a, 0, 190, 0, 1));
  background(c1);
  fill(255);
  noStroke();
  var spectrum = fft.analyze();
  noStroke();
  translate(width / 2, 0.47*a);
  textSize(13);
  textFont(fontBold);
  textAlign(CENTER);
  var speed = 1;
  var characterSpace = 15;
  var lyrics = ["summer sun", "vincent chiang","when I see you far away","you drift in like the summer sun", 
                "know that you're the one", "but by the time I see", 
                "you're not here for me, for me", "so do me no wrong","if I've got no one",
                "at least I'll have the summer sun", "shining on me", "bask in glory", "feel the warmth of the summer sun", "boy if you could see what you've done to me","I will always remember that you're the one in my heart", "you cry in this summer sun", 
                "I leave you here to cry", "cry", "cry"]
  for (var i = 0; i < lyrics.length; i++) {
    text(lyrics[i],0, (height - (speed*a + 10)) + i*characterSpace)
  }
  for (var i = 0; i < spectrum.length; i++) {
    var angle = map(i, 0, spectrum.length, 0, 360);
    var amp = spectrum[i];
    var r = map(amp, 0, 100, 50, 80);
    fill(247-0.15*a,215-0.35*a,83-0.15*a);
    var x =  1.5*r * cos(angle);
    var y = 1.5*r * sin(angle);
    stroke(247-0.15*a,215-0.35*a,83-0.15*a);
    line(0, 0, x, y);
    noStroke();
  }
}
