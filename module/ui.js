import * as map from "./map.js";

const divContainer = document.getElementById("game");
const pieceWidth = 45;
const pieceHeight = 45;

/**
 * 设置div的宽高
 */
function setDivContainer(){
    divContainer.style.width = pieceWidth * map.colNumber + "px";
    divContainer.style.height = pieceHeight * map.rowNumber + "px";
}

/**
 * 根据行和列判断是否在正确位置
 */
function isCorrect(row, col) {
    for (const item of map.correct) {
        if(item.row === row && item.col === col){
            return true;
        }
    }
    return false;
}

/**
 * 根据行和列，创建一个div加入到容器中
 */
function setOnePiece(row, col){
    const div = document.createElement("div");
    div.className = "item";
    // 设置div的位置
    div.style.left = col * pieceWidth + "px";
    div.style.top = row * pieceHeight + "px";
    if(map.content[row][col] === map.PLAYER){
        div.classList.add("player");
    }
    else if(map.content[row][col] === map.WALL){
        div.classList.add("wall");
    }
    else if(map.content[row][col] === map.BOX){
        if(isCorrect(row, col)){
            div.classList.add("correct-box");
        }else{
            div.classList.add("box");
        }
    }
    else{
        // 空白
        if(isCorrect(row, col)){
            div.classList.add("correct");
        }else{
            return;
        }
    }

    divContainer.appendChild(div);
}

/**
 * 根据地图在页面中显示相应的元素
 */
function setContent(){
    divContainer.innerHTML = "";
    for (let row = 0; row < map.rowNumber; row++) {
        for (let col = 0; col < map.colNumber; col++) {
            setOnePiece(row, col);
        }
    }
}

/**
 * 该函数用于显示地图
 */
export default function() {
    // 1.设置div的宽高
    setDivContainer();
    // 2.显示地图中的内容
    setContent();
}