const manageBoard= (function(){
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
        const symbolOne="&Chi;";
        const symbolTwo="&Omicron;";
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
})();

function renderDom(){
    const gameManager=manageGame;
    const playerOne=gameManager.createPlayer("John","&Chi;");
    const playerTwo=gameManager.createPlayer("Lucas","&Omicron;");
    let currentPlayer=playerOne.getSymbol();
    function createGrid(gridSize){
        const gridContainer=document.querySelector(".display-grid");
        const example=document.querySelector(".grid-item > *");
        const gridCount=gridSize * gridSize;
        let i=0;
        let j=0;
        while(gridSize>i){
            j=0;
            while(gridSize>j){
                const gridItem=document.createElement("div");
                const gridItemPosition=JSON.stringify({row:`${i}`,column:`${j}`});
                gridItem.style.padding=`${calculateSquareSize(gridCount)}px`;
                gridItem.setAttribute("class","grid-item");
                gridItem.textContent="-";
                gridItem.value=`${gridItemPosition}`;
                gridItem.addEventListener("click",selectedGrid);
                gridContainer.appendChild(gridItem);
                j++;
            }
            i++
        }

    }

    function selectedGrid(event){
        const elementValue=JSON.parse(event.target.value);
        event.target.innerHTML=`${currentPlayer}`;
        gameManager.gameBoard.setMove(event.target.innerHTML,elementValue.row,elementValue.column);
        if(currentPlayer===playerOne.getSymbol()){
    
            currentPlayer=playerTwo.getSymbol();
        }
        else{
            currentPlayer=playerOne.getSymbol();
        }
        elementValue;
        event.target.removeEventListener("click", selectedGrid);
        console.log(elementValue);
        
        let board = gameManager.gameBoard.getBoard();
        console.log(board);
        console.log(gameManager.gameBoard.checkResult());

    }
    function calculateSquareSize(gridSize){
        return 250 / gridSize;
    }
    return {createGrid};
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
        this.resetScore=()=>{playerScore=0;}
        this.getMoveCount=()=>{return playerMoveCount;};       
        this.resetMoveCount=()=>{playerMoveCount=0;};
    }
}

const manageGame=(function(){
    const gameBoard=manageBoard;
    function createPlayer(name,symbol){
        return new Player(name,symbol)
    }
    return{gameBoard,createPlayer};
})();
renderDom().createGrid(3);