Game.Api.Blocks = {};
Game.Api.Blocks.BlockObject = class BlockObject {
  constructor() {
    this.PosX = 0;
    this.PosY = 0;
    this.MotionX = 0;
    this.MotionY = 0;
    this.Draw = {Color:"red",UseFunction:false};
    this.CellSize = 1;
    //This is a few lines of code to make the BlockObject class.
    //Won't work unless it has the Draw attribute.
  }
}


Game.Api.Blocks.GetDistance = function GetDistance(x,y,px,py) {
  //X is well x1. Y is y1. and px is X2, py is y2
  dx = Math.max(Math.abs(px - x) - width / 2, 0);
  dy = Math.max(Math.abs(py - y) - height / 2, 0);
  return dx * dx + dy * dy;
}
Game.Api.Blocks.GetAngle = function GetAngle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  //theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}
//Hitbox get distance apply force = distance and angle
Game.Api.Blocks.GetHitboxForce = function GetHitboxForce(Angle,MotionX,MotionY) {
  if (true) {//Distance<0
    //var Distance2 = Math.abs(Distance);
    var X = Math.sin(Angle)*MotionX;
    var Y = Math.cos(Angle)*MotionY;
    return [X,Y];
  }
  return [0,0];
}


Game.Api.Blocks.GetCollidingDistances = function GetCollidingDistances(CurrentObject) {
  var x = Game.Api.Blocks.GetDistance;
  var Colliding = [];
  const C = CurrentObject.CellSize*Game.Config.Blocks.CellSize*0.5;
  const CX = CurrentObject.PosX+C;
  const CY = CurrentObject.PosY+C;

  Game.Objects.forEach((Object, i) => {
    //CenterX and CenterY
    var c = Object.CellSize*Game.Config.Blocks.CellSize*0.5;//This basicly allows me to do this:
    var cx = Object.PosX+c;
    var cy = Object.PosY+c;
    //Now the problem is to loop against every other object, to find what is colliding.
    //Wait I'm dumb, that's what I'm doing!
    var d = x(CX,CY,cx,cy);//Get the final distance. normaly positive
    if (d<=0) {//If the object is touching or inside the other.
      Colliding = Colliding.concat({Object:Object,Distance:d});//Creates object with Distance and Object.
    }
  });
  //Finnaly, move the entire colliding aray out of this function.
  return Colliding;
}

Game.Api.Blocks.GetCollidingAngles = function GetCollidingAngles(CurrentObject,Objects) {
  //Get all angles into an array
  var Output = [];
  //Even more laziness.
  const C = CurrentObject.CellSize*Game.Config.Blocks.CellSize*0.5;
  const CX = CurrentObject.PosX+C;
  const CY = CurrentObject.PosY+C;
  Objects.forEach((Object2, i) => {
    //Do center stuff
    //Copying, cause it's easy and I'm lazy
    //var Object = Distance.Object;//More laziness.
    var c = Object2.CellSize*Game.Config.Blocks.CellSize*0.5;//This basicly allows me to do this:
    var cx = Object2.PosX+c;
    var cy = Object2.PosY+c;
    var Angle = Game.Api.Blocks.GetAngle(CX,CY,cx,cy);
    Output = Output.concat(Angle);
    //console.info(Game.Config.Blocks.CellSize,C);
  });
  return Output;
}
Game.Api.Blocks.GetCollidingVectors = function GetCollisionVectors(Angles,MotionX,MotionY) {
  var Output = [0,0];
  Angles.forEach((Angle, i) => {
    var h = Game.Api.Blocks.GetHitboxForce(Angle,MotionX,MotionY);
    //Boom it's mostly done.
    Output[0] += h[0];
    Output[1] += h[1];
  });
  return Output;
}
