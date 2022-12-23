const yourChoice = document.getElementById("yourChoice");
const computerChoice = document.getElementById("computerChoice");
const winner = document.getElementById("winner");
const reset = document.getElementById("reset");
const resultDiv = document.getElementById("resultDiv");

let gameDiv = document.getElementById("gameDiv");
let images = document.querySelectorAll("img");

let win = 0;
let lose = 0;
let draw = 0;
const winCounts = document.getElementById("winCount");
const drawCoutns = document.getElementById("drawCount");
const loseCounts = document.getElementById("loseCount");

let choices = ["rock", "paper", "scissors"];

const rockLocation = "rock.webp";
const paperLocation = "paper.jpg";
const scissorsLocation = "scissors.jpg";

images.forEach((img) => {
  img.addEventListener("click", () => {
    game(img.id);
  });
});

function game(name) {
  let you = name;
  let pc = choices[Math.floor(Math.random() * 3)];
  let theWinner = determineWinner(you, pc);

  yourChoice.innerHTML = you;
  computerChoice.innerHTML = pc;
  winner.innerHTML = determineWinner(you, pc);

  updateScore(theWinner);
  displayChoices(you, pc);

  setTimeout(() => {
    updateUI();
    yourChoice.innerHTML = "";
    computerChoice.innerHTML = "";
    winner.innerHTML = "";
  }, 2000);
}

function updateScore(winner) {
  if (winner === "YOU") {
    win++;
    winCounts.innerHTML = win;
  }

  if (winner === "PC") {
    lose++;
    loseCounts.innerHTML = lose;
  }

  if (winner === "draw") {
    draw++;
    drawCoutns.innerHTML = draw;
  }
}

function determineWinner(you, pc) {
  if (you === pc) return "draw";
  if (you === "rock" && pc === "scissors") return "YOU";
  if (you === "rock" && pc === "paper") return "PC";
  if (you === "paper" && pc === "rock") return "YOU";
  if (you === "paper" && pc === "scissors") return "PC";
  if (you === "scissors" && pc === "rock") return "PC";
  if (you === "scissors" && pc === "paper") return "YOU";
}

reset.addEventListener("click", () => {
  window.location.reload();
});

function displayChoices(you, pc) {
  let yourImg;
  let pcImg;

  if (you === "rock") yourImg = rockLocation;
  if (you === "paper") yourImg = paperLocation;
  if (you === "scissors") yourImg = scissorsLocation;

  if (pc === "rock") pcImg = rockLocation;
  if (pc === "paper") pcImg = paperLocation;
  if (pc === "scissors") pcImg = scissorsLocation;

  gameDiv = document.getElementById("gameDiv");
  gameDiv.innerHTML = "";
  gameDiv.setAttribute("class", "gameEnd");
  gameDiv.appendChild(createImageDiv(yourImg).div);
  gameDiv.appendChild(createImageDiv(pcImg).div);
}

function createImageDiv(url, id) {
  const div = document.createElement("div");
  const image = document.createElement("img");
  div.appendChild(image);
  image.src = url;
  if (id) image.setAttribute("id", id);
  return { div, image };
}

function updateUI() {
  document.getElementById("gameDiv").remove();
  const div = document.createElement("div");
  div.setAttribute("id", "gameDiv");
  div.setAttribute("class", "game");

  div.appendChild(createImageDiv("rock.webp", "rock").image);
  div.appendChild(createImageDiv("paper.jpg", "paper").image);
  div.appendChild(createImageDiv("scissors.jpg", "scissors").image);

  document.body.insertBefore(div, resultDiv);
  images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("click", () => {
      game(img.id);
    });
  });
}
