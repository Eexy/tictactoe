class Tictactoe {
  constructor(_element, _pawns) {
    this.element = _element;
    this.cells = [..._element.querySelectorAll(".board-cell")];
    this.board = Array(9).fill(-1);
    this.playerTurn = 0;
    this.pawns = _pawns;
    this.reset = document.querySelectorAll('.reset');

    this.handleClick = this.handleClick.bind(this);

    this.cells.forEach((cell) =>
      cell.addEventListener("click", this.handleClick)
    );

    this.handleReset = this.handleReset.bind(this);
    
    this.reset.forEach((btn) => {
      btn.addEventListener('click', this.handleReset);
    });
  }

  handleClick(e) {
    const currentCell = e.target;

    // Check if there is not already a pawn
    if (this.isEmpty(currentCell)) {
      const img = this.choosePawnImg();
      currentCell.appendChild(img);

      const cellIndex = this.getCellIndex(currentCell);
      this.board[cellIndex] = this.playerTurn;

      this.checkResult();

      this.playerTurn = +!this.playerTurn;
    }
  }

  // Check if there is a win or a draw
  checkResult() {
    if (this.checkWin()) {
      return this.win();
    } else if (this.checkDraw()) {
      return this.draw();
    }
  }

  win() {
    const msg = `Player ${this.playerTurn} has win`;
    const img = this.pawns[this.playerTurn];
    this.setModal(msg, img);
    this.showModal();
  }

  setModal(msg, img){
    const resultMsg = document.querySelector('.result-msg');
    resultMsg.textContent = msg;

    const resultImg = document.querySelector('.result-img');
    resultImg.setAttribute('src', `img/${img}`);
  }

  showModal(){
    const modalWrapper = document.querySelector('.modal-wrapper');

    modalWrapper.style.display = 'flex';
  }

  closeModal(){
    const modalWrapper = document.querySelector('.modal-wrapper');
    modalWrapper.style.display = 'none';
  }

  draw() {
    const msg = 'Draw';
    const img = 'equal.svg';
    this.setModal(msg, img);
    this.showModal();
  }

  // reset the game
  handleReset(){
    this.board = Array(9).fill(-1);
    this.closeModal();

    this.cells.forEach((cell) => {
      const img = cell.querySelector('img');
      if(img){
        cell.removeChild(img);
      }
    });
  }

  checkWin() {
    // all the winning combination
    const possibleWinCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 6, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let isWin = false;

    // We check if there is a winning combination
    possibleWinCombination.forEach((combination) => {
      let consecutiveCell = 0;
      combination.forEach((cellIndex) => {
        if (this.board[cellIndex] === this.playerTurn) {
          ++consecutiveCell;
        }
      });

      if (consecutiveCell === 3) {
        isWin = true;
      }
    });

    return isWin;
  }

  checkDraw() {
    return this.board.every((cell) => cell !== -1);
  }

  choosePawnImg() {
    const img = document.createElement("img");
    img.setAttribute("src", `img/${this.pawns[this.playerTurn]}`);
    img.classList.add("pawn");

    return img;
  }

  getCellIndex(cell) {
    return +cell.getAttribute("data-cell-number");
  }

  isEmpty(cell) {
    const cellIndex = +cell.getAttribute("data-cell-number");

    return this.board[cellIndex] === -1;
  }
}
