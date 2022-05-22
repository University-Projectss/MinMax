let cells = document.querySelectorAll('.game-cell');
let mat = [];// = 1 pt 'X', = 2 pt 'O'
let lastMove = 'o';
let scorex = document.querySelector('.scorex');
let scoreo = document.querySelector('.scoreo');
let whoMove = document.querySelector('.who-move');
let fbMatrix, matrixObj;
for(let i = 0; i < 3; i++)
    mat[i] = new Array(3);

for(i = 0; i < 3; i++)
    for(j = 0; j < 3; j++)
        mat[i][j] = 0;
        

            /********************************
            /////////////////////////////////
            AICI INCEPE ALGORITMUL PENTRU JOC
            /////////////////////////////////
            ********************************/

for(let i = 0; i < 9; i++) {
    cells[i].addEventListener('click', () => {

        //mut eu->verific->muta ai->verific
        //eu joc X
    
        if( cells[i].innerHTML == "" ) {
            cells[i].innerHTML = 'X';
            mat[ Math.floor(i / 3) ][i % 3] = 1;
            lastMove = 'x';
            whoMove.innerHTML = 'O';

            //verific daca a castigat 'X'
            if( !winnerX() ) {
                //nu am castigat deci jocul merge
                let zeros = 0;
                for(let j = 0; j < 3; j++)
                    for(let k = 0; k < 3; k++)
                        if( mat[j][k] == 0 ) 
                            zeros++;

                if( zeros == 0 ) {
                    clearTable();
                } else {
                    bestMove();
                }
            }
        }

        //console.log(mat);       
    })
}


            /********************************
            /////////////////////////////////
            AICI AM SCRIS FUNCTIILE 'HANDMADE'
            /////////////////////////////////
            ********************************/

let scores = {X: -1, O: 1, draw: 0};

function minimax(board, isMaximizing) {
    // console.log('?');
    let result = isWinner(board);
    if(result != null) {
        return scores[result];
    }

    if(isMaximizing) {
        let bestScore = -Infinity;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(board[i][j] == 0) {
                    board[i][j] = 2;
                    let score = minimax(board, false);
                    board[i][j] = 0;
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    }else {
        let bestScore = Infinity;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(board[i][j] == 0) {
                    board[i][j] = 1;
                    let score = minimax(board, true);
                    board[i][j] = 0;
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}


function bestMove() {
    //randul lui minimax sa mute
    let bestScore = -Infinity;
    let move;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if( mat[i][j] == 0 ) {
                mat[i][j] = 2;
                let score = minimax(mat, false);
                mat[i][j] = 0;
                if(score > bestScore) {
                    bestScore = score;
                    move = {i, j};
                }
            }
        }
    }
    console.log(move);
    cells[move.i * 3 + move.j].innerHTML = 'O';
    mat[move.i ][move.j] = 2;
    lastMove = 'o';
    whoMove.innerHTML = 'X';

    //verific daca a castigat 'O'
    winnerO();
}

//1 este pentru X si 2 este pentru 0
function isWinner(board) {
    //pe linii
    for(let i = 0; i < 3; i++) {
        if( board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][2] != 0 ) {
            return board[i][1] == 1 ? 'X' : 'O';
        }
    }

    //pe coloane
    for(let i = 0; i < 3; i++) {
        if( board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[2][i] != 0 ) {
            return board[1][i] == 1 ? 'X' : 'O';
        }
    }

    //pe diagonala principala
        if( board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[2][2] != 0 ) {
            return board[1][1] == 1 ? 'X' : 'O';
        }
    
    //pe diagonala secundara
    if( board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[2][0] != 0 ) {
        return board[1][1] == 1 ? 'X' : 'O';
    }

    let zeros = 0;
    for(let j = 0; j < 3; j++)
        for(let k = 0; k < 3; k++)
            if( mat[j][k] == 0 ) 
                zeros++;

    if( zeros == 0 ) {
        return 'draw';
    } else {
        return null;
    }
}

