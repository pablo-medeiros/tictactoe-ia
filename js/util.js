const getWinner = (currentBoard = board)=>{
    let result = {
        winner: -1,
        winnerType: {type: null, pos: -1}
    }
    for(var i = 0; i < currentBoard.length; i++){
        const columns = currentBoard[i];
        if(columns[0] !== -1 && columns[0] === columns[1] && columns[1] === columns[2]){
            result.winner = columns[0];
            result.winnerType = {type: 'h',pos: i};
            break;
        }
        if(currentBoard[0][i] !== -1 &&currentBoard[0][i] === currentBoard[1][i]&& currentBoard[1][i] === currentBoard[2][i]){
            result.winner = currentBoard[0][i];
            result.winnerType = {type: 'v', pos: i}
            break;
        }
    }
    if(currentBoard[0][0] !== -1 && currentBoard[0][0] === currentBoard[1][1] && currentBoard[1][1] === currentBoard[2][2]){
        result.winner = currentBoard[0][0];
        result.winnerType = {type: 'd', pos: 0};
    }else if(currentBoard[0][2] !== -1 && currentBoard[0][2] === currentBoard[1][1] && currentBoard[1][1] === currentBoard[2][0]){
        result.winner = currentBoard[0][2];
        result.winnerType = {type: 'd', pos: 2};
    }
    return result;
}

const resetGame = ()=>{
    for(var i = 0; i < board.length;i++){
        for(var j = 0; j < board.length; j++){
            board[i][j]=-1;
        }
    }
    if(winner!==-1){
        score[winner===1?'player_1':'player_0'] = score[winner===1?'player_1':'player_0']+1;
        currentPlayer = winner
    }else if(score.lastWinner!==-1){
        currentPlayer = (score.lastWinner+1)%2;
    }
    score.lastWinner = winner;
    winner=-1;
    winnerType.type=null;
    winnerType.pos=-1;
    document.querySelector('#score-0').innerHTML = 'X '+score.player_0
    document.querySelector('#score-1').innerHTML = score.player_1 + ' O'
}

const play = (y=0, x=0)=>{
    if(board[y][x]!==-1)return false;
    board[y][x] = currentPlayer;
    if(!checkWin())currentPlayer = (currentPlayer+1)%2;
    return true;
}

const checkWin = ()=>{
    const res = getWinner(board);
    winner = res.winner;
    winnerType = res.winnerType;
    if(getEmptySpaces(board).length===0){
        resetGame();
    }
    if(res.winner!==-1)return true;
}