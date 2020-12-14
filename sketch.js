var trex ,trex_running,trex_collide,trex_died,trex_checkpoint,trex_jump;
 var edges;
 var g1,g1_image;
 var ing;
 var cloud,cloud_image ;
 var rand;
 var obstacle1,obstacle1_image;
 var rand2;
 var obstacle2_image,obstacle3_image,obstacle4_image,obstacle5_image,obstacle6_image;
 var score=0;
 var obstacle_group;
 var cloud_group;
 var gamestate="play";
 var gameover,gameover_display;
 var restart,restart_display;
 var message="hi";
 
 

function preload(){
   
  //makes the trex running animation
  trex_running = loadAnimation("trex1.png","trex3.png", "trex4.png");
  trex_collide = loadImage("trex_collided.png")
  
  trex_jump = loadSound("jump.mp3")
  trex_died = loadSound("die.mp3")
  trex_checkpoint = loadSound("checkPoint.mp3")

  
  //makes the ground moving animation
  g1_image = loadImage("ground2.png");
  
  //makes the clouds
  cloud_image = loadImage("cloud.png")
  
  //makes the obstacle images
  obstacle1_image = loadImage("obstacle1.png");
  obstacle2_image = loadImage("obstacle2.png");
  obstacle3_image = loadImage("obstacle3.png");
  obstacle4_image = loadImage("obstacle4.png");
  obstacle5_image = loadImage("obstacle5.png");
  obstacle6_image = loadImage("obstacle6.png");
  
  gameover_display = loadImage("gameOver.png");
  restart_display = loadImage("restart.png");
  
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //create a trex sprite
  trex = createSprite(50,windowHeight-60,20,50);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;
  trex.setCollider("circle",0,-15,60);
  trex.debug=false;
 // trex.addImage(trex_collide);
  
  //creates the ground 
  g1 = createSprite(600,windowHeight-20,windowWidth/2,10);
  g1.addImage("moving", g1_image);
  
  obstacle_group=new Group ();
  cloud_group=new Group ();
  
  gameover = createSprite(windowWidth/2,windowHeight/2,200,100);
  gameover.addImage("Gm",gameover_display);
  gameover.scale=0.8;
  
  restart = createSprite(windowWidth/2,windowHeight/2+60,200,100);
  restart.addImage("Re",restart_display);
  restart.scale=0.8;
  
  //creates edge sprites
  edges=createEdgeSprites();
}

function draw(){
  background("lightblue")
  trex.collide(g1);
  textSize(30);
  fill(230,101,247);
  text("♥𝓢𝓬𝓸𝓻𝓮 :❣" + score,400,30);
  console.log(message);
  
  if(gamestate=="play") {
  
    gameover.visible=false;
    restart.visible=false;

    console.log(trex.y)

    //makes the Trex jump
    
  if(touches.length>0|| keyDown("space")&& trex.y>windowHeight-50) {
   trex.velocityY=-11; 
   trex_jump.play(); 
   touches=[]; 
  }
    
  if(score%100==0 && score>0) {
  trex_checkpoint.play();
  }  
  
  //Gives the trex gravity
  trex.velocityY=trex.velocityY+0.5;
  
  g1.velocityX=-3;
    
  score=score+Math.round(getFrameRate()/60);
    
    g1.velocityX=g1.velocityX+1;
  
  //Makes the illusion of infinite ground
  if (g1.x<800) {
    g1.x=900; 
  }
    
   clouds();
  
  obstacles();  
  if(trex.isTouching(obstacle_group)) {
  gamestate="end";
  trex_died.play();  
  }
}//play state ends
  
  else if(gamestate=="end") {
  trex.changeImage(trex_collide);
  g1.velocityX=0;
  obstacle_group.setVelocityXEach(0);
  cloud_group.setVelocityXEach(0);
  cloud_group.setLifetimeEach(-1);
  obstacle_group.setLifetimeEach(-1);
  gameover.visible=true;
  restart.visible=true;
  if(mousePressedOver(restart)) {
  playagain();
  }  
  
  }//end of else if

  drawSprites();
  
}//end of function draw

function clouds () {
if(frameCount%120==0) {
  cloud = createSprite(windowWidth+20,50,20,30);
  cloud.addImage(cloud_image);
  cloud.scale=0.2;
  cloud.velocityX=-2;
  rand=Math.round(random(10,700))
  cloud.y=rand
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
  console.log("cloud-"+cloud.depth);
  console.log("trex-"+trex.depth);
  cloud.lifetime=1000;
  cloud_group.add(cloud);
   }//end of if loop
}//end of function clouds

function obstacles () {
  
if(frameCount%180==0) {
   
  obstacle1=createSprite(windowWidth+20,windowHeight-40,20,60);
  obstacle1.velocityX=-3;
  obstacle1.addImage(obstacle1_image);
  rand2=Math.round(random(1,6));
  obstacle1.scale=0.5;
  //obstacle1.velocityX=obstacle1.velocityX+1;
  
  obstacle1.velocityX=-(3+score/100);
  
  switch(rand2) {
    case 1:obstacle1.addImage(obstacle1_image)
      break
    case 2:obstacle1.addImage(obstacle2_image)
      break
    case 3:obstacle1.addImage(obstacle3_image)
      break
    case 4:obstacle1.addImage(obstacle4_image)
      break
    case 5:obstacle1.addImage(obstacle5_image)
      break
    case 6:obstacle1.addImage(obstacle6_image)
      break
    default:break
  }//End of switch loop
  obstacle1.lifetime=1000;
  obstacle_group.add(obstacle1);
  
 }//end of if loop
  
}//end of Function obstacles
  
 function playagain() {
 gamestate="play";
 gameover.visible=false;  
 restart.visible=false; 
 obstacle_group.destroyEach();  
 cloud_group.destroyEach();
 score=0;  
 } 