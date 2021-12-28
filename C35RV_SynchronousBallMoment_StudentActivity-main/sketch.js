var hypnoticBall, database;
var position;


function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);

  hypnoticBall = createSprite(250, 250, 10, 10);
  hypnoticBall.shapeColor = "red";


  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw() {
  background("white");

  if (keyDown(LEFT_ARROW)) {
    writePosition(-1, 0);
  }
  else if (keyDown(RIGHT_ARROW)) {
    writePosition(1, 0);
  }
  else if (keyDown(UP_ARROW)) {
    writePosition(0, -1);
  }
  else if (keyDown(DOWN_ARROW)) {
    writePosition(0, +1);
  }
  drawSprites();

}

function writePosition(x1, y1) {

  database.ref('ball/position').set({ 'x': position.x + x1, 'y': position.y + y1 });
}

function readPosition(data) {
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError() {
  console.log("Error in writing to the database");
}


// reading  to read from database only one node before u will refer
// writing (update) to write on to the dabase
//node
// ball
    //  position
    //     x
    //     Y

    //readPosition is a call back function
    //JSON 