var ball;
var database;
var position;
var ballposition;

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  ballposition = database.ref("ball/position"); // refering
  ballposition.on("value", readposition, showerror); //listening
  ball = createSprite(250, 250, 10, 10);
  ball.shapeColor = "red";
}

function draw() {
  background("white");
  if (keyDown(LEFT_ARROW)) {
    writePosition(-1, 0);
  } else if (keyDown(RIGHT_ARROW)) {
    writePosition(1, 0);
  } else if (keyDown(UP_ARROW)) {
    writePosition(0, -1);
  } else if (keyDown(DOWN_ARROW)) {
    writePosition(0, +1);
  }
  drawSprites();
}

function writePosition(x, y) {
  database.ref("ball/position").set({
    x: ball.x + x,
    y: ball.y + y,
  });
}

function readposition(data) {
  position = data.val();
  ball.x = position.x;
  ball.y = position.y;
}

function showerror() {
  cosole.log("error");
}