function winnerO() {
        let cnt;
        //pe linie
        for(let j = 0; j < 3; j++) {
            cnt = 0;
            for(let k = 0; k < 3; k++)
                if( mat[j][k] == 2 )
                    cnt++;
            
            if( cnt == 3 ) {
                console.log("O win");
                scoreo.innerHTML++;
                whoMove.innerHTML = 'O';
                lastMove = 'x';

                for(let k = 0; k < 3; k++)
                    cells[ 3 * j + k ].style.color = 'green';

                setTimeout( () => {
                    clearTable();
                    for(let k = 0; k < 3; k++)
                        cells[ 3 * j + k ].style.color = 'black';
                }, 1000 );
                break;
            }
        }

        //pe coloana
        for(let j = 0; j < 3; j++) {
            cnt = 0;
            for(let k = 0; k < 3; k++)
                if( mat[k][j] == 2 )
                    cnt++;
            
            if( cnt == 3 ) {
                console.log("O win");
                scoreo.innerHTML++;
                whoMove.innerHTML = 'O';
                lastMove = 'x';

                for(let k = 0; k < 3; k++)
                    cells[ 3 * k + j ].style.color = 'green';

                setTimeout( () => {
                    clearTable();
                    for(let k = 0; k < 3; k++)
                        cells[ 3 * k + j ].style.color = 'black';
                }, 1000 );
                break;
            }
        }

        //pe diagonala principala
        cnt = 0;
        for(let j = 0; j < 3; j++)
            if( mat[j][j] == 2 )
                cnt++;

        if( cnt == 3 ) {
            if( cnt == 3 ) {
                console.log("O win");
                scoreo.innerHTML++;
                whoMove.innerHTML = 'O';
                lastMove = 'x';

                for(let k = 0; k < 3; k++)
                    cells[ 3 * k + k ].style.color = 'green';

                setTimeout( () => {
                    clearTable();
                    for(let k = 0; k < 3; k++)
                        cells[ 3 * k + k ].style.color = 'black';
                }, 1000 );
            }
        }

        //pe diagonala secundara
        cnt = 0;
        for(let j = 0; j < 3; j++)
            if( mat[j][2 - j] == 2 )
                cnt++;

        if( cnt == 3 ) {
            if( cnt == 3 ) {
                console.log("O win");
                scoreo.innerHTML++;
                whoMove.innerHTML = 'O';
                lastMove = 'x';

                for(let k = 0; k < 3; k++)
                    cells[ 3 * k + 2 - k ].style.color = 'green';

                setTimeout( () => {
                    clearTable();
                    for(let k = 0; k < 3; k++)
                        cells[ 3 * k + 2 - k ].style.color = 'black';
                }, 1000 );
            }
        }

}

function winnerX() {
        let cnt;
        //pe linie
        for(let j = 0; j < 3; j++) {
            cnt = 0;
            for(let k = 0; k < 3; k++)
                if( mat[j][k] == 1 )
                    cnt++;
            
            if( cnt == 3 ) {
                console.log("X win");
                scorex.innerHTML++;
                whoMove.innerHTML = 'X';
                lastMove = 'o';

                for(let k = 0; k < 3; k++)
                    cells[ 3 * j + k ].style.color = 'green';
                
                setTimeout( () => {
                    clearTable();
                    for(let k = 0; k < 3; k++)
                        cells[ 3 * j + k ].style.color = 'black';
                }, 1000 );
                return true;
            }
        }

        //pe coloana
        for(let j = 0; j < 3; j++) {
            cnt = 0;
            for(let k = 0; k < 3; k++)
                if( mat[k][j] == 1 )
                    cnt++;
            
            if( cnt == 3 ) {
                console.log("X win");
                scorex.innerHTML++;
                whoMove.innerHTML = 'X';
                lastMove = 'o';

                for(let k = 0; k < 3; k++)
                    cells[ 3 * k + j ].style.color = 'green';

                setTimeout( () => {
                    clearTable();
                    for(let k = 0; k < 3; k++)
                        cells[ 3 * k + j ].style.color = 'black';
                }, 1000 );
                return true;
            }
        }

        //pe diagonala principala
        cnt = 0;
        for(let j = 0; j < 3; j++)
            if( mat[j][j] == 1 )
                cnt++;

            if( cnt == 3 ) {
                console.log("X win");
                scorex.innerHTML++;
                whoMove.innerHTML = 'X';
                lastMove = 'o';

                for(let k = 0; k < 3; k++)
                    cells[ 3 * k + k ].style.color = 'green';

                setTimeout( () => {
                    clearTable();
                    for(let k = 0; k < 3; k++)
                        cells[ 3 * k + k ].style.color = 'black';
                }, 1000 );
                return true;
            }
        

        //pe diagonala secundara
        cnt = 0;
        for(let j = 0; j < 3; j++)
            if( mat[j][2 - j] == 1 )
                cnt++;

            if( cnt == 3 ) {
                console.log("X win");
                scorex.innerHTML++;
                whoMove.innerHTML = 'X';
                lastMove = 'o';

                for(let k = 0; k < 3; k++)
                    cells[ 3 * k + 2 - k ].style.color = 'green';

                setTimeout( () => {
                    clearTable();
                    for(let k = 0; k < 3; k++)
                        cells[ 3 * k + 2 - k ].style.color = 'black';
                }, 1000 );
                return true;
            }
        return false;
}

function clearTable() {
    for(let a = 0; a < 3; a++)
      for(let b = 0; b < 3; b++)
          mat[a][b] = 0;

    for(let a = 0; a < 9; a++)
         cells[a].innerHTML = "";
    
         lastMove = 'o';
         whoMove.innerHTML = 'X';
}