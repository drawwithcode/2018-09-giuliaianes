var myLoc;
var myMap;
var canvas;
var mappa= new Mappa('MapboxGL', 'pk.eyJ1IjoiZ2l1bGlhaWFuZXMiLCJhIjoiY2pvcjBoYXpnMGFwbzNxcnZuaGtvemFvaSJ9.FTeqG_bjkuUmG0C_rYUVqw');
var orologioPiccolo;
var orologioGrande;
var spoon;
var showClock=false;
imageMode(CENTER);

//angleMode(DEGREE);
//imageMode(CENTER);

var duomoLat=45.4640976;
var duomoLong=9.1897378;

var options = {
  lat: duomoLat,
  lng: duomoLong,
  zoom: 5,
  style: 'mapbox://styles/giuliaianes/cjovmfjqh2s8i2rpln1w346sd',
  pitch: 15 //degree
}

function preload(){
  orologioPiccolo = loadImage('./assets/orologioPiccolo.png');
  orologioGrande = loadImage('./assets/orologio.png');
  spoon = loadImage('./assets/spoon.png');
  myLoc = getCurrentPosition();



}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
}

function draw() {
  clear();
  fill(random(255),random(255),random(255));
  var point = myMap.latLngToPixel(duomoLat, duomoLong);
  ellipse(point.x, point.y, 20);
  image(orologioPiccolo, 50, 550);
  if(showClock){
    image(orologioGrande, width/2-orologioGrande.width/2, height/2-orologioGrande.height/2);
    //rotate(90);
    pushMatrix();
    rotate(PI / 4);
    translate(width/2, height/2);
    image(spoon, width/2, height/2);
    popMatrix();
  }
  fill('black');
  text(myLoc.latitude, 100, 100);
}

function mousePressed() {
  console.log("mouseX= "+mouseX);
  if(mouseX>=50&&mouseX<=150&&mouseY>=550&&mouseY<=650){
    showClock=cambio(showClock);
  }
}
 function cambio(valueToSwitch) {
   if(valueToSwitch) {
     return false;
   }  else {
     return true;
   }
 }
