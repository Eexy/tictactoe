class Tictactoe {
  constructor(_element, _pawns) {
    this.element = _element;
    this.cells = [..._element.querySelectorAll(".board-cell")];
    this.board = [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1],
    ];
    this.playerTurn = 0;
    this.pawns = _pawns;
    this.reset = document.querySelectorAll(".reset");

    this.evaluate = this.evaluate.bind(this);
    this.findBestMove = this.findBestMove.bind(this);
    this.minmax = this.minmax.bind(this);
    this.checkWin = this.checkWin.bind(this);

    this.handleClick = this.handleClick.bind(this);

    this.cells.forEach((cell) =>
      cell.addEventListener("click", this.handleClick)
    );

    this.handleReset = this.handleReset.bind(this);

    this.reset.forEach((btn) => {
      btn.addEventListener("click", this.handleReset);
    });
  }

  evaluate() {
    let isWin = this.checkWin();

    if (isWin) {
      if (this.playerTurn === 0) {
        return 10;
      } else if (this.playerTurn === 1) {
        return -10;
      }
    }

    let isDraw = this.checkDraw();
    if (isDraw) {
      return 0;
    }
  }

  minmax(depth, isMax) {
    let score = this.evaluate(this.board);

    if (score === 10 || score === -10) {
      return score;
    }

    if (!this.checkDraw()) {
      if (isMax) {
        let best = -Infinity;

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (this.board[i][j] === -1) {
              this.board[i][j] = 0;

              best = Math.max(best, this.minmax(depth + 1, !isMax));

              this.board[i][j] = -1;
            }
          }

          return best;
        }
      }
    } else {
      let best = +Infinity;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Check if cell isn't empty
          if (this.board[i][j] === -1) {
            this.board[i][j] = 0;

            best = Math.min(best, minmax(depth + 1, !isMax));

            this.board[i][j] = -1;
          }
        }
      }

      return best;
    }
  }

  findBestMove() {
    let bestVal = -Infinity;
    let move = [-1, -1];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === -1) {
          this.board[i][j] = 0;

          let moveVal = this.minmax(0, true);

          this.board[i][j] = -1;

          if (moveVal > bestVal) {
            move = [i, j];
            bestVal = moveVal;
          }
        }
      }
    }

    let row = move[0];
    let col = move[1];
    if (move[0] === -1 && move[1] === -1) {
      const cell = this.chooseRandomCell();

      row = cell[0];
      col = cell[1];
    }

    this.board[row][col] = 1;

    let cell = null;
    this.cells.forEach((temp) => {
      if(temp.dataset.rowIndex == row && temp.dataset.colIndex == col){
        cell = temp;
      }
    })

    const img = this.choosePawnImg();
    cell.appendChild(img);
  }

  chooseRandomCell() {
    let row = Math.floor(Math.random() * 3);
    let col = Math.floor(Math.random() * 3);

    let isOccupied = false;

    if (this.board[row][col] != -1) {
      isOccupied = true;
    }

    while (isOccupied) {
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);

      if (this.board[row][col] == -1) {
        isOccupied = false;
      }
    }

    return [row, col];
  }

  handleClick(e) {
    const currentCell = e.target;
    const col = +currentCell.getAttribute("data-col-index");
    const row = +currentCell.getAttribute("data-row-index");

    // Check if there is not already a pawn
    if (this.isEmpty(currentCell)) {
      const img = this.choosePawnImg();
      currentCell.appendChild(img);

      this.board[row][col] = 0;
      
      let isWin = this.checkWin();
      let isDraw = this.checkDraw();
      
      if(isWin){
        return this.win();
      }
      
      if(isDraw){
        return this.draw();
      }
      this.playerTurn = 1;

      this.findBestMove();

      isWin = this.checkWin();
      isDraw = this.checkDraw();

      if(isWin){
        return this.win();
      }

      if(isDraw){
        return this.draw();
      }

      this.playerTurn = 0;
    }
  }

  win() {
    const msg = `Player ${this.playerTurn} has win`;
    const img = this.pawns[this.playerTurn];
    this.setModal(msg, img);
    this.showModal();
  }

  setModal(msg, img) {
    const resultMsg = document.querySelector(".result-msg");
    resultMsg.textContent = msg;

    const resultImg = document.querySelector(".result-img");
    resultImg.setAttribute("src", `img/${img}`);
  }

  showModal() {
    const modalWrapper = document.querySelector(".modal-wrapper");

    modalWrapper.style.display = "flex";
  }

  closeModal() {
    const modalWrapper = document.querySelector(".modal-wrapper");
    modalWrapper.style.display = "none";
  }

  draw() {
    const msg = "Draw";
    const img = "equal.svg";
    this.setModal(msg, img);
    this.showModal();
  }

  // reset the game
  handleReset() {
    this.board = [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1],
    ];
    this.closeModal();

    this.cells.forEach((cell) => {
      const img = cell.querySelector("img");
      if (img) {
        cell.removeChild(img);
      }
    });

    this.playerTurn = 0;
  }

  checkWin() {
    // Check rows
    for (let row = 0; row < 3; row++) {
      if (
        this.board[row][0] === this.board[row][1] &&
        this.board[row][1] === this.board[row][2]
      ) {
        if (this.board[row][0] !== -1) {
          return true;
        }
      }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
      if (
        this.board[0][col] === this.board[1][col] &&
        this.board[1][col] === this.board[2][col]
      ) {
        if (this.board[0][col] !== -1) {
          return true;
        }
      }
    }

    // check diagonals.
    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2]
    ) {
      if (this.board[0][0] !== -1) {
        return true;
      }
    }

    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0]
    ) {
      if (this.board[0][2] !== -1) {
        return true;
      }
    }

    return false;
  }

  checkDraw() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === -1) {
          return false;
        }
      }
    }

    return true;
  }

  choosePawnImg() {
    const img = document.createElement("img");
    img.setAttribute("src", `img/${this.pawns[this.playerTurn]}`);
    img.classList.add("pawn");

    return img;
  }

  isEmpty(cell) {
    const col = +cell.getAttribute("data-col-index");
    const row = +cell.getAttribute("data-row-index");

    return this.board[row][col] === -1;
  }
}
