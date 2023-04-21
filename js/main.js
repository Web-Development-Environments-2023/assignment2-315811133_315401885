var space;
var contextSpace;

var intervalTimer;
var intervalGameEvents;
var intervalMusic;

var roundTimer = 2*60*1000;
var timerDisplay;

var aboutModal;
var scoreboard = [];
var scoreboardDisplay;

var enemyExplodeSound;
var spaceshipExplodeSound;
var spaceshipShootSound;
var enemyHitSound;
const menuSound = "audio/space-120280.mp3";
const gameSound = "audio/cyberpunk-2099-10701.mp3";
var music;

var healthBar;
var content;
var game;
var time;
var endgameDisplay;
var endgameDisplayContent;

var score;
var scoreTag;
var healthTag;


const accounts = [{username: "p",password: 'testuser'}];
localStorage.setItem("Accounts", JSON.stringify(accounts));


$(document).ready(function() {
    space = document.getElementById("space");

    space.style.width='100%';
    space.style.height='100%';
    space.width  = space.offsetWidth;
    space.height = space.offsetHeight;

    contextSpace = space.getContext("2d");

    scoreTag = document.getElementById("score");
    healthTag = document.getElementById("health");   
    timerDisplay = document.getElementById("timer");
    aboutModal = document.getElementById("about-modal");
    scoreboardDisplay = document.getElementById("scoreboard");
    content = document.getElementById("container");
    game = document.getElementById("game");
    endgameDisplay = document.getElementById("endGame");
    endgameDisplayContent = document.getElementById("endGame-content");


    enemyExplodeSound = document.getElementById("enemyKilled");
    spaceshipExplodeSound = document.getElementById("spaceshipExplosion");
    spaceshipShootSound = document.getElementById("spaceshipShoot");
    enemyHitSound = document.getElementById("enemyHit");
    music = document.getElementById("music");
          
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    menuSpaceOn();
})

window.onclick = (event) => {
    if(event.target == aboutModal){
        aboutToggle();
    }

    if(event.target == scoreboardDisplay){
        scoreboardToggle();
    }

    if(event.target == endgameDisplay){
        endgameToggle();
    }
}


function menuSpaceOn(){
    createStars(20);

    clearInterval(intervalGameEvents);      

    intervalGameEvents = setInterval(() => {
        contextSpace.clearRect(0, 0, space.width, space.height);
        updateStarPosition();
    }, 3);

}

function setTimer(timeString){
    let timeValue = timeString.split('\:');
    let minutes = parseInt(timeValue[0]);
    let seconds = parseInt(timeValue[1]);

    roundTimer = minutes*60*1000 + seconds*1000;
}

function menuSpaceOff(){
    clearInterval(intervalGameEvents);      
}

function changeMusic(src){
    music.pause();
    music.setAttribute('src', src);
    music.load();
    music.play();
}

function startGame(){
    changeMusic(gameSound);

    content.style.display = "none";
    game.style.display = "";

    createTrail();
    setupEnemy(4, 5);
    
    healthBar = 3;
    score = 0;

    scoreTag.textContent = `Score: ${score}`;
    healthTag.textContent = '🚀'.repeat(healthBar);

    menuSpaceOff();
    pauseOrplay();
}

function endGame(){
    changeMusic(menuSound);
    
    pauseOrplay();
    menuSpaceOn();

    addToScoreboard();
    generateScoreboard();
    scoreboardToggle();

    game.style.display = "none";   
    content.style.display = "";

}

function addRowToScoreboardTable(username, score, time, health, place){    
    var username_td = document.createTextNode(username)  
    var score_td = document.createTextNode(score);
    var health_td = document.createTextNode(health  != 0 ? '🚀'.repeat(health): '🤔');
    var time_td = document.createTextNode(time);


    var scoreboard_b = scoreboardDisplay.getElementsByTagName('tbody')[0];
    var scoreboard_row = scoreboard_b.insertRow();

    var username_cell = scoreboard_row.insertCell();
    var score_cell = scoreboard_row.insertCell();
    var time_cell = scoreboard_row.insertCell();
    var health_cell = scoreboard_row.insertCell();

    username_cell.appendChild(username_td);
    score_cell.appendChild(score_td);
    health_cell.appendChild(health_td);
    time_cell.appendChild(time_td);

    if(place == scoreboard.length){
        scoreboard_row.style.background = "rgb(208, 218, 225)";
        scoreboard_row.style.color = "black";
    }
}


function generateScoreboard(){
    $('#scoreboard-tb tr:not(:first)').remove();

    scoreboard.forEach(row => {
        addRowToScoreboardTable(row[0], row[1], row[2], row[3], row[4]);
    });
}


function addToScoreboard(){
    var username = currentUser.username; // understand how to store the current logged user.
    var health_td = healthBar;
    var score_td = score;
    var time_td = timerDisplay.innerHTML;

    scoreboard.push([username, score_td, time_td, health_td, scoreboard.length+1]);
    scoreboard.sort((a,b) => {
        return b[2].localeCompare(a[2]);
    });
}



function pauseOrplay(){
    const play = document.getElementById("play");
    setSpaceship();
    enemyBullet = {x: space.width / 2, y: space.height};


    if(!gameState){
        createStars(10);
        var increaseCount = 0;
        var timePassed = 0;

        intervalGameEvents = setInterval(() => {

            contextSpace.clearRect(0, 0, space.width, space.height);
            updateStarPosition();
            updateBrigade();
            updateTrailPosition();
            updateFirePositions();
            updateEnemyFirePositions();
            updateSpaceshipPositions();
            handleEvents();

            timePassed++;

            if(increaseCount < 4 && timePassed % 5000 == 0){
                increaseSpeed(0.35);
                increaseCount++;
            }
        }, 5);

   
        play.innerHTML = "Pause";

        time = roundTimer;
        intervalTimer = setInterval(() => {
            var minutes = Math.floor(time / (1000*60)).toString().padStart(2, 0);
            var seconds = Math.floor((time % (60*1000)/ 1000)).toString().padStart(2, 0);

            timerDisplay.innerHTML = `${minutes}:${seconds}`;
            time = time - 1000;

        }, 1000);

        gameState = true;

    }else{
        clearInterval(intervalTimer);
        clearInterval(intervalGameEvents)

        play.innerHTML = "Play";
        gameState = false;
    }  
}

function handleEvents(){
    
    if(enemeis_killed == 20){
        endgameDisplayContent.innerHTML = `(☞ﾟヮﾟ)☞  Champion! ☜(ﾟヮﾟ☜) <br>Score: ${score}`;
        endgameDisplayContent.style.color = "green";
        endgameToggle(); // won
    }

    else if(healthBar == 0){
        endgameDisplayContent.innerHTML = `You Lost <br>(╯°□°）╯︵ ┻━┻<br>Score: ${score}`;
        endgameDisplayContent.style.color = "Red";
        endgameToggle(); // lost
    }

    else if(time <= 0){
        if(score >= 100 ){
            endgameDisplayContent.innerHTML = `🎉Winner!🎉<br> Score: ${score}`;
            endgameDisplayContent.style.color = "green";
            endgameToggle(); // won
        }else{
            endgameDisplayContent.innerHTML = `You Can Do Better<br> ¯\_(ツ)_/¯<br>Score: ${score}`;
            endgameDisplayContent.style.color = "Red";
            endgameToggle(); // lost
        }
    }
}


function endgameToggle(){
    var endgame = document.getElementById("endGame");
    if (endgame.style.display === "none") {
        endgame.style.display = "";
        endGame();
    } else {
        endgame.style.display = "none";
    }
}

