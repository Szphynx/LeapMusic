/*
    Capture hands
*/
var pointX;
var pointY;
var pointZ;
var graph = new Array(3);
for (var i=0; i<graph.length; i++){
    graph[i] = new Array();
}
var saveFlag = false;
var newFlag = false;
var loadFlag = false;
//var swipeDirection = "";

function captureLeapmotion(){
    var controller = new Leap.Controller();
    // get position of tip
    controller.on('connect', function(){
        setInterval(function(){
            var frame = controller.frame();
            if (frame.pointables.length >0){
                tipPos2Array(frame.pointables[1].tipPosition);
            }
        }, 16); // about 60FPS
    });
//    // get gesture
//    controller.on("gesture", function(gesture){
//        if(gesture.type == "swipe") {
//          var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
//          if(isHorizontal){
//              if(gesture.direction[0] > 0){
//                  //swipeDirection = "right";
//                  newFlag = true;
//              } else {
//                  //swipeDirection = "left";
//              }
//          } else { //vertical
//              if(gesture.direction[1] > 0){
//                  //swipeDirection = "up";
//                  saveFlag = true;
//              } else {
//                  //swipeDirection = "down";
//                  loadFlag = true;
//              }
//          }
//          //console.log(swipeDirection)
//       }
//    });
    controller.connect();
}

function tipPos2Array(vector, digits) {
    if (typeof digits === "undefined") {
        digits = 1;
    }
    pointX = 1000 + 4.0 * vector[0].toFixed(digits);
    pointY = 1300 - 4.0 * vector[1].toFixed(digits);
    pointZ = -20 - 0.5 * vector[2].toFixed(digits);
}

/*
    Draw image with P5.js
*/
var pointer;
//var lines;
var reverb;
var p;
var tempC = 'red';

function preload() {
    soundFormats('mp3', 'wav');
    sKick = loadSound('sounds/kicks/baroque-kick.wav');
    sBrassSd = loadSound('sounds/snares/brass-sd2.wav');
    sHat = loadSound('sounds/hats/new_closed_hat.wav');

}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    pointer = new ball(20);
//    lines = new handWriting();
    captureLeapmotion();
    //s = createSprite(200, 200, 100, 100);
    p = new pad(180, 90, 90, 270, sKick, 'red');
    p1 = new pad(270, 90, 90, 270, sBrassSd, 'yellow');
    p2 = new pad(360, 270, 270, 90, sHat, 'blue'); //hat
    p3 = new pad(630, 90, 90, 270, sBrassSd, 'yellow');
    p4 = new pad(720, 90, 90, 270, sHat, 'blue');//hat
    p5 = new pad(720, 360, 279, 90, sBrassSd, 'yellow');
    p6 = new pad(720, 450, 90, 270, sKick, 'red');
    p7 = new pad(360, 450, 270, 90, sBrassSd, 'yellow');
    p8 = new pad(180, 450, 90, 270, sKick, 'red');
    //reverb = new p5.Reverb();
    //reverb.process(sBrassSd, 3, 2);
}


function draw() {
    background(0);
    pointer.move();

    p.display();
    p1.display();
    p2.display();
    p3.display();
    p4.display();
    p5.display();
    p6.display();
    p7.display();
    p8.display();
    p.play();
    p1.play();
    p2.play();
    p3.play();
    p4.play();
    p5.play();
    p6.play();
    p7.play();
    p8.play();
    
    
    pointer.display();
//    lines.update();
//    lines.display();
    
//    if(saveFlag){
//        saveFlag = false;
//        saveFile();
//    } else if (loadFlag){
//        loadFlag = false;
//        clearFile();
//        loadFile();
//    }
//    if (newFlag) {
//        newFlag = false;
//        clearFile();
//    }
    
    //drawSprites();
    
}

function ball(tempDiameter){
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.diameter = tempDiameter;
    this.pressed = false;
    
    this.move = function(){
        this.x = pointX;
        this.y = pointY;
        this.z = pointZ;
        if(this.z > 0){
            this.pressed = true;
        } else {
            this.pressed = false;
        }
    }
    
    this.display = function(){
        if(this.pressed){
            fill(color(0, 255, 0, 200));
            this.diameter = pointZ/2 + tempDiameter;
        } else {
            fill(color(0, 255, 0, 50));
            this.diameter = tempDiameter;
        }
        noStroke();
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }
}

function pad(tempX, tempY, tempBoxWidth, tempBoxHeight, tempSoundFile, tempColor){
    this.x = tempX;
    this.y = tempY;
    this.boxWidth = tempBoxWidth;
    this.boxHeight = tempBoxHeight;
    this.sound = tempSoundFile;
    this.color = tempColor;
    
    this.pointerIsOver = false;
    
    this.display = function(){
        fill(this.color);
        rect(this.x, this.y, this.boxWidth, this.boxHeight);
    }
    
    this.play = function(){
        if(pointer.pressed
           && this.x < pointX && this.x + this.boxWidth > pointX 
           && this.y < pointY && this.y + this.boxHeight > pointY){
            if (!this.pointerIsOver){
                //soundFile.play();
                this.sound.play();
            }
            this.pointerIsOver = true;
        } else {
            this.pointerIsOver = false;
        }
    }
    
}


