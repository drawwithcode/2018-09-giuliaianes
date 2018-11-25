var myLoc;
var myMap;
var canvas;
var mappa= new Mappa('MapboxGL', 'pk.eyJ1IjoiZ2l1bGlhaWFuZXMiLCJhIjoiY2pvcjBoYXpnMGFwbzNxcnZuaGtvemFvaSJ9.FTeqG_bjkuUmG0C_rYUVqw');
var orologioPiccolo;
var orologioGrande;
var spoon;
var selectPotter=false;
var showClock=false;
var showInfo=true;
var locationArray=[];

var naviglioLat=45.4522255;
var naviglioLong=9.1739692;

var duomoLat=45.4640976;
var duomoLong=9.1897378;

var citylifeLat=45.4779062;
var citylifeLong=9.1535882;

var poliLat=45.5048188;
var poliLong=9.1629839;

var gaeLat=45.4836578;
var gaeLong=9.1875139;

var castelloLat=45.4704762;
var castelloLong=9.1771438;

var teatroLat=45.4599483;
var teatroLong=9.15940188;

var polileoLat=45.4780943;
var polileoLong=9.226049;

var politecnico = {
  lat: poliLat,
  lng: poliLong,
  locAngle:45,
  locationName: 'Politecnico Bovisa'
}

var citylife = {
  lat: citylifeLat,
  lng: citylifeLong,
  locAngle:90,
  locationName: 'City Life'
}

var navigli = {
  lat: naviglioLat,
  lng: naviglioLong,
  locAngle:315,
  locationName: 'Naviglio Grande'
}

var gaeaulenti = {
  lat: gaeLat,
  lng: gaeLong,
  locAngle:180,
  locationName: 'Piazza Gae Aulenti'
}

var castellosforzesco = {
  lat: castelloLat,
  lng: castelloLong,
  locAngle:0,
  locationName: 'Castello Sforzesco'
}

var teatroscala = {
  lat: teatroLat,
  lng: teatroLong,
  locAngle:135,
  locationName: 'Teatro alla Scala'
}

var duomo = {
  lat: duomoLat,
  lng: duomoLong,
  locAngle:270,
  locationName: 'Duomo'
}

var polileo = {
  lat: polileoLat,
  lng: polileoLong,
  locAngle:225,
  locationName: 'Politecnico Leonardo'
}

var options = {
  lat: duomoLat,
  lng: duomoLong,
  zoom: 15,
  style: 'mapbox://styles/giuliaianes/cjovmfjqh2s8i2rpln1w346sd',
  pitch: 15 //degree
}

function preload(){
  orologioPiccolo = loadImage('./assets/orologioPiccolo.png');
  orologioGrande = loadImage('./assets/orologio.png');
  spoon = loadImage('./assets/cucchiaio.png');
  myLoc = getCurrentPosition();
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  locationArray = [duomo, politecnico, citylife, navigli, gaeaulenti, castellosforzesco, teatroscala, polileo];
  angleMode(DEGREES);
  /*locationArray.push(duomo);
  locationArray.push(politecnico);
  locationArray.push(citylife);
  locationArray.push(navigli);*/
}

function draw() {
  clear();
  if(showInfo){
    textSize(20);
    textAlign(CENTER);
    text('click on the clock to see\nthe closest place to you', 150, height/2+150);
    fill(0,0,0);
  }

  var point = myMap.latLngToPixel(myLoc.latitude, myLoc.longitude);
  ellipse(point.x, point.y, 20);
  image(orologioPiccolo, 50, 550);
  if(showClock){
    showInfo=false;
    // manage hands
    image(orologioGrande, width/2-orologioGrande.width/2, height/2-orologioGrande.height/2);
    var closer = getCloser(myLoc, locationArray);

    // manage locations
    for(var i=0; i<=locationArray.length-1; i++) {
      push();
      fill(104, 97, 86);
      textSize(20);
      textFont('UnifrakturCook');
      translate(width/2+180*sin(locationArray[i].locAngle), height/2-200*cos(locationArray[i].locAngle));
      textAlign(CENTER);
      var total = calcDistanceKm(myLoc, locationArray[i]);
      //total = total.toFixed(1) // 41.8
      //text(locationArray[i].locationName + '\n' + calcDistanceKm(myLoc, locationArray[i]) + ' Km', 0, 0);
      text(locationArray[i].locationName + '\n' + total.toFixed(2) + ' Km', 0, 0);
      pop();
    }

    // ron hand
    push();
    translate(width/2, height/2);
    rotate(closer.locAngle);
    imageMode(CENTER);
    image(spoon, 0, 0);
    pop();

    // potter hand

  }
  fill('black');
  //text(myLoc.latitude, 100, 100);

}

function mousePressed() {
  if(mouseX>=50&&mouseX<=150&&mouseY>=550&&mouseY<=650){
    showClock=cambio(showClock);
    showInfo=cambio(showInfo);
  }
}
 function cambio(valueToSwitch) {
   if(valueToSwitch) {
     return false;
   }  else {
     return true;
   }
 }

 function calcDistanceGeometric(a, b) {
   var distanceBetweenAandB = sqrt(pow((a.latitude-b.lat), 2)+pow((a.longitude-b.lng), 2));
   return distanceBetweenAandB;
 }

 function calcDistanceKm(a, b) {
    var distance=calcGeoDistance(a.latitude, a.longitude, b.lat, b.lng, 'km');
    return distance;
 }

 function getCloser(currentPosition, possibleLocations) {
   var closerDistance;
   var closerElement;
   for(var i=0; i<=(possibleLocations.length-1); i++) {
     //var distance = sqrt(pow((currentPosition.latitude-possibleLocations[i].lat), 2)+
     //pow((currentPosition.longitude-possibleLocations[i].lng), 2));
     var distance = calcDistanceKm(currentPosition, possibleLocations[i]);
     if(closerDistance==undefined || distance<closerDistance){
       closerDistance=distance;
       closerElement=possibleLocations[i];
     }
   }
   return closerElement;
 }
