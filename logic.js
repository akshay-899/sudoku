var numSelected = null;
var tileSelected = null;

var errors = 0;

var board = [
  "-1-967--3",
  "3571829-4",
  "68-------",
  "-----4-31",
  "--671-85-",
  "-2--58479",
  "-----9-48",
  "5-28--796",
  "-3----2-5",
];

var solution = [
  "214967583",
  "357182964",
  "689345127",
  "875294631",
  "496713852",
  "123658479",
  "761529348",
  "542831796",
  "938476215",
];

window.onload = function () {
  setGame();
};

function setGame() {
  // for bottom digits ie to select
  for (let i = 1; i <= 9; i++) {
    let number = document.createElement("div");
    number.id = i.toString();
    number.innerText = i;
    number.addEventListener("click", selectNumber);
    number.classList.add("number");
    document.getElementById("digits").appendChild(number);
  }

  // board matrix 9x9
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      if (board[r][c] != "-") {
        tile.innerText = board[r][c];
        tile.classList.add("tile-start");
      }
      // to show horizontal line
      if (r == 2 || r == 5) {
        tile.classList.add("horizontal-line");
      }
      // to show vertical line
      if (c == 2 || c == 5) {
        tile.classList.add("vertical-line");
      }
      tile.addEventListener("click", selectTile);
      tile.classList.add("tile");
      document.getElementById("board").appendChild(tile);
    }
  }
}

function selectNumber() {
  if (numSelected != null) {
    numSelected.classList.remove("number-selected");
  }
  numSelected = this;
  numSelected.classList.add("number-selected");
}

function selectTile() {
  if (numSelected) {
    if (this.innerText != "") {
      return;
    }
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (solution[r][c] == numSelected.id) {
      this.innerText = numSelected.id;
      checkCompletion();
    } else {
      errors += 1;
      document.getElementById("errors").innerText = errors;
      if (errors >= 10) {
        alert("Try again");
        location.reload();
      }
    }
  }
}
function checkCompletion() {
  let tiles = document.querySelectorAll(".tile");
  for (let tile of tiles) {
    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (tile.innerText != solution[r][c]) {
      return;
    }
  }
  alert("Good Job :)");

  // Clear the entire body content
  document.body.innerHTML = "";
  let link = document.createElement("a");
  link.href = "https://www.sudoku.com";
  link.innerText = "Click here to solve more";
  link.style.fontSize = "24px";
  link.style.display = "flex";
  link.style.justifyContent = "center";
  link.style.alignItems = "center";
  link.style.marginTop = "300px";
  link.style.color = "white";
  link.style.textDecoration = "none";

  document.body.appendChild(link);
}
