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
    function setMove(gameState){
        board[gameState.getRow()][gameState.getColumn()]=gameState;
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
        let i=1;
        let winningSymbol=array[0].getPlayer().getSymbol();
        while(array.length>i){ 
            if(array[i].getPlayer().getSymbol()!==winningSymbol){
                return null;
            }
            i++;
        }
        return array;
    }
    /* the isFull function checks if the array is full by looking for a null value. it returns false
        when a null value is detected since it indicates that the array has not replaced every
        initial value
    */
    function isFull(){
        const rowOne =board[0].includes(null);
        const rowTwo=board[1].includes(null);
        const rowThree =board[2].includes(null);
        return !(rowOne || rowTwo || rowThree);
    }
    return {createBoard,getBoard ,setMove, checkResult,isFull};
})();

function renderDom(){
    const gridContainer=document.querySelector(".display-grid");
    const gameManager=manageGame;
    const playerOne=gameManager.createPlayer("John","&Chi;");
    const playerTwo=gameManager.createPlayer("Lucas","&Omicron;");
    let currentPlayer=playerOne;
    function createGrid(gridSize){
        const gridCount=gridSize * gridSize;
        let i=0;
        let j=0;
        while(gridSize>i){
            j=0;
            while(gridSize>j){
                const gridItem=document.createElement("div");
                const gridItemPosition=JSON.stringify({row:`${i}`,column:`${j}`});
                gridItem.style.padding=`${calculateSquareSize(gridCount)}px`;
                gridItem.classList.add('grid-item');
                gridItem.textContent="-";
                gridItem.value=`${gridItemPosition}`;
                gridItem.addEventListener("click",updateGameState);
                gridContainer.appendChild(gridItem);
                j++;
            }
            i++
        }
    }
    const managePlayerStat= (function(){
        const playerOneScore = document.querySelector(".score-container > .player-one");
        const playerTwoScore= document.querySelector(".score-container > .player-two");
        const playerOneResult = document.querySelector(".result-container > .player-one");
        const playerTwoResult= document.querySelector(".result-container > .player-two");
        const setPlayerScore=(oneScore,twoScore)=>{
            playerOneScore.textContent=`${oneScore}`;
            playerTwoScore.textContent=`${twoScore}`;
        };
        const resetPlayerScore=()=>{
            playerOneScore.textContent="0";
            playerTwoScore.textContent="0";
        };
        const setTie=()=>{
            playerOneResult.textContent+="It's  a tie!";
            playerTwoResult.textContent+="It's  a tie!";   
        };
        const setWinner=(player)=>{
            if(player.getSymbol()==="&Chi;"){
                playerOneResult.textContent+="You Win!";
            }
            else{
                playerTwoResult.textContent+="You Win!";  
            }
        };
        const resetWinner=()=>{
            playerOneResult.textContent="";
            playerTwoResult.textContent=""; 
        };
        return {setPlayerScore,resetPlayerScore,setTie,setWinner,resetWinner};
    })();
    function updateCurrentPlayer(){
        if(currentPlayer.getSymbol()===playerOne.getSymbol()){
            currentPlayer=playerTwo;
        }
        else{
            currentPlayer=playerOne;
        }
    }
    function updateGameState(event){  
        const gridPosition=JSON.parse(event.target.value);
        currentPlayer.setMoveCount();
        event.target.innerHTML=currentPlayer.getSymbol();
        event.target.style.backgroundColor="red";
 
        const gameState=
            gameManager.createGameState(
                currentPlayer,
                event.target,
                gridPosition.row,
                gridPosition.column,
        );
        gameManager.gameBoard.setMove(gameState);
        if(currentPlayer.getMoveCount()>=3){
            const result = gameManager.gameBoard.checkResult();
            if(result !== null){
                if(result[0].getPlayer().getSymbol()===playerOne.getSymbol()){
                    playerOne.setScore();
                }
                else{
                    playerTwo.setScore();
                }
                managePlayerStat.setPlayerScore(playerOne.getScore(),playerTwo.getScore());
                managePlayerStat.setWinner(result[0].getPlayer());
                setGreenColor(result);
                removeAllListeners();
            }
            else if(gameManager.gameBoard.isFull() && result===null){
                managePlayerStat.setTie();
                removeAllListeners();

            }
        }
        updateCurrentPlayer();
        event.target.classList.add("disabled");
        function setGreenColor(array){
            let i =0;
            while(array.length>i){
                array[i].getGrid().style.backgroundColor="green";
                i++;
            }
      
        }
    }
    function calculateSquareSize(gridSize){
        return 250 / gridSize;
    }
    function removeAllListeners(){
        let i=0;
        while(event.target.parentNode.children.length>i){
            event.target.parentNode.children[i].removeEventListener("click", updateGameState);
            i++;
        }
    }
    function gridReset(){
        removeAllListeners();
        while(gridContainer.firstChild){
            gridContainer.removeChild(gridContainer.firstChild);
        }
    }
    function resetCurrentPlayer(){
        currentPlayer=playerOne;
    }
    function startGame(){
        const startButton= document.querySelector(".start-button");
        const resetButton= document.querySelector(".reset-button");
        startButton.addEventListener("click",initialize);
        function initialize(){
            gridReset();
            gameManager.gameBoard.createBoard();
            playerOne.resetMoveCount();
            playerTwo.resetMoveCount();
            managePlayerStat.resetWinner();
            createGrid(3);
        }
        resetButton.addEventListener("click",resetAll);
        function resetAll(){
            managePlayerStat.resetPlayerScore();
            resetCurrentPlayer()
            playerOne.resetScore();
            playerTwo.resetScore();
            initialize();
        }
   
    }    
    return {createGrid,startGame};
}
class Player {
    constructor(name,symbol) {
        let playerName = name;
        const playerSymbol=symbol;
        let playerScore=0;
        let playerMoveCount=0;
        this.getName=()=>{return playerName;};
        this.getSymbol=()=>{return playerSymbol;};
        this.getScore=()=>{return playerScore;};
        this.setScore=()=>{playerScore++;};
        this.resetScore=()=>{playerScore=0;}
        this.getMoveCount=()=>{return playerMoveCount;}; 
        this.setMoveCount=()=>{playerMoveCount++;};       
        this.resetMoveCount=()=>{playerMoveCount=0;};
    }
}
class GameState{
    constructor(currentPlayer,selectedGrid,row,column){
        const player=currentPlayer;
        const grid = selectedGrid;
        const gridRow=row;
        const gridColumn=column;

        this.getPlayer=()=>{return player};
        this.getGrid=()=>{return grid};
        this.getRow=()=>{return gridRow};
        this.getColumn=()=>{return gridColumn};
    }
}

const manageGame=(function(){
    const gameBoard=manageBoard;
    function createPlayer(name,symbol){
        return new Player(name,symbol);
    }
    function createGameState(currentPlayer,selectedGrid,row,column){
        return new GameState(currentPlayer,selectedGrid,row,column);
    }
    return{gameBoard,createPlayer,createGameState};
})();

renderDom().startGame();