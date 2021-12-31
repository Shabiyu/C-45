var bg , bgimg , spaceship , ssimg , alien , alien1 , alien2 , laser;
var alienGroup , laserGroup;
gamestate = "play";

var score = 0;

function preload(){
  bgimg = loadImage("./assets/bg.jpg");
  ssimg = loadImage("./assets/spaceship.png");
  alien1 = loadImage("./assets/alien1.png");
  alien2 = loadImage("./assets/alien2.png");
}

function setup() {
  createCanvas(1500, 700);

  bg = createSprite(750,350,1500,700);
  bg.addImage(bgimg);
  spaceship = createSprite(150,350);
  spaceship.addImage(ssimg);
  spaceship.scale = 0.75;

  alienGroup = new Group ();
  laserGroup = new Group ();
  
}

function draw() {
  background(180);
  drawSprites();

  fill (255);
  textSize(30);
  text("Score ="+ score , 1000 ,50);

  if(gamestate==="play"){
      if(keyDown(UP_ARROW)){
          spaceship.y-=5;
      
      }
      if(keyDown(DOWN_ARROW)){
        spaceship.y+=5;
    
    }
    if(keyDown("space")){
      releaselaser();

    }
    spawnAliens();

    laserGroup.isTouching(alienGroup,destroyalien);

    alienGroup.isTouching(spaceship,gameOver);
  }
}
function spawnAliens(){
  if(frameCount&150===0){
    var rand = Math.round(random(100,600));
    alien = createSprite(1500,rand,50,50);

    alien.velocityX = -4;
    var randImg = Math.round(random(1,2));
    switch(randImg){
      case 1:
      alien.addImage(alien1);
      break

      case 2:
      alien.addImage(alien2);
      break
    }
    alien.lifetime=400;
    alienGroup.add(alien);
  }
}
function releaselaser(){
  laser = createSprite(200,200,60,5);
  laser.y = spaceship.y;
  laser.shapeColor="red";
  laser.velocityX=10;
  laser.lifetime=150;

  laserGroup.add(laser);
}
function destroyalien(laser,alien){
  alien.destroy();
  laserGroup.destroyEach();

  score+=1;
}

function gameOver(){
  textSize(30);
  fill("white");
  text("GameOver",750,350);
}