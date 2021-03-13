let cells = document.querySelectorAll('.game-cell');
let mat = [];// = 1 pt 'X', = 2 pt 'O'
let lastMove = 'o';
let scorex = document.querySelector('.scorex');
let scoreo = document.querySelector('.scoreo');
let whoMove = document.querySelector('.who-move');
for(let i = 0; i < 3; i++)
    mat[i] = new Array(3);

for(i = 0; i < 3; i++)
    for(j = 0; j < 3; j++)
        mat[i][j] = 0;

for(let i = 0; i < 9; i++) {
    cells[i].addEventListener('click', () => {
    
        if( cells[i].innerHTML == "" ) {
            //completez casuta
            if( lastMove == 'o' ) {
                cells[i].innerHTML = 'X';
                mat[ Math.floor(i / 3) ][i % 3] = 1;
                lastMove = 'x';
                whoMove.innerHTML = 'O';

                //verific daca a castigat 'X'
                winnerX();
            }else {
                cells[i].innerHTML = 'O';
                mat[ Math.floor(i / 3) ][i % 3] = 2;
                lastMove = 'o';
                whoMove.innerHTML = 'X';

                //verific daca a castigat 'O'
                winnerO();
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
                setTimeout( () => {
                    clearTable();
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
                setTimeout( () => {
                    clearTable();
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
                setTimeout( () => {
                    clearTable();
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
                setTimeout( () => {
                    clearTable();
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
                setTimeout( () => {
                    clearTable();
                }, 1000 );
                break;
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
                setTimeout( () => {
                    clearTable();
                }, 1000 );
                break;
            }
        }

        //pe diagonala principala
        cnt = 0;
        for(let j = 0; j < 3; j++)
            if( mat[j][j] == 1 )
                cnt++;

        if( cnt == 3 ) {
            if( cnt == 3 ) {
                console.log("X win");
                scorex.innerHTML++;
                whoMove.innerHTML = 'X';
                lastMove = 'o';
                setTimeout( () => {
                    clearTable();
                }, 1000 );
            }
        }

        //pe diagonala secundara
        cnt = 0;
        for(let j = 0; j < 3; j++)
            if( mat[j][2 - j] == 1 )
                cnt++;

        if( cnt == 3 ) {
            if( cnt == 3 ) {
                console.log("X win");
                scorex.innerHTML++;
                whoMove.innerHTML = 'X';
                lastMove = 'o';
                setTimeout( () => {
                    clearTable();
                }, 1000 );
            }
        }
}

function clearTable() {
    for(let a = 0; a < 3; a++)
      for(let b = 0; b < 3; b++)
          mat[a][b] = 0;

    for(let a = 0; a < 9; a++)
         cells[a].innerHTML = "";
}