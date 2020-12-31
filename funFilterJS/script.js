var rainbowImage = null;
var grayImage = null;
var blImage = null;
var gcanvas = null;
var redImage = null;
var purpleImage=null;
var image;

function loadImage(){
 
  var ff = document.getElementById("fbutton");
  gcanvas = document.getElementById("can");
  doclear();
  image = new SimpleImage(ff);
  image.drawTo(can);
  
}
function doclear(){
  var context = gcanvas.getContext("2d");
  context.clearRect(0, 0, gcanvas.width, gcanvas.height);
  rainbowImage = null;
  grayImage = null;
  blImage = null;
  redImage = null;
  image = null;
}

function ok(theImage) {
  if (theImage == null) {
     console.log("is null");
     return false;
  }
  var s = image.getWidth() + " x " + image.getHeight();
  var dim = document.getElementById("dims");
  
  dim.innerHTML = s;
  if (! theImage.complete()) {
    return false;
  }
  return true;
}

function red() {
    redImage = copyImage(image);
    //console.log("red: "+redimage.getHeight());
    redImage = makeRed(redImage);
    redImage.drawTo(gcanvas);
}
function gray() {
    grayImage = copyImage(image);
    grayImage = makeGray(grayImage);
    grayImage.drawTo(gcanvas);
}

function rainbow(){
    rainbowImage = copyImage(image);
    rainbowImage = makeRainbow(rainbowImage);
    rainbowImage.drawTo(gcanvas);
}

function makeRainbow(theImage) {
  var h = theImage.getHeight();
  //return makeRed(theImage);
  var bands = Math.floor(h/7);
  var low = 0;
  var high = bands;
  for(var n=0; n < 7; n++) {
  for(var k=low; k <= high; k++){
    for(var x=0; x < theImage.getWidth(); x++) {
      var pix = theImage.getPixel(x,k);
      
      if (n == 0) {
        pix.setRed(255);
      }
      else if (n == 1) {
        pix.setRed(255);
        pix.setGreen(165);
      }
      else if (n == 2) {
        pix.setRed(255);
        pix.setGreen(255);
      }
      else if (n == 3) {
        pix.setGreen(255);
      }
      else if (n == 4) {
        pix.setBlue(255);
      }
      else if (n == 5) {
        pix.setRed(75);
        pix.setGreen(0);
        pix.setBlue(130);
      }
      else {
        pix.setRed(85);
        pix.setGreen(36);
        pix.setBlue(139);
      }
    } // x loop
  } // k loop
  low = high + 1;
  high = low + bands;
  if (high >= h) {
     high = h-1;
  }
  }
  return theImage;
}
  

function makeRed(theImage) {
  if (! ok(theImage)) {
    return theImage;
  }
  for(var pix of theImage.pixels()) {
    pix.setRed(255);
  }

  return theImage;
}

function makeGray(theImage) {
  if (! ok(theImage)) {
    return theImage;
  }

   for (var pix of theImage.pixels()){
    var total = pix.getGreen() + pix.getRed() + pix.getBlue();
    var avg = total/3;
    pix.setGreen(avg);
    pix.setBlue(avg);
    pix.setRed(avg);
  }
  return theImage;
}

function copyImage(image) {
  //return new SimpleImage(gcanvas);
  //console.log('copying image '+image.getWidth());
  var si = new   SimpleImage(image.getWidth(),image.getHeight());
  for(var pix of si.values()) {
    var x = pix.getX();
    var y = pix.getY();
    si.setPixel(x,y,image.getPixel(x,y));
  }
  return si;
}

function reset(){
  if (ok(image)){
    image.drawTo(gcanvas);
  }
}

function doblur() {
  blImage = copyImage(image);  
  if (ok(blImage)) {
    var radius = 20;
    blImage = blurImage(blImage, radius);
    blImage.drawTo(gcanvas);
  }
}

// blur by moving random pixels
function ensureInImage (coordinate, size) {
    // coordinate cannot be negative
    if (coordinate < 0) {
        return 0;
    }
    // coordinate must be in range [0 .. size-1]
    if (coordinate >= size) {
        return size - 1;
    }
    return coordinate;
}

function getPixelNearby (image, x, y, diameter) {
    var dx = Math.random() * diameter - diameter / 2;
    var dy = Math.random() * diameter - diameter / 2;
    var nx = ensureInImage(x + dx, image.getWidth());
    var ny = ensureInImage(y + dy, image.getHeight());
    return image.getPixel(nx, ny);
}


function blurImage (image, radius) {
    var output = new SimpleImage(image.getWidth(), image.getHeight());
    for (var pixel of image.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        if (Math.random() > 0.5) {
            var other = getPixelNearby(image, x, y, radius);
            output.setPixel(x, y, other);
        }
        else {
            output.setPixel(x, y, pixel);
        }
    }
    return output;
}
function purple() {
    purpleImage = copyImage(image);
    purpleImage = makePurple(purpleImage);
    purpleImage.drawTo(gcanvas);
}
function makePurple(theImage) {
    if (! ok(theImage)) {
       return theImage;
  }
  for(var pix of theImage.pixels()) {
    pix.setBlue(255);
  }
  
  return theImage;
}

