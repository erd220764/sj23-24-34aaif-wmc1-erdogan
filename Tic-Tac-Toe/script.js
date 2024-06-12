const gameBoard = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart-button');
const cpuModeButton = document.getElementById('cpu-mode');
const friendModeButton = document.getElementById('friend-mode');

const playerSymbol = 'x';
const cpuSymbol = 'o';
let currentPlayer = playerSymbol;
let gameMode = 'cpu'; // default game mode
let board = Array(9).fill(null);

function checkWinner(symbol) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === symbol);
    });
}

function checkDraw() {
    return board.every(cell => cell !== null);
}

function cpuMove() {
    let availableCells = board
        .map((cell, index) => cell === null ? index : null)
        .filter(index => index !== null);

    if (availableCells.length === 0) return;

    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomIndex] = cpuSymbol;
    cells[randomIndex].classList.add(cpuSymbol);
    cells[randomIndex].textContent = cpuSymbol.toUpperCase();

    if (checkWinner(cpuSymbol)) {
        setTimeout(() => alert('CPU wins!'), 100);
        setTimeout(resetGame, 100);
    } else if (checkDraw()) {
        setTimeout(() => alert('Draw!'), 100);
        setTimeout(resetGame, 100);
    }
}

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] === null) {
        board[index] = currentPlayer;
        event.target.classList.add(currentPlayer);
        event.target.textContent = currentPlayer.toUpperCase();

        if (checkWinner(currentPlayer)) {
            setTimeout(() => alert(`${currentPlayer.toUpperCase()} wins!`), 100);
            setTimeout(resetGame, 100);
        } else if (checkDraw()) {
            setTimeout(() => alert('Draw!'), 100);
            setTimeout(resetGame, 100);
        } else {
            if (gameMode === 'cpu') {
                currentPlayer = cpuSymbol;
                cpuMove();
                currentPlayer = playerSymbol;
            } else {
                currentPlayer = currentPlayer === playerSymbol ? cpuSymbol : playerSymbol;
            }
        }
    }
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.classList.remove(playerSymbol, cpuSymbol);
        cell.textContent = '';
    });
    currentPlayer = playerSymbol;
}

function setGameMode(mode) {
    gameMode = mode;
    resetGame();
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', resetGame);
cpuModeButton.addEventListener('click', () => setGameMode('cpu'));
friendModeButton.addEventListener('click', () => setGameMode('friend'));