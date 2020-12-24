//Main graphics code.
Game.Api.Graphics = {};
Game.Api.Graphics.Objects = [];
Game.Api.Graphics.WindowObject = class WindowObject {
  constructor(x,y,w,h) {
    this.Parent = null;//If this is inside an object, mostly doesn't serve much of a purpose.
    this.Width = w;
    this.Height = h;
    this.BarHeight = 20;//TODO: This controls where the mouse can ineract with the window, ex: draging it. (or closing it)
    //this.BarWidth = w;
    this.Bar = {Active:true,Color:"gray",Opacity:1};
    this.LocalX = 0;//This controlls x value inside object, so this isn't outside object.
    this.LocalY = 0;//Same deal with LocalX
    this.PosX = x;
    this.PosY = y;
    this.Background = {Active:true,Color:"black",Opacity:1};
    this.Border = {Active:true,Color:"darkgray",Opacity:1,LineWidth:5};
    this.Animation = {Active:true,Name:"FadeIn",Time:40};
    this.Onclick = "alert(1);";//This isn't really working yet.
//In javascript, alert is a default pop-up menu. Of course the onclick function doesn't work yet.
//And I will probably change it from a string to a function later.
    this.Moving = false;
    this.Options = {Dragable:true,Resizeable:true};
  }
}


