var board;
var score = 0;
var rows = 4;
var columns = 4;

//when the page loads
window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
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
  setTwo();
  setTwo();
}

function emptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
  return false;
}


function setTwo(change = true) {
  if (!emptyTile() || !change) {
    return;
  }

  let found = false;

  while (!found) {
    //find random row and column to place a 2 in
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
      found = true;
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

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
    evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
    if (xDiff > 0) {
      slideLeft();
      setTwo(); /* right swipe */
    } else {
      slideRight();
      setTwo();/* left swipe */
    }
  } else {
    if (yDiff > 0) {
      slideUp();
      setTwo();
      /* down swipe */
    } else {
      slideDown();
      setTwo();  /* up swipe */
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
};


document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {

    setTwo(slideLeft());
    //after every successful movement add a tile
  }
  if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
  }
  if (e.code == "ArrowUp") {
    slideUp();
    setTwo();
  }
  if (e.code == "ArrowDown") {
    slideDown();
    setTwo();
  }
  document.getElementById("score").innerText = score;
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
  let oldboard = JSON.parse(JSON.stringify(board));

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
  let newboard = JSON.parse(JSON.stringify(board));

  if (oldboard.join() === newboard.join()) {
    return false;
  }
  else {
    return true;
  }
}

function slideRight() {
  let oldboard = JSON.parse(JSON.stringify(board));

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
  let newboard = JSON.parse(JSON.stringify(board));

  if (oldboard.join() === newboard.join()) {
    return false;
  }
  else {
    return true;
  }
}

function slideUp() {
  let oldboard = JSON.parse(JSON.stringify(board));

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
  let newboard = JSON.parse(JSON.stringify(board));

  if (oldboard.join() === newboard.join()) {
    return false;
  }
  else {
    return true;
  }
}

function slideDown() {
  let oldboard = JSON.parse(JSON.stringify(board));

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
  let newboard = JSON.parse(JSON.stringify(board));

  if (oldboard.join() === newboard.join()) {
    return false;
  }
  else {
    return true;
  }
}
