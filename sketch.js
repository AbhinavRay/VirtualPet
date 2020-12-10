var dog,dogImg,happyDog,happyDogImg, database,foodStock,foodS

function preload()
{
  dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  var foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(20);
  createCanvas(500, 500);
  dog = createSprite(250,350,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;

}


function draw() {
  background(46,139,87);

  if(foodS !== undefined){
    textSize(20);
    fill("white")
    text("Press Up Arrow To Feed Leo",120,100)
    text("Food Remaining: "+foodS,150,200)
  }

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg)
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg)
  }

  if(foodS === 0){
    foodS = 20
  }

  drawSprites();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    food:x
  })
}

function readStock(data){
  foodS = data.val();
}