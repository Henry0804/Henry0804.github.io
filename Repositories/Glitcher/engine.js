//Main Game Engine
var Game = {};
Game.Api = {};
Game.Api.Story = {};
Game.Api.Story.StoryEvent = class StoryEvent {

}
Game.Api.Story.Levels = [];
Game.Api.Story.LevelObject = class LevelObject {

}

Game.Mode = "Home";

//All objects within currently loaded level.
Game.Objects = [];



Game.Config = {};//Main config settings, mostly to mess with.
Game.Config.Blocks = {};
Game.Config.Blocks.CellSize = 20;


Game.Motion = function Motion() {
  Game.Objects.forEach((Object, i) => {
    //Check for distance between two objects.
    //var Distances = Game.Api.Blocks.GetCollidingDistances(Object);
    var Angles = Game.Api.Blocks.GetCollidingAngles(Object,Game.Objects);
    //Well I now have an array of angles, no other way than to apply the whole thing in a loop.
    //Actually another api function for that!
    //I'm to lazy to make it right now.
    var Vectors = Game.Api.Blocks.GetCollidingVectors(Angles,Object.MotionX,Object.MotionY);//Returns an array of two, complete vectors.
    Object.MotionX = Vectors[0];
    Object.MotionY = Vectors[1];
    //Guess what, are we done? NOPE!
    //Now we have to move the object
    Object.PosX += Object.MotionX;
    Object.PosY += Object.MotionY;
  });

}



//Game.Objects = Game.Objects.concat(Object2);


Game.Update = function Update() {
  var Draw = Game.Draw;
  Draw.clearRect(0,0,500,500);
  Game.Motion();
  Game.Render();
  Game.Api.Graphics.Update();
}




Game.Draw = Canvas.getContext("2d");
Game.Render = function Render() {
  var Draw = Game.Draw;
  var CellSizeConstant = Game.Api.Blocks.CellSize;
  Game.Objects.forEach((Object, i) => {
    //Attributes: PosX, PosY, Draw:{UseFunction:false/true,Color:"red"}
    Draw.fillStyle = Object.Draw.Color;
    Draw.fillRect(Object.PosX,Object.PosY,Object.CellSize*CellSizeConstant,Object.CellSize*CellSizeConstant);
  });
}
//Version
Game.Version = "Alpha 1.0.0";
Game.Options = {};
Game.DynamicOptions = {};//Unlike options, these are meant to be changed constantly through gameplay.
//They also do not apear in any menus.
Game.IsPointInRect = function IsPointInRect(x,y,rx,ry,rw,rh) {
  //check if within left side.
  var Top = y>=ry;
  var Bottom = y<=(ry+rh);
  var Left = x>=rx;
  var Right = x<=(rx+rw);
  return Top&&Bottom&&Left&&Right;
}
//Version: Alpha 1.0.0, Alpha 1.0.1, Alpha 1.1.0,  Beta 1.0.0, 1.0.0
