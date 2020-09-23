var dog, foodS, foodStock, happyDog, database;

var foodObj;
var feedButton, addButton;
var fedTime, lastFed

function preload(){ 
  dog= loadImage("dogImg.png")
  happyDog= loadImage("dogImg1.png")
}

function setup() {
  createCanvas(1000, 900)
  
  dog1= createSprite(400,500,50,50)
  dog1.addImage(dog)
  database= firebase.database()

  foodObj= new Food()

  feedButton= createButton("Feed The Hungry Dog")
  feedButton.position(800,70)
  feedButton.mousePressed(feedDog)

  addFood= createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
}

function getStock(data){
  foodS= data.val()
}

function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
   
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog1.addImage(happyDog)
  console.log(hour())
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodObj.foodStock++;
  database.ref("/").update({
    Food:foodObj.foodStock
  })
}



function draw() {  
  background(46, 139, 87)

  drawSprites();
  
  fill("black")
  textSize(20)
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 +"PM",350,30)
  }
  else if(lastFed==0){
    text("Last Feed : 12 PM",350,30)
  }
  else{
    text("Last Feed : "+ lastFed%12 +"PM",350,30)
  }
  //text("Press UP ARROW to feed the dog !", 200,50)
  //text("No. of Bottles:"+ foodS, 650,100)

  foodObj.display()
  fedTime= database.ref('FeedTime')
  fedTime.on("value", function(data){
    lastFed= data.val()
  })
}



