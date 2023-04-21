var spaceshipBullets = [];
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;


var fireButton = " ";

var spaceshipColor = "orange";

function setFireButton(key){
    fireButton = key;
}

function setSpaceship(){
    var xPosition = space.width/4 + Math.random()*2*space.width/4
    spaceship = {x: xPosition, y: space.height - spaceship_height*4.5}
}

function setSpaceshipColor(color){
    spaceshipColor = color;
}

function keyDownHandler(e) {
    if(e.key == "Esc"){
        
    }
    if (e.key == " Right" || e.key == "ArrowRight" ){
        rightPressed = true;
    }else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
    if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = true;
    }else if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = true;
    }
}


function keyUpHandler(e) {
    if(e.key == fireButton){
        fire(e);
    }
    if (e.key == "Right" || e.key == "ArrowRight" ){
        rightPressed = false;
    }else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
    
    if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = false;
    }else if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = false;
    }
}

var bullet;
function fire(event){
    var cx = spaceship.x, cy = spaceship.y;
    bullet = {x: cx, y: cy, alive: 1}; 
    spaceshipBullets.push(bullet);
    spaceshipShoot.play();
}

function drawSpaceship(){
    contextSpace.beginPath();
    contextSpace.arc(spaceship.x, spaceship.y, spaceship_width, 0, Math.PI*2);
    contextSpace.fill();
    contextSpace.moveTo(spaceship.x, spaceship.y - 15);
    contextSpace.lineTo(spaceship.x - 12, spaceship.y + 5);
    contextSpace.fillStyle = spaceshipColor;
    contextSpace.fill();
    contextSpace.lineTo(spaceship.x + 12, spaceship.y + 5);
    contextSpace.strokeStyle = "#979797";
    contextSpace.closePath();
    contextSpace.moveTo(spaceship.x, spaceship - 15);
    contextSpace.arc(spaceship.x, spaceship - 12, 30, Math.PI, Math.PI*2);
    contextSpace.fillStyle = "#808080";
    contextSpace.fill();
    contextSpace.stroke();
}

var spaceship_width = 10;
var spaceship_height = 10;
var spaceship;
var spaceship_speed = 3;


function updateSpaceshipPositions(){
    collisionDetetctionSpaceship();
    drawSpaceship();
    if(rightPressed && spaceship.x < space.width - spaceship_width){
        spaceship.x = spaceship.x + spaceship_speed;
    }else if(leftPressed && spaceship.x > 0 + spaceship_width){
        spaceship.x = spaceship.x - spaceship_speed;
    }

    if(upPressed && spaceship.y > (space.height * 0.6) + spaceship_height){
        spaceship.y = spaceship.y - spaceship_speed;
    }else if(downPressed && spaceship.y < space.height - spaceship_height*3){
        spaceship.y = spaceship.y + spaceship_speed;
    }
}


function updateFirePositions(){
    spaceshipBullets.forEach(shoot => {       
        shoot.y = shoot.y - 2.5;
        if(shoot.y < 0 ){
            var index = spaceshipBullets.indexOf(shoot);
            spaceshipBullets.splice(index, 1);
        }
 
        contextSpace.beginPath();
        contextSpace.arc(shoot.x, shoot.y, 3, 0, Math.PI*2);
        contextSpace.fillStyle = "yellow";
        contextSpace.strokeStyle = "darkorange";
        contextSpace.fill();
        contextSpace.stroke();
    });
}

function collisionDetetctionSpaceship(){
    enemyShots.forEach(bullet => {
        if(bullet.x < spaceship.x + spaceship_width 
            && bullet.x > spaceship.x - spaceship_width
            && bullet.y < spaceship.y + spaceship_width
            && bullet.y > spaceship.y - spaceship_width){
                enemyShots.splice(enemyShots.indexOf(bullet), 1);
                spaceshipExplodeSound.play();
                healthBar--;
                setSpaceship();
                healthTag.textContent = '🚀'.repeat(healthBar);
                deleteEnemyBullet();                
            
            }
    });
}


function drawBubble(cx, cy, size){
    contextSpace.beginPath();
    contextSpace.arc(cx, cy, size, 0, Math.PI*2);
    contextSpace.fillStyle = "white";
    contextSpace.fill();
    contextSpace.stroke();
}


function updateTrailPosition() {
    trail.forEach(star => {
        star.timeToLeave--;
        if(star.timeToLeave < 1){
            star.pointY = spaceship.y;
            star.pointX = spaceship.x;
            star.timeToLeave = Math.random()*10;
        }else{ 
            star.pointY += star.velocity;
            star.pointX += Math.sin(star.pointY)*3;
        }

        drawBubble(star.pointX, star.pointY, star.size);
    });
}


function createTrail(){
    for(var i = 0; i < 15; i++){
        velocity = (Math.random()+1)*1;
        trail.push({
            pointX: Math.random()*space.width, 
            pointY: 30, 
            size: Math.random()*3,
            velocity: velocity,
            timeToLeave: Math.random()*15
        });
    }
}
