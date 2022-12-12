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
});

function slide(row){
  
}

function slideLeft() {
  for(let r=0;r<rows;r++){
    let row = board[r];
    row = slide(row);//function slide reassigns value!
    board[r] = row;
  }
}
