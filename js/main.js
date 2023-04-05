const table = document.querySelector('.table');

const board = [
    [-1,-1,-1],
    [-1,-1,-1],
    [-1,-1,-1]
];
// singleplayer or multiplayer
let mode = 'singleplayer'
let score = {
    lastWinner: -1,
    player_0: 0,
    player_1: 0
}
let currentPlayer = 0;
let winner = -1;
let winnerType = {type: null, pos: -1};
let pauseGame = 0;

const update = ()=>{
    if(mode==='singleplayer'&&currentPlayer===1){
        playIA();
    }
    
}

const render = ()=>{
    const root = document.createElement('div');
    for(var y = 0; y < board.length; y++){
        const row = document.createElement('div');
        row.className="row";
        row.setAttribute('y',y)
        for(var x = 0; x < board.length; x++){
            const column = document.createElement('div');
            column.setAttribute('x',x)
            column.className="column"
            const player = board[y][x];
            if(player !== -1){
                column.classList.add('selected')
                column.innerHTML=`
                    <span class="player-${player}"></span>
                `
            }
            row.appendChild(column);
        }
        root.appendChild(row);
    }
    if(winnerType.type){
        const winnerElement = document.createElement('i');
        winnerElement.className = `winner type-${winnerType.type} player-${winner} pos-${winnerType.pos}`
        root.appendChild(winnerElement)
    }
    if(root.innerHTML!==table.innerHTML){
        table.innerHTML=root.innerHTML;
    }
}


table.addEventListener('click',(e)=>{
    if(e.target.className.includes('column')){
        const x = Number(e.target.getAttribute('x')||'0');
        const y = Number(e.target.parentElement.getAttribute('y')||'0');
        if(mode === 'singleplayer'){
            if(currentPlayer===0){
                play(y,x);
            }
        }else if(mode === 'multiplayer'){
            if(currentPlayer!==-1){
                play(y,x);
            }
        }
    }
})

const gameLoop = async()=>{
    update();
    render();
    if(winner!==-1){
        await new Promise(rs=>{
            setTimeout(rs,3000)
        });
        resetGame();
    }
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);