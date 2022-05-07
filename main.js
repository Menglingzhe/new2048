var board = new Array;
var score = 0;
$(document).ready(function () {
  prepareForMobile();
  newgame();
});

function prepareForMobile() {
  if (documentWidth > 500) {
    gridContainerwidth = 500;
    cellSpace = 20;
    cellsideLength = 100;
  }
  $('#grid-container').css('width', gridContainerwidth - 2 * cellSpace);
  $('#grid-container').css('height', gridContainerwidth - 2 * cellSpace);
  $('#grid-container').css('padding', cellSpace);
  $('#grid-container').css('border-radius', 0.02 * gridContainerwidth);

  $('.grid-cell').css('width', cellsideLength);
  $('.grid-cell').css('height', cellsideLength);
  $('.grid-cell').css('border-radius', 0.2 * cellsideLength);
}

function newgame() {
  // alert("游戏结束,得分："+score);
  init();
  rodnumCell();
  rodnumCell(); //初始有两个新格子
  // for (let i of board) console.log(i)
}
var hasband = new Array() //标记已经碰撞

function init() { //初始化框子
  for (let i = 0; i < 4; i++) { //计算位置
    for (let j = 0; j < 4; j++) {
      let gridcell = $("#grid-cell-" + i + "-" + j);
      gridcell.css('top', getPosTop(i))
      gridcell.css('left', getPosLeft(j))
    }
  }
  for (let i = 0; i < 4; i++) { //模拟数组
    board[i] = new Array;
    hasband[i] = new Array;
    for (let j = 0; j < 4; j++) {
      board[i][j] = 0;
      hasband[i][j] = false;
    }
  }
  updatecell();
  var score = 0;
}

function updatecell() { //重绘元素
  $(".num-cell").remove();
  for (let i = 0; i < 4; i++) { //计算位置
    for (let j = 0; j < 4; j++) {
      $("#grid-container").append('<div class="num-cell" id="num-cell-' + i + '-' + j + '"></div>');
      let thisnumcell = $("#num-cell-" + i + "-" + j);
      if (board[i][j] == 0) {
        // $("#thisnumcell").remove();
        thisnumcell.css({
          'width': '0',
          'height': '0'
        });
        thisnumcell.css('top', getPosTop(i) + cellsideLength / 2);
        thisnumcell.css('left', getPosLeft(j) + cellsideLength / 2);
      } else {
        thisnumcell.css('width', cellsideLength);
        thisnumcell.css('height', cellsideLength);
        thisnumcell.css('top', getPosTop(i));
        thisnumcell.css('left', getPosLeft(j));
        thisnumcell.css('background-color', getNumberBackgroundColor(board[i][j]));
        thisnumcell.css('color', getNumberColor(board[i][j]));
        // thisnumcell.css('border-radius', 0.02 * cellsideLength);
        thisnumcell.text(board[i][j]);
      }
      hasband[i][j] = false;
    }
  }
  $(".num-cell").css('line-height', cellsideLength + 'px')
  $(".num-cell").css('font-size', 0.6 * cellsideLength + 'px')
}

function rodnumCell() { //生成随机格子
  if (nospeace(board)) return false; //确保一定存在空格子
  let locx = parseInt(Math.floor(Math.random() * 4))
  let locy = parseInt(Math.floor(Math.random() * 4)) //生成xy坐标
  let times = 0
  while (times < 50) {
    if (board[locx][locy] == 0) break; //找到了空格子
    locx = parseInt(Math.floor(Math.random() * 4))
    locy = parseInt(Math.floor(Math.random() * 4)) //重新生成xy坐标
    times++;
  }
  if (times == 50) {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        if (board[i][j] == 0) {
          locx = i;
          locy = j;
        }
      }
  }
  let innerValue = parseInt(Math.ceil(Math.random() * 2)) * 2 //随机生成2或者4
  board[locx][locy] = innerValue //填入数字
  showNumAni(locx, locy, innerValue) //动画填入
  return true;
}
$(document).keydown(function (event) {
  event.preventDefault();
  switch (event.keyCode) {
    case 37: //left
      if (moveLeft()) {
        // console.log("@")
        setTimeout("rodnumCell()", 210);
        setTimeout("isgameover()", 300);
      }
      break;
    case 38: //up
      if (moveUp()) {
        setTimeout("rodnumCell()", 210);
        setTimeout("isgameover()", 300);
      }
      break;
    case 39: //right
      if (moveRight()) {
        setTimeout("rodnumCell()", 210);
        setTimeout("isgameover()", 300);
      }
      break;
    case 40: //down
      if (moveDown()) {
        setTimeout("rodnumCell()", 210);
        setTimeout("isgameover()", 300);
      }
      break;
    default: //default
      // console.log("@")
      break;
  }
  // setTimeout("for (let i of board) console.log(i)",210);
});
document.addEventListener('touchstart', function (event) {
  startX = event.touches[0].pageX;
  startY = event.touches[0].pageY;

});
document.addEventListener('touchmove', e => {
  e.preventDefalut();
}, {
  passive: false
})
document.addEventListener('touchend', function (event) {

  endX = event.changedTouches[0].pageX;
  endY = event.changedTouches[0].pageY;
  // console.log(startX, startY, endX, endY)
  deltaX = endX - startX;
  deltaY = endY - startY;
  // console.log(deltaX, deltaY)
  if (Math.abs(deltaX) < 0.3 * documentWidth && Math.abs(deltaY) < 0.3 * documentWidth) return; //去除点击
  else {
    if (Math.abs(deltaX) > Math.abs(deltaY)) { //识别为x方向
      if (deltaX < 0) {
        if (moveLeft()) {
          setTimeout("rodnumCell()", 210);
          setTimeout("isgameover()", 300);
        }
      } else {
        if (moveRight()) {
          setTimeout("rodnumCell()", 210);
          setTimeout("isgameover()", 300);
        }
      }
    } else {
      if (deltaY < 0) {
        if (moveUp()) {
          setTimeout("rodnumCell()", 210);
          setTimeout("isgameover()", 300);
        }
      } else {
        if (moveDown()) {
          setTimeout("rodnumCell()", 210);
          setTimeout("isgameover()", 300);
        }
      }
    }
  }
});

