const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [1, 4, 7],
    [2, 4, 6],
    [0, 4, 8]
];
const cellElements = document.querySelectorAll('[data-cell]');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]'); 
const winningMessageElement = document.getElementById('winning-message'); 
const board = document.getElementById('board');
const restartButton = document.getElementById('restart');
let circleTurn;


function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(CIRCLE_CLASS);
        cell.classList.remove(X_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});   
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}


startGame()

restartButton.addEventListener('click', startGame)  


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        circleTurn = !circleTurn;
        setBoardHoverClass();
    } 
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);

    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'DRAW'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? 'O' : 'X'} WINS`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    }) 
}