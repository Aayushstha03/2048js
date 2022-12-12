var board;
var score = 0;
var rows = 4;
var columns = 4;

//when the page loads
window.onload = function () {
  setGame();
};

function setGame() {
  //board = [
  //  [0, 0, 0, 0],
  //  [0, 0, 0, 0],
  //  [0, 0, 0, 0],
  //  [0, 0, 0, 0],
  //];

  board = [
    [2, 2, 0, 0],
    [2, 2, 0, 0],
    [4, 4, 0, 0],
    [0, 0, 8, 8],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div"); //create a div for every element
      tile.id = r.toString() + "-" + c.toString(); //with id
      let num = board[r][c];
      updateTile(tile, num); //function to update tile
      document.getElementById("board").append(tile);
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = ""; //clearing current tile text
  tile.classList.value = ""; //clearing current tile class
  tile.classList.add("tile"); //retianing the class tile for basic styling

  if (num > 0) {
    tile.innerText = num; //set inner text as current value
    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
  }
  if (e.code == "ArrowRight") {
    slideRight();
  }
  if (e.code == "ArrowUp") {
    slideUp();
  }
  if (e.code == "ArrowDown") {
    slideDown();
  }
});

function filterZero(row) {
  return row.filter((num) => num != 0); //create a new array without zeroes
}

function slide(row) {
  row = filterZero(row); //step 1 no zero

  //2. sliding
  for (let i = 0; i < row.length - 1; i++) {
    //-1 because we are checking the first term
    //and we do not go out of bounds
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    }
  }
  //remove new zeroes
  row = filterZero(row);
  //adding zeroes to the end
  while (row.length != columns) {
    row.push(0);
  }

  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row); //function slide reassigns value!
    board[r] = row;

    //after sliding we need to update the board in the page itself
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    //reverse the array
    row.reverse();
    row = slide(row); //slide left again
    //reverse again so technically slode right
    row.reverse();
    board[r] = row;

    //after sliding we need to update the board in the page itself
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    //taking transpose
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    //slode
    row = slide(row);
    //reasssigning appropriate value
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    //taking transpose
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    //slode
    row = slide(row);
    //reasssigning appropriate value
    row.reverse();
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}
