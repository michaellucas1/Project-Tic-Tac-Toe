
const board = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
];      
function checkResult(){
    
}
function setPlayerAction(playerSymbol,row,column){
    board[row][column]=playerSymbol;
}
function getColumn(array,column){
    const result=[];
    let i=0;

    while(array.length>i){
        result.push(array[i][column]);
        i++;
    }
    return result;
}
function getDiagonal(array,diagonal){
    const result=[];
    let i=0;
    if(diagonal+1===array.length){
        while(array.length>i){
            result.push(array[diagonal][i]);
            diagonal--;
            i++;
        }
    }
    else if(diagonal===0){
        while(array.length>i){
            result.push(array[diagonal][i]);
            i++;
            diagonal++;
        }
    }
    
    return result;
}
const playerOneSymbol="x";
const playerTwoSymbol="O";
setPlayerAction(playerOneSymbol,0,1);
setPlayerAction(playerTwoSymbol,1,0);
setPlayerAction(playerOneSymbol,0,0);
setPlayerAction(playerTwoSymbol,1,1);
setPlayerAction(playerTwoSymbol,0,2);

const rowTwo = board[2];
const column=getColumn(board,0);
//console.log(column);
const diagonal=getDiagonal(board,2);


console.log(diagonal);
console.log(board);

