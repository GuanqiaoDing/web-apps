var btn1 = document.querySelector("#btn1");
var btn2 = document.querySelector("#btn2");
var displays = document.querySelectorAll("#score span");
var btnReset = document.querySelector("#reset");
var title = document.querySelector("#scoreboard h2");
var input = document.querySelector("#set_total");
var displayTotal = document.querySelector("#display_total");
var scores = [0, 0];
var gameOver = false;
var winnerScore = -1;

input.addEventListener("change", function () {
  if (this.value !== "" && this.value > 0) {
    displayTotal.textContent = " " + this.value;
    winnerScore = Math.ceil(this.value / 2);
  } else {
    displayTotal.textContent = "__";
    winnerScore = -1;
  }
  reset();
});

btn1.addEventListener("click", function () {
  updateScore(0);
});

btn2.addEventListener("click", function () {
  updateScore(1);
});

btnReset.addEventListener("click", function () {
  reset();
});

function updateScore (index) {
  if (winnerScore === -1) {
    alert("Please set the total number of games!");
    return;
  }
  if (!gameOver) {
    displays[index].textContent = ++scores[index];
  }
  if (scores[index] === winnerScore) {
    gameOver = true;
    displays[index].style.color = "#14439c";
    title.textContent = "Player" + (index + 1) + " won!";
    title.style.color = "#14439c";
  }
}

function reset () {
  gameOver = false;
  scores[0] = scores[1] = 0;
  displays[0].textContent = 0;
  displays[1].textContent = 0;
  displays[0].style.color = "black";
  displays[1].style.color = "black";
  title.style.color = "black";
  title.textContent = "SCOREBOARD";
}