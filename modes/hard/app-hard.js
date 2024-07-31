var empty;
var numOfMoves;
var checkWin = false;
var tileID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];



// starting function
function start() {
    numOfMoves = 0;
    checkWin = false;

    for (var i = 0; i < 16; i++) {
        var num = document.getElementById(i);
        num.className = "cell-hard";
    }
    randomNum = tileID.sort(function () {
        return (Math.round(Math.random()) - 0.5);
    });
    for (var i = 0; i < 16; i++) {
        var num = document.getElementById(i);
        if (randomNum[i] == 16) {
            num.className = "cell empty";
            num.innerText = "";
            empty = i;
        }
        else
            num.innerText = randomNum[i];
    }
}

// difference between the boards
var Problem = function (startState) {
    this.init_state = startState;
    return this;
}

// Where you are / Current State
function currentState() {
    var result = [];
    for (var i = 0; i < 16; i++) {
        var num = document.getElementById(String(i)).innerText;
        if (num == '') {
            result[i] = 16;
        } else {
            result[i] = Number(num);
        }
    }
    return result;
}

//making sure the board can be solved
Problem.prototype.solvable = function (start) {
    start = start.clone();
    start.splice(start.indexOf(16), 1);
    start[15] = 16;
    var count = 0;
    for (var i = 0; i < 15; i++) {
        if (start[i] != i + 1) {
            count++;
            var j = start.indexOf(i + 1);
            start[j] = start[i];
            start[i] = i + 1;
        }
    }
    return count % 2 == 0;
}

//making a clone of the board
Array.prototype.clone = function () {
    return this.slice(0);
};
Array.prototype.swap = function (i1, i2) {
    var copy = this.clone();
    var num = copy[i1];
    copy[i1] = copy[i2];
    copy[i2] = num;
    return copy;
};

// moving the numbers around
function movingNum(action, state) {
    var i = state.indexOf(16);
    switch (action) {
        case Action.up:
            return state[Util.index(move.x(i), move.y(i) - 1)];
        case Action.down:
            return state[Util.index(move.x(i), move.y(i) + 1)];
        case Action.left:
            return state[Util.index(move.x(i) - 1, move.y(i))];
        case Action.right:
            return state[Util.index(move.x(i) + 1, move.y(i))];
    }
}

//How to tell if you're done / the game is over
function done() {
    return document.getElementById('0').innerText == '1' &&
        document.getElementById('1').innerText == '2' &&
        document.getElementById('2').innerText == '3' &&
        document.getElementById('3').innerText == '4' &&
        document.getElementById('4').innerText == '5' &&
        document.getElementById('5').innerText == '6' &&
        document.getElementById('6').innerText == '7' &&
        document.getElementById('7').innerText == '8' &&
        document.getElementById('8').innerText == '9' &&
        document.getElementById('9').innerText == '10' &&
        document.getElementById('10').innerText == '11' &&
        document.getElementById('11').innerText == '12' &&
        document.getElementById('12').innerText == '13' &&
        document.getElementById('13').innerText == '14' &&
        document.getElementById('14').innerText == '15';
}

// function for clicking
function doClick(cell) {
    if (checkWin)
        return;

    if (cell.id != empty + '') {
        var emptyNum1 = Math.floor(empty / 4);
        var emptyNum2 = empty % 4;
        var idSelected = Number(cell.id);
        var selectedNum1 = Math.floor(idSelected / 4);
        var selectedNum2 = idSelected % 4;

        if ((Math.abs(emptyNum1 - selectedNum1) == 1 && emptyNum2 == selectedNum2) ||
            (Math.abs(emptyNum2 - selectedNum2) == 1 && emptyNum1 == selectedNum1)) {
            document.getElementById(empty).className = "cell";
            document.getElementById(empty).innerText = cell.innerText;

            cell.className = "cell empty";
            cell.innerText = '';

            empty = idSelected;
            numOfMoves++;

            document.getElementById("moves").innerText = "Number of moves so far: " + numOfMoves;
            // When you win
            if (done()) {
                checkWin = true;
                document.getElementById("moves").innerText = "You won! It took you " + numOfMoves + " moves to win!";
            }
        }
    }
}
