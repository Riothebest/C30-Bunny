const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var rope;
var fruit;
var constraintlink; 
var backgroundImg, fruitImg, bunnyImg1;
var bunny;
var button;

function preload()
{
  backgroundImg = loadImage("background.png");
  fruitImg = loadImage("melon.png");
  bunnyImg1 = loadImage('Rabbit-01.png');

}
function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);

  textSize(50)

  ground = new Ground(250,690,500,20);

  rope= new Rope(6,{x:245, y:30});

  var fruit_options ={
    density: 0.001
  }
  
  fruit = Bodies.circle(240,100,10,fruit_options);

  Matter.Composite.add(rope.body,fruit);

    constraintlink = new Link(rope,fruit);

  imageMode(CENTER);

  bunny = createSprite(300,570,10,10);
  bunny.addImage(bunnyImg1);
  bunny.scale = 0.18;

  //domstyle -- html format in the javascript
  button = createImg('cut_button.png');
  button.position(300,30);
  button.size(60,60);
  button.mouseClicked(cutTheRope)

  var render;
  
}

function draw() 
{
  background(51);
  image(backgroundImg,250,350,500,700);
  Engine.update(engine);
   ground.display();
 // image(fruitImg,fruit.position.x,fruit.positio
  image(fruitImg,fruit.position.x,fruit.position.y,60,60);
 //  ellipse(fruit.position.x,fruit.position.y,10,10);
   rope.show();
   drawSprites();
}

function cutTheRope()
{
  //1. rope is breaking off (need to call break())
  rope.break();

  //2. fruit needs to fall off(need to call detach())
  constraintlink.detach();
 // constraintlink = null;
}