Game.Api.Graphics.ButtonObject = class ButtonObject {
  constructor(x,y,w,h) {
    this.Parent = null;//If this is inside an object, mostly doesn't serve much of a purpose.
    this.Width = w;
    this.Height = h;
    this.BarHeight = 20;//TODO: This controls where the mouse can ineract with the window, ex: draging it. (or closing it)
    //his.BarWidth = w;
    this.Bar = {Active:false,Color:"gray",Opacity:1};
    this.LocalX = 0;//This controlls x value inside object, so this isn't outside object.
    this.LocalY = 0;//Same deal with LocalX
    this.PosX = x;
    this.PosY = y;
    this.Background = {Active:true,Color:"black",Opacity:1};
    this.Border = {Active:true,Color:"darkgray",Opacity:1,LineWidth:5};
    this.Animation = {Active:true,Name:"FadeIn",Time:40};
    this.Onclick = "alert(1);";//This isn't really working yet.
    this.Moving = false;//Equal to "Draging" or "Moving"
    this.Options = {Dragable:true,Resizeable:true};
  }
}
Game.Api.Graphics.Render = function Render() {
  var Draw = Game.Draw;
  Draw.fillStyle = "white";
  //Draw.fillRect(0,0,500,500);
  var a = Game.Api.Graphics.Objects;
  for (var Count = a.length-1;Count>=0;Count--) {
  //Game.Api.Graphics.Objects.forEach((Object, i) => {
    var Object = a[Count];
    //loop
    if (Object.Border.Active) {
      Draw.globalAlpha = Object.Border.Opacity;
      Draw.fillStyle = Object.Border.Color;
      //Draw.lineWidth = Object.Border.LineWidth;
      Draw.fillRect(Object.LocalX+Object.PosX-Object.Border.LineWidth,Object.LocalY+Object.PosY-Object.Border.LineWidth,Object.Width+Object.Border.LineWidth*2,Object.Height+Object.Border.LineWidth*2);
    }
    Draw.globalAlpha = 1;
    if (Object.Background.Active) {
      Draw.globalAlpha = Object.Background.Opacity;
      Draw.fillStyle = Object.Background.Color;
      Draw.fillRect(Object.LocalX+Object.PosX,Object.LocalY+Object.PosY,Object.Width,Object.Height);
    }
    Draw.globalAlpha = 1;
    if (Object.Bar.Active) {
      Draw.globalAlpha = Object.Bar.Opacity;
      Draw.fillStyle = Object.Bar.Color;
      Draw.fillRect(Object.LocalX+Object.PosX,Object.LocalY+Object.PosY,Object.Width,Object.BarHeight);
    }
    Draw.globalAlpha = 1;
    if (Object.Options.Resizeable) {
      Draw.fillStyle = "blue";
      Draw.fillRect((Object.LocalX+Object.PosX+Object.Width)-20,(Object.LocalY+Object.PosY+Object.Height)-20,20,20);
    }
    Draw.globalAlpha = 1;
  }
  var LocalMouse = Game.Api.Graphics.MouseEvent;
  //console.info(LocalMouse.buttons);
  var X = LocalMouse.offsetX;
  var Y = LocalMouse.offsetY;
  Draw.fillStyle = "red";
  Draw.fillRect(X,Y,5,5);
}
Game.Api.Graphics.MouseEventHandle = function (e) {
  Game.Api.Graphics.MouseEvent = e;
  //console.info(e);
}
Game.Api.Graphics.MouseDownHandle = function (e) {
  Game.Api.Graphics.MouseDown = !Game.Api.Graphics.MouseDown;
}
Canvas.addEventListener("mousemove",Game.Api.Graphics.MouseEventHandle);
Canvas.addEventListener("mouseup",Game.Api.Graphics.MouseEventHandle);
Canvas.addEventListener("mousedown",Game.Api.Graphics.MouseEventHandle);
Game.Api.Graphics.Mouse = {OffseX:0,OffsetY:0};
Game.Api.Graphics.Control = function Control() {
  //var rect = Canvas.getBoundingClientRect();
  var LocalMouse = Game.Api.Graphics.MouseEvent;
  //console.info(LocalMouse.buttons);
  var X = LocalMouse.x;
  var Y = LocalMouse.y;
  var AnyObjectMoving = false;
  Game.Api.Graphics.Objects.forEach((Object, i) => {
    if (Object.Moving) {AnyObjectMoving = true;return;}
  });
  //console.info(AnyObjectMoving);
  Game.Api.Graphics.Objects.forEach((Object, i) => {
    if (Object.Moving=="Moving") {
      Object.PosX = X+Game.Api.Graphics.Mouse.OffsetX;
      Object.PosY = Y+Game.Api.Graphics.Mouse.OffsetY;

      if (!Game.Api.Graphics.MouseEvent.buttons) {
        Object.Moving = false;
        return;
      }
    }
    else if (Object.Moving=="Draging") {
      Object.Width = X+Game.Api.Graphics.Mouse.OffsetX;
      Object.Height = Y+Game.Api.Graphics.Mouse.OffsetY;
      if (!Game.Api.Graphics.MouseEvent.buttons) {
        Object.Moving = false;
        return;
      }

      }
    if (Game.Api.Graphics.MouseEvent.buttons&&!AnyObjectMoving) {
      var IsInRect = Game.IsPointInRect(X,Y,Object.PosX+Object.LocalX,Object.PosY+Object.LocalY,Object.Width,Object.BarHeight);
      var OtherRect = Game.IsPointInRect(X,Y,(Object.LocalX+Object.PosX+Object.Width)-20,(Object.LocalY+Object.PosY+Object.Height)-20,20,20);
      //To move object, find location relative to object.
      if (IsInRect) {
        Object.Moving = "Moving";
        Game.Api.Graphics.Mouse.OffsetX = Object.PosX-X;
        Game.Api.Graphics.Mouse.OffsetY = Object.PosY-Y;
        AnyObjectMoving = true;
        return;
      } else if (OtherRect) {
        Object.Moving = "Draging";
        Game.Api.Graphics.Mouse.OffsetX = Object.Width-X;
        Game.Api.Graphics.Mouse.OffsetY = Object.Height-Y;
        AnyObjectMoving = true;
        return;
      }

    }

  });
  //Now to move the localX and localY for stuff
  var HasBeenFocused = false;
  Game.Api.Graphics.Objects.forEach((Object, i) => {
    if (Object.Parent) {
      Object.LocalX = Object.Parent.PosX+Object.Parent.LocalX;
      Object.LocalY = Object.Parent.PosY+Object.Parent.LocalY;
      if (Object.Parent.Width<Object.Width) {
        Object.Width = Object.Parent.Width;
      }
      if (Object.Parent.Height<Object.Height) {
        Object.Height = Object.Parent.Height;
      }
      //Check if winodw is out of bounds. right and bottom
      if (Object.Parent.Width<Object.Width+Object.PosX) {
        Object.PosX = Object.Parent.Width-Object.Width;
      }
      if (Object.Parent.Height<Object.Height+Object.PosY) {
        Object.PosY = Object.Parent.Height-Object.Height;
      }
      //The top and left Now.
      if (Object.PosX<0) {Object.PosX = 0;}
      if (Object.PosY<0) {Object.PosY = 0;}
    }
    if (Object.Width<40) {Object.Width = 40;}
    if (Object.Height<40) {Object.Height = 40;}
    //Do other stuff to the object.
    //"Focus" the object so it can be ontop of every other object ---
    var isTouched = Game.IsPointInRect(X,Y,Object.PosX+Object.LocalX,Object.PosY+Object.LocalY,Object.Width,Object.Height);
    if (isTouched&&Game.Api.Graphics.MouseEvent.buttons&&!Game.Api.Graphics.Control.IsFocused) {
      Game.Api.Graphics.Control.IsFocused = true;
      Game.Api.Graphics.Objects.splice(i,1);//No idea if this works. (This somehow made 4 windows?)
      //Let me try running the splice myself
      //Oops I messed this function up terribly.
      //Ok It should work
      //console.info(Game.Api.Graphics.Objects);
      Game.Api.Graphics.Objects.unshift(Object);//Don't know if this works either
      //IMPORTANT------ MAKE THE RENDER FUNCTION RENDER OBJECTS BACKWARDS, TO PREVENT VISUAL BUGS.
      //The reason is because all of these for each loops work forawrd,
      //But if one object is rendered, the next will overlap, causing bugs.
    }
    if (!Game.Api.Graphics.MouseEvent.buttons) {
      Game.Api.Graphics.Control.IsFocused = false;
    }
  });
Game.Api.Graphics.Control.IsFocused = false;

}
var m = "t"
var TimeNew = 0;
var TimeOld = 0;
var str = "";
var Delay = 60;
Game.Api.Graphics.Update = function Update() {
  var g = Game.Api.Graphics;
  var Draw = Game.Draw;
  g.Control();
  g.Render();
  //BounceWindow();
  TimeNew = performance.now();
  Draw.fillStyle = "blue";
  if (Delay>=60) {
    str = String( Math.floor(1000/(TimeNew-TimeOld)  )    );
    Delay = 0;
  }
  Delay++;
  Draw.fillText(str,20,20);
  TimeOld = performance.now();
}
setInterval(Game.Update,1000/60);


