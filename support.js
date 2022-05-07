documentWidth = window.screen.availWidth;
gridContainerwidth = 0.92 *documentWidth;
cellsideLength = 0.18 *documentWidth ;
cellSpace = 0.04 * documentWidth;
function nospeace(board) {
    for(let i=0;i<4;i++){//计算位置
        for(let j=0;j<4;j++){
            if(board[i][j]==0) return false//有空格
        }
    }
    return true//无空格
}
function nomove(board) {
  if (
    canDown(board) ||
    canLeft(board) ||
    canRight(board) ||
    canUp(board)) return false;
  return true
}
function canLeft(mtx){//可以left
    for(let i=0;i<4;i++){
        for(let j=1;j<4;j++){
            if(mtx[i][j]!=0){//计算位置
                if(mtx[i][j-1]==0 || mtx[i][j-1]==mtx[i][j] ) return true
            }
        }
    }
    return false
}
function canRight(mtx) { //可以right
  for (let i = 0; i < 4; i++) {
    for (let j = 2; j >=0; j--) {
      if (mtx[i][j] != 0) { //计算位置
        if (mtx[i][j+1] == 0 || mtx[i][j+1] == mtx[i][j]) return true
      }
    }
  }
  return false
}
function canUp(mtx) { //可以up
  for (let j = 0; j < 4; j++) {
    for (let i = 1; i < 4; i++) {
      if (mtx[i][j] != 0) { //计算位置
        if (mtx[i-1][j] == 0 || mtx[i-1][j] == mtx[i][j]) return true
      }
    }
  }
  return false
}

function canDown(mtx) { //可以down
  for (let j = 0; j < 4; j++) {
    for (let i = 2; i >=0; i--) {
      if (mtx[i][j] != 0) { //计算位置
        if (mtx[i + 1][j] == 0 || mtx[i + 1][j] == mtx[i][j]) return true
      }
    }
  }
  return false
}
function noBlockH(x,y,oy,mtx){//行，列(小)，横向侧点（大）
    for(let i=y+1;i<oy;i++){//当有障碍物，false
        if(mtx[x][i]!=0) return false
    }
    return true
}
function noBlockV(x, y, ox, mtx) {//行（小），列，纵向侧点（大）
    for(let i=x+1;i<ox;i++){//当有障碍物，false
        if(mtx[i][y]!=0) return false
    }
    return true
}

function getPosTop(i){
    return cellSpace + i * (cellSpace + cellsideLength);
}

function getPosLeft(j){
	return cellSpace + j * (cellSpace + cellsideLength);
}