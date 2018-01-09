const squareSize = 96;
const matrixOrder = 3;
let playerTurn = 'o';
let winner;
let canPlay = true;
let totalSelectedSquares = 0;
let xScore = 0;
let oScore = 0;
let historyMsgCount = 0;

const game = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

const createSquares = () => {
    let trNumber = 1;
    for (let i = 0; i < matrixOrder; i++) {
        for (let j = 0; j < matrixOrder; j++) {
            $(`#tr${trNumber}`).append(`<td id="${i}${j}" class="gameSquares"></td>`);
        }
        trNumber++;
    }
}

const clickOnSquare = () => {
    $('.gameSquares').on('click', event => {
        let target = $(event.target);
        let iMatrixElem = Number(target.attr('id').slice(0, 1));
        let jMatrixElem = Number(target.attr('id').slice(1, 2));
        if (!isSelected(target) && canPlay) {
            totalSelectedSquares++;
            if (playerTurn == 'o') {
                target.css('background-image', 'url("images/iconO.png")');
                game[iMatrixElem][jMatrixElem] = playerTurn;
                target.toggleClass('gameSquares selectedGameSquares');
                winner = 'o';
                playerTurn = 'x';
            } else {
                target.css('background-image', 'url("images/iconX.png")');
                game[iMatrixElem][jMatrixElem] = playerTurn;
                target.toggleClass('gameSquares selectedGameSquares');
                winner = 'x';
                playerTurn = 'o';
            }
            showPlayerTurn();
            checkWinCondition();
        }
    })
}

const isSelected = eventTarget => {
    if (eventTarget.attr('class') == 'selectedGameSquares') {
        return true;
    } else {
        return false;
    }
}

const checkRowWin = () => {
    for (i = 0; i < game.length; i++) {
        if (game[i][0] == game[i][1] && game[i][0] == game[i][2] && game[i][0] != 0) {
            $(`#${i}0`).css('background-color', '#fff59b');
            $(`#${i}1`).css('background-color', '#fff59b');
            $(`#${i}2`).css('background-color', '#fff59b');
            return true;
        }
    }
}

const checkCollumWin = () => {
    for (let i = 0; i < game.length; i++) {
        if (game[0][i] == game[1][i] && game[0][i] == game[2][i] && game[0][i] != 0) {
            $(`#0${i}`).css('background-color', '#fff59b');
            $(`#1${i}`).css('background-color', '#fff59b');
            $(`#2${i}`).css('background-color', '#fff59b');
            return true;
        }
    }
}

const checkDiagonalWin = () => {
    if ((game[0][0] == game[1][1] && game[0][0] == game[2][2]) && game[1][1] != 0) {
        $(`#00`).css('background-color', '#fff59b');
        $(`#11`).css('background-color', '#fff59b');
        $(`#22`).css('background-color', '#fff59b');
        return true;
    } else if ((game[0][2] == game[1][1] && game[0][2] == game[2][0]) && game[1][1] != 0) {
        $(`#02`).css('background-color', '#fff59b');
        $(`#11`).css('background-color', '#fff59b');
        $(`#20`).css('background-color', '#fff59b');
        return true
    }
}

const checkDrawCondition = () => {
    if (canPlay && totalSelectedSquares == 9) {
        return true;
    }
}

const setWinScore = () => {
    if(winner == 'o') {
        oScore++;
        $('#oScore').empty();
        $('#oScore').text(oScore);
    } else {
        xScore++;
        $('#xScore').empty();
        $('#xScore').text(xScore);
    }
}

const checkWinCondition = () => {
    if (checkRowWin() || checkCollumWin() || checkDiagonalWin()) {
        canPlay = false;
        console.log(`Player ${winner} wins!`);
        setWinScore();
        winnerMessage();
        addToHistory();
    } else if (checkDrawCondition()) {
        console.log(`It's a draw!`);
        drawMessage();
        addToHistory();
    }
}

const addMessageElements = () => {
    // this >>> $('#playerIcon').length != 0 <<< checks if id exists
    let iconDiv = $('<div id="playerIcon"></div>');
    let textDiv = $('<div id="playerTurnText" class="inGameStyle"></div>');
    if ($('#playerIcon').length != 0) {
        $('#playerIcon').empty();
    } else {
        $('#playerTurn').empty();
        $('#playerTurn').append(iconDiv);
        $('#playerTurn').append(textDiv);
    }
    if ($('#playerTurnText').length != 0) {
        $('#playerTurnText').empty();
    } else {
        $('#playerTurn').append(textDiv);
    }
}

const showPlayerTurn = () => {
    addMessageElements();
    let iconId = $('#playerIcon');
    let textId = $('#playerTurnText')
    textId.text(' turn');
    iconId.css('background', `url('images/small${playerTurn.toUpperCase()}.png')`);
}

const winnerMessage = () => {
    addMessageElements();
    $('#playerTurnText').append('wins!');
    $('#playerIcon').css('background', `url('images/small${winner.toUpperCase()}.png')`); 
}

const drawMessage = () => {
    addMessageElements();
    $('#playerIcon').remove();
    $('#playerTurnText').removeClass('inGameStyle');
    $('#playerTurnText').text(`It's a tie!`);
}

const addToHistory = () => {
    $('#winsAndTies').append(`<p id="p${historyMsgCount}" class="historyMessages"></p>`);
    let histMsg = $(`#p${historyMsgCount}`);
    if(!canPlay) {
        histMsg.text(` wins!!`);
        histMsg.css('background', `url('images/small${winner.toUpperCase()}.png')`);
        histMsg.css('background-repeat', 'no-repeat');
        historyMsgCount++; 
    } else {
        histMsg.text(`It's a tie!`);
        histMsg.css('color', 'white');
        historyMsgCount++;
        
    }
}

const cleanTableRows = () => {
    for(let i = 1; i <= game.length; i++) {
        $(`#tr${i}`).empty();
    }
}

const resetGameArray = () => {
    for(let i = 0; i < game.length; i++) {
        game[i] = [0, 0, 0];
    }
}

// To restart the game this have to happen:
    // totalSelectedSquares goes back to 0
    // All classes "selectedGameSquares" are removed
const restartGame = () => {
    totalSelectedSquares = 0;
    canPlay = true;
    cleanTableRows();
    resetGameArray();
    createSquares();
    clickOnSquare();
    showPlayerTurn();
}

const restartGameButton = () => {
    $('#restartGameButton').on('click', event => {
        restartGame();
        console.log('Restart game');
    })
}

const startGame = () => {
    createSquares();
    clickOnSquare();
    showPlayerTurn();
    restartGameButton();
}

startGame();