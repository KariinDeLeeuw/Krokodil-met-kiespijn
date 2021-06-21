const transparentTanden = document.querySelectorAll('.tand.transparent-tand');
const whiteTanden = document.querySelectorAll('.tand.white-tand');
const playerInput = document.querySelectorAll('.player-input');

var crocintro = new Audio(src="sound/crocintro.mp3");
var crocsnap = new Audio(src="sound/crocsnap.mp3");

let gameStatus = false;
let players = [];
let playerTurn = 0;
let activeBar;
let verkeerdeTand; 

function newGame() {
    gameStatus = true;
    document.getElementById('boven-kaak').classList.remove('gehapt');
    for(let t = 0; t < whiteTanden.length; t++) {
        whiteTanden[t].classList.remove("geklikttand");
    };
    getPlayers();
    playerTurn = 0;
    verkeerdeTand = Math.floor(Math.random()*6);
    activeBar = document.querySelectorAll('.player-active-mark');
    activeBar[0].classList.add('active');
    document.getElementById('game-start').classList.remove('sidebar-item-active');
    document.getElementById('game-active').classList.add('sidebar-item-active');
    crocintro.play();
}

function getPlayers() {
    let playersString = "";
    for (let p = 0; p < playerInput.length; p++) {
        if (playerInput[p].value != "") {
            players.push(playerInput[p].value);

            playersString +=
            `
            <div class="player-item">
                <div class="player-number">Player ${p+1}</div>
                <div class="player-name">${playerInput[p].value}</div>
                <div class="player-active-mark"></div>
            </div>
            `
        }
    }
    document.getElementById('players-wrapper').innerHTML = playersString;
}

for (let i = 0; i < transparentTanden.length; i++) {
  transparentTanden[i].addEventListener('mouseover', function() {
    mouseOverTand(i);
  });
  transparentTanden[i].addEventListener('mouseout', function(){
      mouseOutTand(i);
  });
  transparentTanden[i].addEventListener('click', function(){
      clickTand(i);
  });
}

function mouseOverTand(i) {
  console.log(i);
  whiteTanden[i].classList.add("hovertand");
}
function mouseOutTand(i) {
    whiteTanden[i].classList.remove("hovertand");
}

function clickTand(i) {
    if (gameStatus == true) {
        whiteTanden[i].classList.add("geklikttand");
        if (verkeerdeTand == i) {
            document.getElementById('boven-kaak').classList.add('gehapt');
            crocsnap.play();
            gameStatus = false;
        }
        if (gameStatus == true) {
            for (let a = 0; a < activeBar.length;a++) {
              activeBar[a].classList.remove('active');
            }
            playerTurn++;
            if (playerTurn > (players.length-1)) {
                playerTurn = 0;
            }
            activeBar[playerTurn].classList.add('active');
        }
    } else {
        alert("start a new game")
    }
    if (gameStatus == false) {
        setTimeout(() => {
            alert(players[playerTurn] + " has lost the game!");
            alert("Start new game (Restart button), or stop game for new players (Stop button)")     
        }, 360);
    }
}

function stopGame() {
    gameStatus = false;
    document.getElementById('game-start').classList.add('sidebar-item-active');
    document.getElementById('game-active').classList.remove('sidebar-item-active');
}