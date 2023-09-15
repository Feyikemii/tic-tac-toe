const cells = document.querySelectorAll(".cells");
const cellContainer = document.querySelector("#cell-container");
const statusMsg = document.querySelector("#statusMsg");
const restartBtn = document.querySelector("#restartBtn");
const statusText = document.querySelector("#statusText");
const xWinsElement = document.querySelector("#xWins");
const yWinsElement = document.querySelector("#yWins");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let running = false;
startGame();

function startGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const dataCell = this.getAttribute("dataCell");

  if (options[dataCell] != "" || !running) {
    return;
  }

  updateCell(this, dataCell);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

// amount of X and Y wins
let xWins = 0;
let yWins = 0;

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC && cellA !== "") {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} is the winner!`;
    if (currentPlayer.toLowerCase() === "x") {
      xWins = xWins + 1;
      xWinsElement.textContent = xWins;
    } else {
      yWins = yWins + 1;
      yWinsElement.textContent = yWins;
    }

    console.log("X has won: ", xWins);
    console.log("Y has won: ", yWins);

    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `yo! It's a Draw!`;
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}
