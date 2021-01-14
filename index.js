const board = document.querySelector('.board');
const cells = document.querySelectorAll('.board-cell');
const winner = document.querySelector('.winner-name');
let ar = Array(9).fill(-1);
let player = true;
let isWin = false;
let draw = false;

cells.forEach(cell => {
    cell.addEventListener('click', play);
});

function play(e) {
    const cell = e.target;
    if (isEmpty(cell)) {
        if (player === true) {
            cell.textContent = 'x';
        } else {
            cell.textContent = 'o';
        }

        const cellNumber = parseInt(cell.getAttribute('data-cell-number'));
        ar[cellNumber] = Number(player);

        checkBoard(cellNumber);

        player = !player;
    }
}

// stop the game by removing all the events on the cell
function stopGame() {
    cells.forEach(cell => {
        cell.removeEventListener('click', play);
    });
}

// check if it's win or it's draw
function checkBoard(cellNumber){
    checkWin(cellNumber);
    checkDraw();

    if(isWin || draw){
        winner.textContent = (isWin) ? Number(player) : -1;
        stopGame();
    }
}

// check if a player has win
function checkWin(cellNumber) {
    row(cellNumber);
    column(cellNumber);
    diagonal();
}

// check if a row is full
function row(cellNumber){
    const rowNumber = Math.floor(cellNumber / 3);
    let n = 0;

    ar.forEach((_, i) => {
        if(Math.floor(i/3) === rowNumber && ar[i] === ar[cellNumber]){
            ++n;
        }
    });

    if(n === 3){
        isWin = true;
    }
}

// check if a column is full
function column(cellNumber){
    const colNumber = cellNumber % 3;
    let n = 0;

    ar.forEach((_, i) => {
        if(i%3 === colNumber && ar[i] === ar[cellNumber]){
            ++n;
        }
    });

    if(n === 3){
        isWin = true;
    }
}

// check diagonals
function diagonal(){
    const diag1 = [0,4,8].every(cell => ar[cell] === Number(player));
    const diag2 = [2,4,6].every(cell => ar[cell] === Number(player));

    if(diag1 || diag2){
        isWin = true;
    }
}

// check if it's a draw
function checkDraw() {
    draw = ar.every(cell => cell != -1);
}

// Check if a cell is empty
function isEmpty(cell) {
    return cell.textContent === '';
}