import * as map from "./map.js";

/**
 * 获取玩家的位置
 */
function getPlayerPoint() {
    for (let row = 0; row < map.rowNumber; row++) {
        for (let col = 0; col < map.colNumber; col++) {
            if(map.content[row][col] === map.PLAYER){
                return {
                    row,
                    col
                }
            }
        }
    }
}

/**
 * 根据行和列获取指定方向上的下一个位置的信息
 * @param {*} row 
 * @param {*} col 
 * @param {*} direction 
 */
function getNextInfo(row, col, direction){
    if(direction === "left"){
        return {
            row,
            col: col - 1,
            value: map.content[row][col - 1]
        }
    }
    else if(direction === "right"){
        return {
            row,
            col: col + 1,
            value: map.content[row][col + 1]
        }
    }
    else if(direction === "up"){
        return {
            row: row - 1,
            col,
            value: map.content[row - 1][col]
        }
    }
    else if(direction === "down"){
        return {
            row: row + 1,
            col,
            value: map.content[row + 1][col]
        }
    }
}

/**
 * 玩家移动
 * @param {*} point1 
 * @param {*} point2 
 */
function exchange(point1, point2) {
    let temp = map.content[point1.row][point1.col];
    map.content[point1.row][point1.col] = map.content[point2.row][point2.col];
    map.content[point2.row][point2.col] = temp;
}

/**
 * 游戏胜利
 */
export function isWin() {
    for (const item of map.correct) {
        if(map.content[item.row][item.col] !== map.BOX){
            return false;
        }
    }
    return true;
}

/**
 * 根据指定的方向，玩家移动一步
 * @param {*} direcation  left/right/up/down
 */
export function playerMove(direcation) {
    // 获取玩家的位置
    const playerPoint = getPlayerPoint();
    const nextInfo = getNextInfo(playerPoint.row, playerPoint.col, direcation);
    const nextNextInfo = getNextInfo(nextInfo.row, nextInfo.col, direcation);

    // 不移动
    if(nextInfo.value === map.WALL){
        // 墙   
        return false;
    }

    if(nextInfo.value === map.SPACE){
        // 空白
        exchange(playerPoint, nextInfo);
        return true;
    }

    if(nextInfo.value === map.BOX){
        // 箱子
        if(nextNextInfo.value === map.SPACE){ 
            //箱子的下一个位置是空白
            exchange(nextInfo, nextNextInfo);
            exchange(playerPoint, nextInfo);
            return true;
        }
        else{
            // 箱子的下一个位置是墙
            return false;
        }
    }
}