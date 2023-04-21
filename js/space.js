var status = true;

var stars = [];
var trail =[];
var stars_velocity = 2;

var gameState = false;


function createStars(starsAmount){
    var outerRadius;
    var velocity;
    stars = []
    for(var i = 0; i < starsAmount
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

function setStarsVelocity(speed){
    stars_velocity = speed;
}


function drawStar(cx, cy, radius){
    contextSpace.beginPath();
    contextSpace.arc(cx, cy, radius, 0, Math.PI*2);
    contextSpace.fillStyle = "white";
    contextSpace.fill();
}   

function updateStarPosition() {
    stars.forEach(star => {
        if(star.pointY > space.height){
            star.pointY = 0;
            star.pointX = Math.random()*space.width;
        }else{ 
            star.pointY += star.velocity;
        }
        
        star.rotate = star.rotate*1.002 % 2;
        // drawStar(star.pointX, star.pointY, 5, star.outerRadius, star.innerRadius, star.rotate);
        drawStar(star.pointX, star.pointY, star.outerRadius);
    });
    contextSpace.stroke();

}



