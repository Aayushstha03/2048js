var board;
var score = 0;
var rows = 4;
var columns = 4;
var animationTime = 0.3;
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
      tile.id = "t" + r.toString() + "-" + c.toString(); //with id
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
function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
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
      a = choose(["2", "2", "2", "2", "2","2","2", "4"])
      board[r][c] = parseInt(a);
      let tile = document.getElementById("t" + r.toString() + "-" + c.toString());
      tile.innerText = a;
      tile.classList.add("x" + a);
      setTimeout(() => tile.classList.add("new"), (animationTime - .1) * 1000)

      found = true;
    }
  }
}
function filterZero(row) {
  return row.filter((num) => num != 0); //create a new array without zeroes
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
      setTwo(slideLeft()
      ); /* right swipe */
    } else {
      setTwo(slideRight());/* left swipe */
    }
  } else {
    if (yDiff > 0) {

      setTwo(slideUp());
      /* down swipe */
    } else {

      setTwo(slideDown());  /* up swipe */
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
  document.getElementById("score").innerText = score;
  setTimeout(() => { clearAllTileStyle(); }, 1000);

};
function slideanim(orientation) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        if (orientation == 0) {
          if (i != 0) {
            if (board[i - 1][j] == 0 || board[i][j] == board[i - 1][j]) {
              var x = 0
              for (n = 0; n < i; n++) {
                if (board[n][j] == board[i][j] || board[n][j] == 0) {
                  x++;
                }
              }
              document.getElementById("t" + parseInt(i - x) + "-" + j).style = "--bs:" + 100 * x + "px; animation:slideup " + animationTime + "s;";
              // document.getElementById("t"+i+"-"+column).style=" animation:new .5s;";
            }
          }
        }
        else if (orientation == 1) {
          if (j != 0) {
            if (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1]) {//&& board[i][j] != 0 && j != 0  && board[i-1][j]!=0
              var x = 0
              for (n = 0; n < j; n++) {
                if (board[i][n] == board[i][j] || board[i][n] == 0) {
                  x++;
                }
              }
              document.getElementById("t" + i + "-" + parseInt(j - x)).style = "--bs:" + 100 * x + "px; animation:slideleft " + animationTime + "s;";
              //document.getElementById("t"+column+"-"+i).style=" animation:new 1s;"
            }
          }
        }
        else if (orientation == 2) { // && board[opposite(i)][j] != 0 && j != 3  && board[i+1][j]!=0
          if (i != 3) {

            if (board[i][j + 1] == 0 || board[i][j] == board[i][j + 1]) {
              var x = 0
              for (var n = 3; n > j; n--) {

                if (board[i][n] == board[i][j] || board[i][n] == 0) {
                  x++;
                }
              }
              document.getElementById("t" + parseInt(i) + "-" + parseInt(j + x)).style = "--bs:" + 100 * x + "px; animation:slideright " + animationTime + "s;";
              // document.getElementById("t"+i+"-"+column).style=" animation:new .5s;";
            }
          }
        }
        else if (orientation == 3) { // && board[i][j] != 0 && i != 3  && board[i][j+1]!=0
          if (i != 3) {

            if (board[i + 1][j] == 0 || board[i][j] == board[i + 1][j]) {
              var x = 0
              for (var n = 3; n > i; n--) {

                if (board[n][j] == board[i][j] || board[n][j] == 0) {
                  x++;
                }
              }
              document.getElementById("t" + parseInt(i + x) + "-" + j).style = "--bs:" + 100 * x + "px; animation:slidedown " + animationTime + "s;";
              // document.getElementById("t"+i+"-"+column).style=" animation:new .5s;";
            }
          }
        }
      }
    }
  }
}
function slide(row, column, orientation) {
  slideanim(orientation);

  row = filterZero(row); //step 1 no zero
  //2. sliding
  for (let i = 0; i < row.length - 1; i++) {
    //-1 because we are checking the first term
    //and we do not go out of bounds
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
      doubled.push(i)
      //orientations= 0 up 1 left 2 right 3 down
      if (orientation == 0) {
        // document.getElementById("t"+i+"-"+column).style="--bs:300px; animation:slideleft .4s;";
        setTimeout(() => document.getElementById("t" + i + "-" + column).style = " animation:new .3s;", (animationTime - .1) * 1000);
      }
      else if (orientation == 1) {
        // document.getElementById("t"+column+"-"+i).style="--bs:300px; animation:slideleft .4s;";
        setTimeout(() => document.getElementById("t" + column + "-" + i).style = " animation:new .3s;", (animationTime - .1) * 1000);


      }
      else if (orientation == 2) {
        // document.getElementById("t"+column+"-"+i).style="--bs:300px; animation:slideleft .4s;";
        setTimeout(() => document.getElementById("t" + column + "-" + opposite(i)).style = " animation:new .3s;", (animationTime - .1) * 1000);


      }
      else {
        // document.getElementById("t"+column+"-"+i).style="--bs:300px; animation:slideleft .4s;";
        setTimeout(() => document.getElementById("t" + opposite(i) + "-" + column).style = " animation:new .3s;", (animationTime - .1) * 1000);
      }
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
function opposite(n) {
  a = [3, 2, 1, 0];
  return a[n];

}


function slideUp() {
  let oldboard = JSON.parse(JSON.stringify(board));

  for (let c = 0; c < columns; c++) {

    //taking transpose
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    //slode
    row = slide(row, c, 0);
    //reasssigning appropriate value
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById("t" + r.toString() + "-" + c.toString());
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

function slideLeft() {
  let oldboard = JSON.parse(JSON.stringify(board));

  for (let r = 0; r < rows; r++) {
    doubled = [];

    let row = board[r];
    row = slide(row, r, 1); //function slide reassigns value!
    board[r] = row;

    //after sliding we need to update the board in the page itself
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById("t" + r.toString() + "-" + c.toString());
      let num = board[r][c];
      if (c in doubled) {
        extraclass = "doubled"
      }
      updateTile(tile, num);
      extraclass = ""
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
    doubled = [];
    let row = board[r];
    //reverse the array
    row.reverse();
    row = slide(row, r, 2); //slide left again
    //reverse again so technically slid right
    row.reverse();
    board[r] = row;


    //after sliding we need to update the board in the page itself
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById("t" + r.toString() + "-" + c.toString());
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
    row = slide(row, c, 3);
    //reasssigning appropriate value
    row.reverse();
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById("t" + r.toString() + "-" + c.toString());
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


function clearAllTileStyle() {
  for (let r = 0; r < 4; r++) {
    for (var c = 0; c < 4; c++) {
      document.getElementById("t" + r.toString() + "-" + c.toString()).style = "";
    }
  }
}
timer = setTimeout(() => { clearAllTileStyle(); }, 1000);

document.addEventListener("keyup", (e) => {
  clearTimeout(timer);
  if (e.code == "ArrowLeft") {

    setTwo(slideLeft());
    //after every successful movement add a tile
  }
  if (e.code == "ArrowRight") {

    setTwo(slideRight());
  }
  if (e.code == "ArrowUp") {

    setTwo(slideUp());
  }
  if (e.code == "ArrowDown") {

    setTwo(slideDown());
  }
  document.getElementById("score").innerText = score;
  //  clearAllTileStyle();
  timer = setTimeout(() => { clearAllTileStyle(); }, 400);

});

