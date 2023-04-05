const cloneBoard = (currentBoard = board)=>{
    return [
        [...currentBoard[0]],
        [...currentBoard[1]],
        [...currentBoard[2]]
    ];
}

const getEmptySpaces = (currentBoard = board)=>{
    const emptySpaces = [];
    for(var y = 0; y < currentBoard.length; y++){
        for(var x = 0; x < currentBoard.length; x++){
            if(currentBoard[y][x]===-1)emptySpaces.push([y,x]);
        }    
    }
    return emptySpaces;
}

const minimax = (currentBoard = board, player = 1, maxdepth=9)=>{
    var {winner} = getWinner(currentBoard);
    if(winner===1)return 1;
    if(winner===0)return -1;
    var spaces = getEmptySpaces(currentBoard);
    if(spaces.length===0)return 0;
    if(player === 1){
        var best = -Infinity;
        for(var i in spaces){
            const newBoard = cloneBoard(currentBoard);
            newBoard[spaces[i][0]][spaces[i][1]] = (player+1)%2;
            var value = minimax(newBoard,(player+1)%2);
            if(value > best){
                best = value;
            }
        }
        return best;        
    }else {
        var best = Infinity;
        for(var i in spaces){
            const newBoard = cloneBoard(currentBoard);
            newBoard[spaces[i][0]][spaces[i][1]] = (player+1)%2;
            var value = minimax(newBoard,(player+1)%2);
            if(value < best){
                best = value;
            }
        }
        return best;    
    }
}

const bestAction = (currentBoard = board, player = 1)=>{
    var spaces = getEmptySpaces(currentBoard);
    var best = -Infinity;
    var action = null;
    for(var i in spaces){
        const newBoard = cloneBoard(currentBoard);
        newBoard[spaces[i][0]][spaces[i][1]] = player;
        var value = minimax(newBoard,player);
        if(value > best){
            best = value;
            action = spaces[i];
        }
    }
    return action;
}

const playIA = ()=>{
    console.log('Vez da ia');
    const best = bestAction(board, 1);
    if(best){
        play(best[0],best[1])
    }
    console.log('IA jogou')
}