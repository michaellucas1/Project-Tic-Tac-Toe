function manageBoard(){
    let board=[];
    function createBoard(){
        let i =0;
        let j =0;
        while(3>i){
            j=0;
            const array =[];
            while(3>j){
                array[j]=null;
                j++;
            }
           board[i]=array;
            i++;
        }
    }
    createBoard();
    function getBoard(){
        return board;
    }
    function setMove(playerSymbol,row,column){
        board[row][column]=playerSymbol;
    }
    function getRow(row){
        return board[row];
    }
    function getColumn(column){
        const result=[];
        let i=0;
        while(board.length>i){
            result.push(board[i][column]);
            i++;
        }
        return result;
    }
    function getDiagonal(diagonal){
        const result=[];
        let i=0;
        if(diagonal+1===board.length){
            while(board.length>i){
                result.push(board[diagonal][i]);
                diagonal--;
                i++;
            }
        }
        else if(diagonal===0){
            while(board.length>i){
                result.push(board[diagonal][i]);
                i++;
                diagonal++;
            }
        }
        return result;
    }
    function checkResult(){
        let i=0;
        let winner=null;
        while(board.length>i){
            const row = getRow(i);
            if(!(row.includes(null))){
                winner = checkWinner(row);
                if(winner!==null){
                    return winner;
                }
            }
            const column = getColumn(i);
            if(!(column.includes(null))){
                winner = checkWinner(column);
                if(winner!==null){
                    return winner;
                }
            }
            if(i===0 || i===board.length-1){
                const diagonal = getDiagonal(i);
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
    return {getBoard ,setMove, checkResult};
}

class Player {
    constructor(name,symbol) {
        let playerName = name;
        let playerSymbol=symbol;
        let playerScore=0;
        let playerMoveCount=0;
        this.getName=()=>{return playerName;};
        this.getSymbol=()=>{return playerSymbol;};
        this.getScore=()=>{return playerScore;};
        this.setScore=(score)=>{return playerScore=score;};
        this.getMoveCount=()=>{return playerMoveCount;};       
        this.resetMoveCount=()=>{playerMoveCount=0;};

    }
}
const playerOne = new Player("john","x");
const playerTwo=new Player("lucas","o");
const gameBoard=manageBoard();
gameBoard.setMove(playerOne.getSymbol(),0,0);
gameBoard.setMove(playerTwo.getSymbol(),0,1);
console.log(gameBoard.checkResult());
let board = gameBoard.getBoard();
console.log(board);
function gameStart(){
}