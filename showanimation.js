function getNumberBackgroundColor(number){//格子颜色
    switch( number ){
        case 0:return "#eee4da";break;
        case 1:return "#ede0c8";break;
        case 2:return "#f2b179";break;
        case 4:return "#f59563";break;
        case 8:return "#f67c5f";break;
        case 16:return "#f65e3b";break;
        case 32:return "#edcf72";break;
        case 64:return "#edcc61";break;
        case 128:return "#9c0";break;
        case 256:return "#33b5e5";break;
        case 512:return "#09c";break;
        case 1024:return "#a6c";break;
        case 2048:return "#93c";break;
    }
    return "black";
}
function getNumberColor(number){//字体颜色
    if(number<=4) return "#776e65";
     return "white";
}
function showNumAni(x,y,v){//新点放入
    let numCell = $("#num-cell-" + x + "-" + y);
    numCell.css("background-color",getNumberBackgroundColor(v))
    numCell.css('color',getNumberColor( v ) );
    numCell.text( v );
    numCell.animate({
        width: cellsideLength,
        height: cellsideLength,
        top: getPosTop(x),
        left: getPosLeft(y)
    },50);
}
function moveAnmt(ox,oy,x,y){//起始点和到达点
    let numCell=$("#num-cell-"+ox+"-"+oy);
    numCell.animate({
        top:getPosTop(x),
        left:getPosLeft(y)
    },200)
}
function updatescore(x) {
  $("#score").text(x);
}