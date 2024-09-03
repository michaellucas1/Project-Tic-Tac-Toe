
const board = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
];
function checkWinner(array){
    const symbolOne="x";
    const symbolTwo="o";
    let i=1;
    let winningSymbol=array[0];
    while(array.length>i){ 
        if(array[i]!==winningSymbol){
            return null;
        }
        i++;
    }
    return winningSymbol;
}
   
function checkResult(array){
    let i=0;
    let winner=null;
    while(array.length>i){
        const row = array[i];
        if(!(row.includes(null))){
            winner = checkWinner(row);
            if(winner!==null){
                return winner;
            }
        }
        const column = getColumn(array,i);
        if(!(column.includes(null))){
            winner = checkWinner(column);
            if(winner!==null){
                return winner;
            }
        }
        if(i===0 || i===array.length-1){
            const diagonal = getDiagonal(array,i);
            if(!(diagonal.includes(null))){
                winner = checkWinner(diagonal);
                if(winner!==null ){
                    return winner;
                }
            }
        }
        i++;
    }
    return winner;
}
function setPlayerMove(array,playerSymbol,row,column){
    array[row][column]=playerSymbol;
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
setPlayerMove(board,playerOneSymbol,0,1);
setPlayerMove(board,playerTwoSymbol,1,0);
setPlayerMove(board,playerOneSymbol,0,0);
setPlayerMove(board,playerTwoSymbol,1,1);
setPlayerMove(board,playerTwoSymbol,0,2);
setPlayerMove(board,playerTwoSymbol,2,0);
setPlayerMove(board,playerOneSymbol,2,2);

const rowTwo = board[2];
const column=getColumn(board,0);
//console.log(column);
const diagonal=getDiagonal(board,2);
console.log(checkResult(board));

console.log(diagonal);
console.log(board);

