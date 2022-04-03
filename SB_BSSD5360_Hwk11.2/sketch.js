let fingers;

function setup() {
  createCanvas(420, 340, WEBGL);
  // specify multiple formats for different browsers
  //fingers = createVideo(['assets/fingers.mov', 'assets/fingers.webm']);
  fingers = createVideo(['assets/green_kaleidoscope.mp4']);
  //fingers = createCapture(VIDEO);
  fingers.size(420,340);
  fingers.loop();
  fingers.hide();
  noStroke();
  fill(0);
}

function draw() {
  background(255);
  
  fingers.loadPixels();
  //make stepsize (how many pixels to skip) be constant: every 4th pixel 
  const stepSize = 8;
  
  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      const i = y * width + x;
      const darkness = (255 - fingers.pixels[i * 4]) / 255;
      const radius = stepSize * darkness;
      
      //rgb code taken from bill murray project. 
      colorMode(RGB);      // set color mode to RGB
      let img = fingers;
      let index = (floor(x) + floor(y) * img.width) * 4;
      r = img.pixels[index];
      g = img.pixels[index + 1];
      b = img.pixels[index + 2];
      a = img.pixels[index + 3];
      
      colorMode(HSL, 360, 75, 50);  // set colorMode
      // now get the HSB equivilent
      hsb = RGBtoHSL(r, g, b);
      //hsb = rgbToHsl(r, g, b);
      
      //make homework HUE assignment alterations
      hsb[0] = (round(floor(hsb[0]/10)))*10;
    
      hsb=(hsb);
      fill(hsb);
      
      // rotate x y
      rotateX(radians(0));
      rotateY(radians(180));

      rect(x,y,radius+20, radius+20);
      
    }
  }
}

function RGBtoHSL(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    }
  
    // now derive the hue
    if (r >= g && g >= b)   h = 60 * ((g-b)/(r-b));
    if (g > r && r >= b)   h = 60 * (2-(r-b)/(g-b));
    if (g >= b && b > r)  h = 60 * (2+(b-r)/(g-r));
    if (b > g && g > r)  h = 60 * (4-(g-r)/(b-r));
    if (b > r && r >= g)   h = 60 * (4+(r-g)/(b-g));
    if (r >= b && b > g)   h = 60 * (6-(b-g)/(r-g));
  
    return [h, s*100, l*100];
 
}
