var song;
var fft;
let a = 0;
var songEnded = false;

var volhistory = [];

function preload() {
  song = loadSound('assets/summersun.mp3');
  fontBold = loadFont('assets/Didot-HTF-B42-Bold.ttf');
}

function setup() {
  a = 0;
  // create a new Amplitude analyzer
  fft = new p5.FFT();
  song.amp(0.2);
  var cnv = createCanvas(500,500);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}


function mousePressed(){
  if (!song.isPlaying()){
    song.play();
  }
  else if(song.currentTime() >= song.duration()){
    setup();
  }
}

function draw() {
  noStroke();
  from = color(31,151,196);
  to = color(178,135,169);
  c1 = lerpColor(from, to,map(song.currentTime(), 0, 113.73133786848072, 0, 1));
  background(c1);
  fill(255);
  var spectrum = fft.analyze();
  noStroke();
  translate(width / 2, song.currentTime());
  textSize(15);
  textFont(fontBold);
  textAlign(CENTER);
  var speed = 1.67;
  var characterSpace = 18;
  var lyrics = ["summer sun", "vincent chiang","when I see you far away","you drift in like the summer sun", 
                "know that you're the one", "but by the time I see", 
                "you're not here for me, for me", "so do me no wrong","if I've got no one",
                "at least I'll have the summer sun", "shining on me", "bask in glory", "feel the warmth of the summer sun", "boy if you could see what you've done to me","I will always remember that you're the one in my heart", "you cry in this summer sun", 
                "I leave you here to cry", "cry", "cry"]
  for (var i = 0; i < lyrics.length; i++) {
    text(lyrics[i],0, 215+15*i-song.currentTime());
  }
  for (var i = 0; i < spectrum.length; i++) {
    var angle = map(i, 0, spectrum.length, 0, 360);
    var amp = spectrum[i];
    var r = map(amp, 0, 100, 50, 80);
    fill(247-0.1*song.currentTime(),215-0.25*song.currentTime(),83-0.1*song.currentTime());
    var x =  1.5*r * cos(angle);
    var y = 1.5*r * sin(angle);
    stroke(247-0.1*song.currentTime(),215-0.25*song.currentTime(),83-0.1*song.currentTime());
    line(0, 0, x, y);
    noStroke();
  }
}
