let xIsNext = true;
let squares = Array(9).fill(null);

const squareElements = document.querySelectorAll('.square');
const statusElement = document.querySelector('.status');
const restartButton = document.querySelector('.restart-button');

squareElements.forEach((square, index) => {
    square.addEventListener('click', () => {
        if (calculateWinner(squares) || squares[index]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[index] = 'X';
        } else {
            nextSquares[index] = 'O';
        }
        squares = nextSquares;
        xIsNext = !xIsNext;
        updateBoard();
    });
});

restartButton.addEventListener('click', () => {
    window.location.reload();
});

function updateBoard() {
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else if (!squares.includes(null)) {
        status = 'It\'s a draw!';
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
    statusElement.textContent = status;
    squareElements.forEach((square, index) => {
        square.textContent = squares[index];
    });
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}