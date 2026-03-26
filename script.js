let player;
let mapImage;
let count = 0;
let hs = 0;
let character = "-1";
let av = "";
let people = [];

function preload() {
    mapImage = loadImage("Campus-Map-2024-2025-scaled.jpg");
    face = loadImage("71-removebg-preview.png");
    evil = loadImage("albinson.jpg");
    prize = loadImage("Screenshot_2026-03-24_at_10.47.35_AM-removebg-preview.png");
    grp = loadImage("group.png");
    anna = loadImage("anna.png");
    arden = loadImage("arden.png");
    brooke = loadImage("brooke.png");
    dash = loadImage("dash.png");
    devon = loadImage("devon.png");
    maximus = loadImage("max.png");
    micaela = loadImage("micaela.png");
    molly = loadImage("molly.png");
    venice = loadImage("venice.png");
    maia = "hi";
    people = [maia, arden, maximus, molly, anna, venice, devon, brooke, micaela, dash];
}


function setup() {
    createCanvas(1500, 1000);
    player = new Player();
    alb = new Albinson();
    computer = new Computer();
}

class Player {
    constructor() {
        this.x = 50;
        this.y = 50;
        this.dead = false;
    }

    move() {
        if (keyIsDown(LEFT_ARROW) & this.x > 0) {
            this.x -= 5.5;
        }

        if (keyIsDown(RIGHT_ARROW) & this.x < 1500) {
            this.x += 5.5;
        }

        if (keyIsDown(UP_ARROW) & this.y > 0) {
            this.y -= 5.5;
        }

        if (keyIsDown(DOWN_ARROW) & this.y < 1000) {
            this.y += 5.5;
        }

        fill("blue");
        circle(this.x, this.y, 30);
        for(let i = 1; i<10; i++){
            if(character == i){
                image(people[character], this.x - 35, this.y - 50, 75, 100);
            }
        }
        
    }

    alive(){
        if(Math.sqrt((this.x - alb.x)**2 + (this.y - alb.y)**2) < 30){
            this.dead = true;
        }
    }
}

class Albinson {
    constructor(){
        this.x = 750;
        this.y = 400;
        this.speed = 3;
    }
    move() {

        if(player.x > 140&& player.x < 1360&& player.y > 75&& player.y<920){
            if(this.x > player.x & this.x > 140){
                this.x += -this.speed
            }
            if(this.x < player.x & this.x < 1360 ){
                this.x += this.speed
            }
            if(this.y > player.y & this.y > 75){
                this.y += -this.speed
            }
            if(this.y < player.y & this.y < 920){
                this.y += this.speed
            }
        }

        fill("blue");
        circle(this.x, this.y, 30);
        image(face, this.x - 50, this.y - 75, 100, 150);
    }
}

class Computer {
    constructor(){
        this.x = Math.random()*(1360 - 140) + 140;
        this.y = Math.random()*(920 - 75) + 75;
        this.alive = true;
    }
    exist() {
        if(Math.sqrt((this.x - player.x)**2 + (this.y - player.y)**2) < 30 && this.alive==true){
            count += 1;
            this.alive = false;
            computer = new Computer();
            alb.speed += 0.2;
        } else if(this.alive == true){
            fill("yellow");
            circle(this.x, this.y, 30);
            image(prize, this.x - 35, this.y - 25, 75, 50);
        }
    }

}

function restart(){
    if(player.dead){
        if(keyIsDown(32)){
            background(240);
            player = new Player;
            alb = new Albinson;
            if(hs < count){
                hs = count;
            }
            count = 0;
            character = "-1"
            startScreen();
        }
    }
}

function check(){
    if (player.dead == true){
        image(evil, 0, 0, width, height);
        textSize(48);
        fill('white');
        text("GAME OVER", 750, 500);
        text("press space to restart", 550, 650);
    }
}

function startGame(){
    image(mapImage, 0, 0, width, height);
    player.move();
    alb.move();
    computer.exist();
    player.alive();
}

function keyPressed(){
    console.log(character)
    console.log(keyCode)
    if(keyCode != 32 && keyCode != 37 && keyCode != 38 && keyCode != 39 && keyCode !=40 && keyCode != 0 && character == "-1"){
        console.log('bad')
        console.log(keyCode)
        character = key;
        console.log(character)
    }
}

function startScreen(){
    textSize(40);
    fill('black');
    text("Tutorial: escape evil mr albinson to steal expensive computers from campus", 20, 200);
    text("Choose your character: click the corresponding key to select your avatar" , 100, 300);
    image(grp, 20, 310, 1000, 600);
    keyPressed();
    if(character != "-1"){
        startGame();
    }
}

//let people pick their avatar

function draw() {
    background(240);
    startScreen();
    console.log(character)
    push();
        textSize(40);
        fill('black');
        text("Score: " + count, 50, 50);
        text("Highscore: " + hs, 1200, 50);
    pop();
    push();
    check();
    pop();
    restart()
}

