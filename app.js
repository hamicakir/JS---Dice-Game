/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//Define Default Variable
var scores, roundScore, activePlayer,gamePlaying;

/*
  Base Functions
*/
function createRandomNumber(){
  return Math.floor(Math.random() * 6) + 1;
}
function nextPlayer(){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  currentOneScore.textContent = "0";
  currentTwoScore.textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}


// document.querySelector("#current-" + activePlayer).textContent = dice;

/*
  Select DOM Elements
 */
// var x = document.querySelector("#score-" + activePlayer).textContent;
// console.log(x);

var diceImage = document.querySelector(".dice");
var rollButton = document.querySelector(".btn-roll");
var holdButton = document.querySelector(".btn-hold");
var newGameButton = document.querySelector(".btn-new");
var playerOneScore = document.getElementById("score-0");
var playerTwoScore = document.getElementById("score-1");
var currentOneScore = document.getElementById("current-0");
var currentTwoScore = document.getElementById("current-1");

/*  Set All scores and currenrt values to 0 */

init();

/******************
* Event Listeners
******************/

rollButton.addEventListener("click",function(){
  if(gamePlaying){
    // Create Random Number
    var dice = createRandomNumber();
    // Display the random number on screen
    diceImage.src = "dice-" + dice + ".png";
    diceImage.style.display = "block";

    // Update to score if not 0. if score is 0 change to player.
    if(dice !== 1 ){
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).innerHTML = roundScore;
    }else{
      nextPlayer();
    }
  }
});

holdButton.addEventListener("click",function(){
  // Add current score to active player scores
  scores[activePlayer] += roundScore;
  //Update user interfaces
  document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
  // Check anyone win game
  if(scores[activePlayer] >= 100){
    document.querySelector("#name-" + activePlayer).textContent = "Winner";
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    gamePlaying = false;
  }else{
    nextPlayer();
  }
});
newGameButton.addEventListener("click", init);

function init(){
  scores = [0 , 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  diceImage.style.display = "none";
  playerOneScore.textContent = "0";
  playerTwoScore.textContent = "0";
  currentOneScore.textContent = "0";
  currentTwoScore.textContent = "0";
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

}
