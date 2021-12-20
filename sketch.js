var bg, bgImg;
var shooter,shooterImg,shooterShooting,shooterImg2;
var zombie,zombieImg,zombieGroup;
var heartImg1,heartImg2,heartImg3,heart2,heart2,heart3,score;
var bullets = 12;
var gameState = "play";
var bulletsGroup;


function preload () {
  bgImg = loadImage("assets/bg.jpeg");
  shooterImg = loadImage("assets/shooter_1.png");
  shooterImg2 = loadImage("assets/shooter_2.png");
  shooterShooting = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie.png");
  heartImg1 = loadImage("assets/heart_1.png");
  heartImg2 = loadImage("assets/heart_2.png");
  heartImg3 = loadImage("assets/heart_3.png");

}

function setup () {
   createCanvas(windowWidth,windowHeight);

   // adding a background image
   bg = createSprite(displayWidth/2 - 20,displayHeight/2 - 20,590,700);
   bg.addImage(bgImg);
   bg.scale = 0.90;

   // creating player/shooter sprite
   shooter = createSprite(displayWidth - 1150,displayHeight - 300,50,50);
   shooter.addImage(shooterImg);
   shooter.scale = 0.4;
   shooter.setCollider("circle",0,0,80);
   shooter.debug = true

   zombieGroup = new Group();
   bulletsGroup = new Group();

   heart1 = createSprite(displayWidth - 140,displayHeight - 700,50,50);
   heart1.addImage(heartImg1);
   heart1.scale = 0.3;
   heart1.visible = false;

   heart2 = createSprite(displayWidth - 230,displayHeight - 700,50,50);
   heart2.addImage(heartImg2);
   heart2.scale = 0.3;
   heart2.visible = false;

   heart3 = createSprite(displayWidth - 290,displayHeight - 700,50,50);
   heart3.addImage(heartImg3);
   heart3.scale = 0.3;

}

function draw () {
  background(0);

  if (gameState === "play") {

     // moving the shooter in different direction
  if (keyDown("UP_ARROW") || touches.length > 0) {
    shooter.y = shooter.y-30 ;
  }

  if (keyDown("DOWN_ARROW")) {
    shooter.y = shooter.y+30;
 }

 if (keyWentDown("RIGHT_ARROW")) {
  shooter.x = shooter.x+30 ;
  shooter.addImage(shooterImg2);
}

if (keyWentUp("RIGHT_ARROW")) {
  shooter.x = shooter.x+30 ;
  shooter.addImage(shooterImg);
}

if (keyDown("LEFT_ARROW")) {
  shooter.x = shooter.x-30 ;
}

if (keyWentDown("SPACE")) {
  bullets = createSprite(shooter.x + 10,shooter.y - 30,15,9);
  bullets.velocityX = 50;
  bulletsGroup.add(bullets);
  shooter.depth = bullets.depth;
  shooter.depth = shooter.depth + 3 ;
  shooter.addImage(shooterShooting);
  shooterShooting.scale = 0.4;
  bullets = bullets - 1;
}

else if (keyWentUp("SPACE")) {
  shooter.addImage(shooterImg);
}

if (bullets == 0){
  gameState = "bullets";
}

// destroing the zombie when touching the shooter
  if (zombieGroup.isTouching(shooter)) {
     for (var i=0; i < zombieGroup.length ; i++){
       if (zombieGroup[i].isTouching(shooter)){
         zombieGroup[i].destroy();
       }
     }
  }

  // destroing the zombie when touching the bullets
  if (zombieGroup.isTouching(bulletsGroup)) {
    for (var i=0; i < zombieGroup.length ; i++){
      if (zombieGroup[i].isTouching(bulletsGroup)){
        zombieGroup[i].destroy();
        bulletsGroup.destroyEach();
      }
    }
 }

  }

  // calling the enemy function
  enemy();
  drawSprites();

if (gameState == "bullets") {
   textSize(40);
   text("You'r out of Bullets :(",450,450);
   bulletsGroup.destroyEach();
   zombieGroup.destroyEach();
   shooter.destroy();
}

} 

// spawning zombies at random positions
function enemy (){
if (frameCount % 50 === 0) {
  zombie = createSprite(random(500,1100),random(100,500),70,70);
  zombie.addImage(zombieImg);
  zombie.scale = 0.2;
  zombie.velocityX = -6;
  zombie.debug = true;
  zombie.setCollider("rectangle",0,0,400,400)
  zombie.lifetime = 400;
  zombieGroup.add(zombie);
}
}