function isgameover() {
  if (nospeace(board) && nomove(board)) {
    gameover();
  }
}



function gameover() {
  alert("游戏结束,得分：" + score);
  newgame();
}

function moveLeft() {
  if (!canLeft(board)) return false;
  for (let i = 0; i < 4; i++) { //计算位置
    for (let j = 1; j < 4; j++) {
      if (board[i][j] != 0) {
        for (let k = 0; k < j; k++) {
          if (board[i][k] == 0 && noBlockH(i, k, j, board)) {
            moveAnmt(i, j, i, k); //动画
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          } else if (board[i][k] == board[i][j] && noBlockH(i, k, j, board) && !hasband[i][k]) {
            moveAnmt(i, j, i, k)
            board[i][k] += board[i][j];
            board[i][j] = 0;
            score += board[i][k];
            hasband[i][k] = true;
            updatescore(score)
            continue;
          }
        }
      }
    }
  }
  setTimeout("updatecell()", 200)
  return true;
}

function moveRight() {
  if (!canRight(board)) return false;
  for (let i = 0; i < 4; i++) { //计算位置
    for (let j = 2; j >= 0; j--) {
      if (board[i][j] != 0) {
        for (let k = 3; k > j; k--) {
          if (board[i][k] == 0 && noBlockH(i, j, k, board)) {
            moveAnmt(i, j, i, k); //动画
            board[i][k] = board[i][j];
            board[i][j] = 0;
            continue;
          } else if (board[i][k] == board[i][j] && noBlockH(i, j, k, board) && !hasband[i][k]) {
            moveAnmt(i, j, i, k)
            board[i][k] += board[i][j];
            board[i][j] = 0;
            score += board[i][k];
            hasband[i][k] = true;
            updatescore(score)
            continue;
          }
        }
      }
    }
  }
  setTimeout("updatecell()", 200)
  return true;
}

function moveUp() {
  if (!canUp(board)) return false;
  for (let j = 0; j < 4; j++) { //计算位置
    for (let i = 1; i < 4; i++) {
      if (board[i][j] != 0) {
        for (let k = 0; k < i; k++) {
          if (board[k][j] == 0 && noBlockV(k, j, i, board)) {
            moveAnmt(i, j, k, j); //动画
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          } else if (board[k][j] == board[i][j] && noBlockV(k, j, i, board) && !hasband[k][j]) {
            moveAnmt(i, j, k, j)
            board[k][j] += board[i][j];
            board[i][j] = 0;
            score += board[k][j]
            updatescore(score);
            hasband[k][j] = true;
            continue;
          }
        }
      }
    }
  }
  setTimeout("updatecell()", 200)
  return true;
}

function moveDown() {
  // console.log("@")
  if (!canDown(board)) return false;
  for (let j = 0; j < 4; j++) { //计算位置
    for (let i = 2; i >= 0; i--) {
      if (board[i][j] != 0) {
        for (let k = 3; k > i; k--) {
          if (board[k][j] == 0 && noBlockV(i, j, k, board)) {
            moveAnmt(i, j, k, j); //动画
            board[k][j] = board[i][j];
            board[i][j] = 0;
            continue;
          } else if (board[k][j] == board[i][j] && noBlockV(i, j, k, board) && !hasband[k][j]) {
            moveAnmt(i, j, k, j)
            board[k][j] += board[i][j];
            board[i][j] = 0;
            score += board[k][j];
            hasband[k][j] = true;
            updatescore(score);
            continue;
          }
        }
      }
    }
  }
  setTimeout("updatecell()", 200)
  return true;
}