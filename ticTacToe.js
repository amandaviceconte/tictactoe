const squareSize = 96;
const matrixOrder = 3;
let playerTurn = 'o';
let winner;
let canPlay = true;
let totalSelectedSquares = 0;

let game = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let createSquares = () => {
    var trNumber = 1;
    for (let i = 0; i < matrixOrder; i++) {
        for (let j = 0; j < matrixOrder; j++) {
            $(`#tr${trNumber}`).append(`<td id="${i}${j}" class="gameSquares"></td>`);
        }
        trNumber++;
    }
}

let clickOnSquare = () => {
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

let isSelected = eventTarget => {
    if (eventTarget.attr('class') == 'selectedGameSquares') {
        return true;
    } else {
        return false;
    }
}

let checkRowWin = () => {
    for (i = 0; i < game.length; i++) {
        if (game[i][0] == game[i][1] && game[i][0] == game[i][2] && game[i][0] != 0) {
            $(`#${i}0`).css('background-color', 'gold');
            $(`#${i}1`).css('background-color', 'gold');
            $(`#${i}2`).css('background-color', 'gold');
            return true;
        }
    }
}

let checkCollumWin = () => {
    for (let i = 0; i < game.length; i++) {
        if (game[0][i] == game[1][i] && game[0][i] == game[2][i] && game[0][i] != 0) {
            $(`#0${i}`).css('background-color', 'gold');
            $(`#1${i}`).css('background-color', 'gold');
            $(`#2${i}`).css('background-color', 'gold');
            return true;
        }
    }
}

const checkDiagonalWin = () => {
    if ((game[0][0] == game[1][1] && game[0][0] == game[2][2]) && game[1][1] != 0) {
        $(`#00`).css('background-color', 'gold');
        $(`#11`).css('background-color', 'gold');
        $(`#22`).css('background-color', 'gold');
        return true;
    } else if ((game[0][2] == game[1][1] && game[0][2] == game[2][0]) && game[1][1] != 0) {
        $(`#02`).css('background-color', 'gold');
        $(`#11`).css('background-color', 'gold');
        $(`#20`).css('background-color', 'gold');
        return true
    }
}

const checkDrawCondition = () => {
    if (canPlay && totalSelectedSquares == 9) {
        return true;
    }
}

let checkWinCondition = () => {
    if (checkRowWin() || checkCollumWin() || checkDiagonalWin()) {
        canPlay = false;
        console.log(`Player ${winner.toUpperCase()} wins!`);
        winnerMessage();
    } else if (checkDrawCondition()) {
        console.log(`It's a draw!`);
        drawMessage();
    }
}

const addMessageElements = () => {
    // this >>> $('#playerIcon').length != 0 <<< checks if id exists
    if ($('#playerIcon').length != 0) {
        $('#playerIcon').empty();
    } else {
        let iconDiv = $('<div id="playerIcon"></div>');
        $('#playerTurn').append(iconDiv);
    }
    if ($('#playerTurnText').length != 0) {
        $('#playerTurnText').empty();
    } else {
        let textDiv = $('<div id="playerTurnText" class="inGameStyle"></div>');
        $('#playerTurn').append(textDiv);
    }
}

const showPlayerTurn = () => {
    addMessageElements();
    let iconId = $('#playerIcon');
    let textId = $('#playerTurnText')
    textId.text(' turn');
    if (playerTurn == 'o') {
        iconId.css('background', 'url("images/smallO.png"');
    } else {
        iconId.css('background', 'url("images/smallX.png"');
    }
}

const winnerMessage = () => {
    addMessageElements();
    $('#playerTurnText').append(' wins! ');
    if (winner == 'o') {
        $('#playerIcon').css('background', 'url("images/smallO.png"');
    } else {
        $('#playerIcon').css('background', 'url("images/smallX.png"');
    }
}

const drawMessage = () => {
    addMessageElements();
    $('#playerIcon').remove();
    $('#playerTurnText').removeClass('inGameStyle');
    $('#playerTurnText').text(`It's a tie!`);
}

// const resetGame = () => {
//     let gameStatus = $('#playerTurnText');
//     totalSelectedSquares = 0;
//     gameStatus.empty();
//     let newGameMessage = $('<p>New Game</p>').css('margin', '0');
//     gameStatus.append(newGameMessage);
// }

let startGame = () => {
    createSquares();
    clickOnSquare();
    showPlayerTurn();
}

startGame();