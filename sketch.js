var PLAY=2;
var END=1;
var SERVE=0;
var gameState=SERVE;
var gifts;
var ground,groundImage;

function preload(){
  groundImage=loadImage("ground.png");
  fishImage=loadImage("fish.png");
  foodImage=loadImage("food.png");
  obstacleImage=loadImage("shark.png");
  startImage=loadImage("icon.jpg");
  ground1Image=loadImage("starting background.jpg");
  gameoverImage=loadImage("gameover1.png");
  restartImage=loadImage("restart1.png");
  homeImage=loadImage("home.png");
}


function setup() {
  createCanvas(600, 600);
  ground = createSprite(350,400,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.scale=1.4;
  ground.velocityX=-5;
   
    start=createSprite(300,500,100,100);
    start.addImage(startImage);
    start.scale=0.6;

   ground1=createSprite(300,200,100,100);
   ground1.addImage(ground1Image);
   ground1.scale=0.3;
  
  restart = createSprite(300,400);
      restart.addImage(restartImage);
      restart.scale=0.2;
  
      gameover = createSprite(300,300);
      gameover.addImage(gameoverImage);
      gameover.scale=0.7;
  
   home = createSprite(550,70);
      home.addImage(homeImage);
      home.scale=0.4;
  
  
  fish= createSprite(110,130,20,50);
  fish.addImage("fish", fishImage);
  fish.scale=0.2;
  obstaclesGroup=new Group();
  foodGroup=new Group();
  gifts=0;
}

function draw() {
  background("blue");
   if(gameState==SERVE){
    gifts=0;
    ground.visible=false;
    fish.visible=false;
   obstaclesGroup.destroyEach();
    ground1.visible=true;
    start.visible=true;
     restart.visible = false;
      gameover.visible = false;
      foodGroup.destroyEach();
     home.visible=false;
    
    if(mousePressedOver(start)){
      gameState=PLAY;
      
    }
  }
  else if(gameState==PLAY){
    
    ground.visible=true;
      ground1.visible=false;
     restart.visible = false;
      gameover.visible = false;
      fish.visible=true;
      start.visible=false;
    home.visible=true;
      ground.velocityX=-5;
   if(ground.y>300){
    ground.y=200;
  }
  
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
  
  if(keyDown("up_arrow")){
    fish.y=fish.y-6;
  }
  
  
  if(keyDown("down_arrow")){
    fish.y=fish.y+6;
  }
  if(foodGroup.isTouching(fish)){
    foodGroup.destroyEach();
    gifts=gifts+1;
  }
  if(obstaclesGroup.isTouching(fish)){
    gameState=END;
   }
   }
   if(gameState==END){
     gifts=0;
      obstaclesGroup.destroyEach();
     foodGroup.destroyEach();
     home.visible=false;
      fish.destroy();
      ground.velocityX = 0;
      fish.velocityY = 0;
      fish.velocityX=0;
      restart.visible=true;
     gameover.visible = true;
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  spawnobstacles();
  spawnfood();
   if(mousePressedOver(home)) {
      gameState=SERVE;
     
    }
  drawSprites();
  
  fill("blue");
  textSize(25);
  text("Count of Food eaten:"+gifts,10,550);
}
function reset(){
  gameState=PLAY;
  gameover.visible=false;
  restart.visible=false;
  ground.velocityX=-3;
  fish= createSprite(110,130,20,50);
  fish.addImage("fish", fishImage);
  fish.scale=0.2;
  
  
}
function spawnobstacles(){
  if(frameCount%250==0){
    var obstacle=createSprite(500,300,400,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-5;
    obstacle.y=Math.round(random(120,300,480));
    obstaclesGroup.add(obstacle);
    obstacle.scale=0.4;
  }
}
function spawnfood(){
  if(frameCount%80==0){
    var food=createSprite(500,300,400,20);
   food.addImage(foodImage);
   food.velocityX=-5;
   food.y=Math.round(random(120,300,480));
   foodGroup.add(food);
   food.scale=0.09;
  }
}