Game.Api.Graphics.MakeWindow = function MakeWindow() {
  var g = Game.Api.Graphics;
  var Win = new g.WindowObject(g.MakeWindow.OffsetMain+g.MakeWindow.OffsetX,g.MakeWindow.OffsetMain,100,100);
  g.Objects = g.Objects.concat(Win);
  g.MakeWindow.OffsetMain += 20;
  //g.MakeWindow.CurrentY += 20;
  if (g.MakeWindow.OffsetMain>=500-g.MakeWindow.OffsetX) {
    g.MakeWindow.OffsetX += 20;
    g.MakeWindow.OffsetMain = 20;
  }
}
Game.Api.Graphics.MakeWindow.OffsetMain = 20;
Game.Api.Graphics.MakeWindow.OffsetX = 20;

Game.Api.Graphics.MakeErrorBox = function MakeErrorBox() {

}
Game.Api.Graphics.Apply = function Apply(ParentObject,Object) {
  Object.LocalX = ParentObject.PosX;
  Object.LocalY = ParentObject.PosY;
  Object.Parent = ParentObject;
}


//Create basic window object:
var win10 = new Game.Api.Graphics.WindowObject(20,20,200,200);//this is windows10 ,All I know is that without "var" some very odd things happen (don't know what)
var win11 = new Game.Api.Graphics.WindowObject(40,40,100,100);
var win12 = new Game.Api.Graphics.ButtonObject(40,40,50,50);
Game.Api.Graphics.Apply(win10,win11);
Game.Api.Graphics.Apply(win11,win12);

//Game.Api.Graphics.Objects = Game.Api.Graphics.Objects.concat(win10);
//Game.Api.Graphics.Objects = Game.Api.Graphics.Objects.concat(win11);
//Game.Api.Graphics.Objects = Game.Api.Graphics.Objects.concat(win12);
function WindowMaker(c) {
  var Windows = [];
  var Y = 6;
  var X = 6;
  var H = 450;
  var W = 450;
  for (var Count = 0;Count < c;Count++) {
    var win = new Game.Api.Graphics.WindowObject(X,Y,W,H);
    W -= 12;
    H -= 12;
    if (Count!=0) {
    var LastWin = Windows[Count-1]
    Game.Api.Graphics.Apply(LastWin,win);
    }
    Windows = Windows.concat(win);
  }
  Windows.forEach((Object, i) => {
    Game.Api.Graphics.Objects = Game.Api.Graphics.Objects.concat(Object);
  });

}
function BounceWindow() {
  Game.Api.Graphics.Objects.forEach((Object, i) => {
    var x = Math.floor(Math.random() * 11)-5;
    var y = Math.floor(Math.random() * 11)-5;
    var w = Math.floor(Math.random() * 11)-5;
    var h = Math.floor(Math.random() * 11)-5;
    Object.PosX += x;
    Object.PosY += y;
    Object.Width += w;
    Object.Height +=h;
  });

}
