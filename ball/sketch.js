class Bird {
  constructor(){
    this.x = 64;
    this.y = height/2;
    this.gravity = 0.6;
    this.lift = -15;
    this.velocity = 0;
  }
  show(){
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, 32);
  }
  update(){
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
  up(){
    this.velocity += this.lift;
  }
}

class Pipe {
  constructor(){
    this.spacing = random(70, height/4);
    this.center = random(this.spacing, height-this.spacing);
    this.top = this.center - this.spacing/2;
    this.bottom = height - (this.center + this.spacing/2);
    this.x = width;
    this.w = 50;
    this.speed = 2;
    this.highlight = false;
    // this.highlight2 = true;
  }
  show(){
    if (this.highlight){
      fill(255, 0, 0);
    }else if(this.highlight2){
      fill(0, 255, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }
  update(){
    this.x -= this.speed;

  }
  offscreen(){
    if (this.x < -this.w){
      return true; // this.x < -this.w evaluates true or false
    } else{
      return false;
    }
  }
  hits(bird){
    if (bird.y < this.top || bird.y > height - this.bottom){
      if (bird.x > this.x && bird.x < this.x + this.w){
        this.highlight = true;
        return true;
      }
    }
    // this.highlight = false;
    // return false;
  }
  // notHits(bird){
  //   score += score;
  //}

}

var bird;
var pipes = [];
var index = 0;
var space = [" "];
var score = 0;

function setup(){
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw(){
  background(0);
  fill(100, 100, 200);
  text(20);
  text("PRESS SPACEBAR TO JUMP", 10, 30);
  //text(score, 350, 30);
  for (var i = pipes.length - 1; i >= 0; i--){
    pipes[i].show();
    pipes[i].update();
    if (bird.y > pipes.top || bird.y < height - pipes.bottom){
      console.log("+1");
      pipes.notHits(bird);
    }
    if (pipes[i].hits(bird)){
      score += score
       fill(255, 0, 0);
       textSize(30);
       text("OH NO! YOU DIED!", 10, 30);
       text("REFRESH THE PAGE TO", 10, 60);
       text("TRY AGAIN", 10, 90);
      // text("SCORE OF", 10, 120);
      // text(score, 10, 150);
       console.log("hit");
       index += 1;
       text(space[index], 0, 0);
     }
  //   if (pipes[i].notHits(bird)){
  //     fill(0, 255, 0);
  //     textSize(30);
  //     text("+$$$", bird.x, bird.y);
  //     console.log("not hit");
  // }
    if (pipes[i].offscreen()){
      pipes.splice(i, 1);
    }
  }
  bird.update();
  bird.show();
  if (frameCount % 100 == 0){
    pipes.push(new Pipe());
  }
}

function keyPressed(){
  if (key == ' '){
    bird.up();
    //console.log("You pressed the spacebar");
  }
}
