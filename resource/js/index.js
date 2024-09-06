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
    const playerOne=gameManager.createPlayer("Player 1","&Chi;");
    const playerTwo=gameManager.createPlayer("Player 2","&Omicron;");
    const startButton= document.querySelector(".start-button");
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
                gridItem.value=`${gridItemPosition}`;
                gridItem.addEventListener("click",updateGameState);
                gridItem.classList.add("add-opacity");
                gridItem.style.animationPlayState="running";
                gridContainer.appendChild(gridItem);
                j++;
            }
            i++
        }
    }
    function setGridAnimation(){
        const gridItems = document.querySelectorAll(".grid-item");
        let i=0;
        while(gridItems.length > i){
            gridItems[i].style.animationPlayState="paused";
            gridItems[i].classList.remove("add-opacity");
            gridItems[i].classList.add("remove-opacity");
            gridItems[i].style.animationPlayState="running";
            i++;
        }
    }
    const managePlayerDisplay= (function(){
        const openModal = document.querySelector(".modal-button");
        const closeModal = document.querySelector(".close-modal");
        const submitButton = document.querySelector(".submit-button");
        const formData = document.querySelector("form");
        const dialog = document.querySelector("dialog");
        const playerOneScore = document.querySelector(".score-container > .player-one");
        const playerTwoScore= document.querySelector(".score-container > .player-two");
        const playerOneResult = document.querySelector(".result-container > .player-one");
        const playerTwoResult= document.querySelector(".result-container > .player-two");
        const playerOneName = document.querySelector(".player-container > .player-one");
        const playerTwoName= document.querySelector(".player-container > .player-two");
        const setPlayerName=(oneName,twoName)=>{
            playerOneName.textContent=`${oneName}`;
            playerTwoName.textContent=`${twoName}`;
        }
        const hidePlayerNameAndScore=()=>{
            playerOneScore.hidden=true;
            playerOneName.hidden=true;
            playerTwoScore.hidden=true;
            playerTwoName.hidden=true;
        };
        const showPlayerNameAndScore=()=>{
            playerOneScore.hidden=false;
            playerOneName.hidden=false;
            playerTwoScore.hidden=false;
            playerTwoName.hidden=false;
        };

        const setPlayerScore=(oneScore,twoScore)=>{
            playerOneScore.textContent=`${oneScore}`;
            playerTwoScore.textContent=`${twoScore}`;
        };
        const resetPlayerScore=()=>{
            playerOneScore.textContent="0";
            playerTwoScore.textContent="0";
        };
        const setTie=()=>{
            playerOneResult.textContent+="It's a tie!";
            playerTwoResult.textContent+="It's a tie!";   
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
        openModal.addEventListener("click" ,showModal);
        closeModal.addEventListener("click",hideModal);
        formData.addEventListener("submit",submitName);
        submitButton.addEventListener("click",hideModal);
        function showModal(){
            dialog.show();
            openModal.removeEventListener("click",showModal);
            closeModal.addEventListener("click",hideModal);
            submitButton.addEventListener("click",hideModal);
            document.body.classList.add("modal-open");
        }
        function hideModal(){
            dialog.close();
            closeModal.removeEventListener("click",hideModal);
            submitButton.removeEventListener("click",hideModal);
            openModal.addEventListener("click" ,showModal);
            document.body.classList.remove("modal-open");
        }
        function submitName(event){
            event.preventDefault();
            const myFormData = new FormData(event.target);
            const formDataObject = {};
            myFormData.forEach((value,key)=>(formDataObject[key]=value));
            const playerOneName =formDataObject["player-one-name"] ?? "Player-1";
            const playerTwoName =formDataObject["player-two-name"] ?? "Player-2";
            if(playerOneName===""){
                playerOneName="Player-1";
            }
            if(playerTwoName===""){
                playerTwoName="Player-2";
            }
            setPlayerName(playerOneName,playerTwoName);
        }
        return {
            setPlayerScore,
            resetPlayerScore,
            setTie,
            setWinner,
            resetWinner,
            setPlayerName,
            hidePlayerNameAndScore,
            showPlayerNameAndScore
        };
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
               currentPlayer.setScore();
                managePlayerDisplay.setPlayerScore(playerOne.getScore(),playerTwo.getScore());
                managePlayerDisplay.setWinner(result[0].getPlayer());
                setGreenColor(result);
                removeAllListeners();
                startButton.disabled=false;
            }
            else if(gameManager.gameBoard.isFull() && result===null){
                managePlayerDisplay.setTie();
                removeAllListeners();
                startButton.disabled=false;
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
        while(gridContainer.children.length>i){
            gridContainer.children[i].removeEventListener("click", updateGameState);
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
        const resetButton= document.querySelector(".reset-button");
        startButton.addEventListener("click",initialize);
        managePlayerDisplay.setPlayerName(playerOne.getName(),playerTwo.getName());
        managePlayerDisplay.setPlayerScore(playerOne.getScore(),playerTwo.getScore());
        managePlayerDisplay.hidePlayerNameAndScore();
        function initialize(){
            managePlayerDisplay.showPlayerNameAndScore();
            setGridAnimation();
            setTimeout(()=>{
                gridReset();
            gameManager.gameBoard.createBoard();
            playerOne.resetMoveCount();
            playerTwo.resetMoveCount();
            managePlayerDisplay.resetWinner(); 
            createGrid(3);
            startButton.disabled=true;
            },500);
            
        }
        resetButton.addEventListener("click",resetAll);
        function resetAll(){
            managePlayerDisplay.resetPlayerScore();
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