var Block = Game.Api.Blocks.BlockObject;
Object1 = new Block();
Object1.PosX = 0;
Object1.PosY = 0;
//Motion defaults to 0, so you don't need to add it here.

ObjectHamster = new Block();
ObjectHamster.PosX = 200;
ObjectHamster.PosY = 200;
ObjectHamster.MotionX = 10;
ObjectHamster.MotionY = 0;

//Yeah it's cool! It's really easy and makes it easy for the average devoloper. (Me)
//Wish atom told me the prams for functions sometiems. I forgot often.
Object2 = new Block();
Object2.PosX = 100;
Object2.PosY = 100;

Game.Objects = Game.Objects.concat(Object1);
Game.Objects = Game.Objects.concat(Object2);
