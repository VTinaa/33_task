let cells = document.querySelectorAll('.cell');
    let board = document.getElementById('board');
    let currentPlayer = 'X';

    function checkWinner() {
      let winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
      ];

      for (let combo of winningCombos) {
        let [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
          // cells[a].style.backgroundColor = 'green';
          // cells[b].style.backgroundColor = 'green';
          // cells[c].style.backgroundColor = 'green';
          cells[a].classList.add("border")
          cells[b].classList.add("border")
          cells[c].classList.add("border")
          return true;
        }
      }

      return false;
    }
    function computerMove() {
      let emptyCells = Array.from(cells).filter(cell => !cell.textContent);
      if (emptyCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].textContent = 'O';
        if (checkWinner()) {
          board.removeEventListener('click', handleCellClick);
          // alert("Комп'ютер виграв!");
          p.insertAdjacentHTML('afterbegin','<h1>Ви програли!</h1>')
          p.classList.add("border")
        }
        currentPlayer = 'X';
      }
    }

    function handleCellClick(event) {
      let cell = event.target;
      if (!cell.textContent) {
        cell.textContent = 'X';
        if (checkWinner()) {
          board.removeEventListener('click', handleCellClick);
          // alert('Ви виграли!');
          p.insertAdjacentHTML('afterbegin','<h1>Ви виграли!</h1>')
          p.classList.add("border")
        } else {
          computerMove();
        }
      }
    }

    board.addEventListener('click', handleCellClick);