var enemy_spaceship_size = 13;
var enemySpaceshipSpeed = 2;
var enemyFireSpeed = 1;

var stars = []

var enemyShots = [];
var enemyBullet;
var enemeis_killed = 0;

const points = [20, 15, 10, 5];
const health = [1, 1, 1, 1]
const colors = ['blue', 'green', 'purple', 'red']

var brigade = []
var brigade_rows;
var brigade_cols;

function setupEnemy(b_r, b_c){
    brigade_rows = b_r;
    brigade_cols = b_c;
    enemySpaceshipSpeed = 2;
    enemyShots = [];
    enemyBullet = null;
    enemeis_killed = 0;
    
    enemyBullet = {x: space.width / 2, y: space.height};

    brigade = createBrigade(b_r, b_c);
}

function increaseSpeed(upSpeed){
    enemyFireSpeed = enemyFireSpeed + upSpeed;
    enemySpaceshipSpeed = enemySpaceshipSpeed + upSpeed;
}

function createBrigade(rows, cols){
    for(let i = 0; i < rows; i++){
        brigade[i] = [];
        for(let j = 0; j < cols; j++){
            enemySpaceship = {x: startCx + 60*j, 
                y:  55 + 50*i, 
                alive: 1, type: i, 
                points: points[i], 
                health: health[i]
            }
            brigade[i][j] = enemySpaceship;
        }
    }  
    return brigade
} 

function drawEnemy(cx, cy, color){
    contextSpace.beginPath();
    contextSpace.arc(cx, cy, enemy_spaceship_size, 0, Math.PI*2);
    contextSpace.moveTo(cx - enemy_spaceship_size, cy);
    contextSpace.lineTo(cx, cy + enemy_spaceship_size*2);
    contextSpace.lineTo(cx + enemy_spaceship_size, cy)
    contextSpace.strokeStyle = 'grey';
    contextSpace.fillStyle = color;
    contextSpace.fill();
}

function drawBrigade(speed){
    collisionDetetctionEnemy();
    for(let i = 0; i < brigade_rows; i++){
        for(let j = 0; j < brigade[i].length; j++){
            if(brigade[i][j].alive == 1){
                brigade[i][j].x += speed;
                brigade[i][j].y += Math.cos(brigade[i][j].x/30)*speed;
                drawEnemy(brigade[i][j].x, brigade[i][j].y, colors[i]);         
            }
        }
    }
    contextSpace.stroke();
}

function updateEnemyFirePositions(){
    enemyShots.forEach(shoot => {       
        shoot.y = shoot.y + enemyFireSpeed;
        if(shoot.y > space.height ){
            var index = enemyShots.indexOf(shoot);
            enemyShots.splice(index, 1);
        }
        contextSpace.beginPath();
        contextSpace.arc(shoot.x, shoot.y, 5, 0, Math.PI*2);
        contextSpace.fillStyle = "red";
        contextSpace.strokeStyle = "darkorange";
        contextSpace.fill();
    });
}

function collisionDetetctionEnemy(){
    spaceshipBullets.forEach(shoot => {
        for(let i = 0; i < brigade_rows; i++){
            for(let j = 0; j < brigade[i].length; j++){
                if( 
                    brigade[i][j].x  + enemy_spaceship_size > shoot.x && 
                    brigade[i][j].x - enemy_spaceship_size < shoot.x && 
                    brigade[i][j].y + enemy_spaceship_size > shoot.y &&
                    brigade[i][j].y - enemy_spaceship_size < shoot.y ){
                        enemyHitSound.play();
                        brigade[i][j].health -= 1;
                        spaceshipBullets.splice(shoot, 1);
                        if(brigade[i][j].health == 0){
                            enemyExplodeSound.play();
                            enemeis_killed++;
                            score = score + brigade[i][j].points;
                            scoreTag.textContent = `Score: ${score}`;
                            brigade[i].splice(brigade[i].indexOf(brigade[i][j]),1)
                        }
                }
            }
        }
    });
    contextSpace.stroke();
    
}


function enemyShot(){
    if(!enemyBullet || enemyBullet.y > space.height*0.75){
        var row = Math.round(Math.random()*3);

        if(brigade[row].length > 0 ){
            var col = Math.round(Math.random()*(brigade[row].length-1));
            enemyBullet = {x: brigade[row][col].x, y: brigade[row][col].y};
            enemyShots.push(enemyBullet);
            return;

        }
    }
}

var startCx = 20;
var move_right = true;
function updateBrigade(){

    enemyShot();
    if(startCx > space.width - enemy_spaceship_size*2*9){
        move_right = false;
    }else if(startCx < 10) {
        move_right = true;
    }

    if(move_right){
        startCx = startCx + enemySpaceshipSpeed;
        drawBrigade(enemySpaceshipSpeed);
    }else{
        startCx = startCx - enemySpaceshipSpeed;
        drawBrigade(-enemySpaceshipSpeed);
    }

}

function deleteEnemyBullet(){
    enemyBullet = false;
}

function drawTrophy(cx,cy,spikes,outerRadius,innerRadius){
    var rot=Math.PI/2*3;
    var x=cx;
    var y=cy;
    var step=Math.PI/spikes;

    contextSpace.beginPath();
    contextSpace.moveTo(cx,cy-outerRadius)
    for(i=0;i<spikes;i++){
        x=cx+Math.cos(rot)*outerRadius;
        y=cy+Math.sin(rot)*outerRadius;
      contextSpace.lineTo(x,y)
      rot+=step

      x=cx+Math.cos(rot)*innerRadius;
      y=cy+Math.sin(rot)*innerRadius;
      contextSpace.lineTo(x,y)
      rot+=step
    }
    contextSpace.lineTo(cx,cy-outerRadius);
    contextSpace.closePath();
    contextSpace.lineWidth=5;
    contextSpace.strokeStyle = "blue";
    contextSpace.fillStyle= "yellow";
    contextSpace.stroke();
    
    contextSpace.fill();
  }

  function updateTrophyPosition() {
    stars.forEach(trophy => {
        if(trophy.pointY > space.height){
            trophy.pointY = 0;
            trophy.pointX = Math.random()*space.width;
        }else{ 
            trophy.pointY += trophy.velocity;
        }
        
        // drawStar(star.pointX, star.pointY, 5, star.outerRadius, star.innerRadius, star.rotate);
        drawStar(trophy.pointX, trophy.pointY, trophy.outerRadius);
    });
    contextSpace.stroke();
}

function createTrophies(trophyAmount){
    var outerRadius;
    var velocity;
    stars = []
    for(var i = 0; i < trophyAmount
        ; i++){
        outerRadius = Math.random()*3;
        velocity = (Math.random()+1)*stars_velocity;
        stars.push({
            pointX: Math.random()*space.width, 
            pointY: 30, 
            outerRadius: 
            outerRadius, 
            velocity: velocity,
        });
    }
}
