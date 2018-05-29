document.addEventListener("DOMContentLoaded", function () {


    function GameOfLife(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;


        this.createBoard = function () {
            var board = document.getElementById("board");

            board.style.width = boardWidth * 10 + 'px';
            board.style.height = boardHeight * 10 + 'px';

            var allCells = this.width * this.height;

            for (var i = 0; i < allCells; i++) {
                var newdiv = document.createElement("div");
                board.appendChild(newdiv);
            }
            this.cells = [];
            this.cells = document.querySelectorAll("#board > div");

            for (var j = 0; j < this.cells.length; j++) {
                this.cells[j].addEventListener("mouseover", function () {
                    this.classList.toggle("live");
                })
            }
        }


    }

    GameOfLife.prototype.cellIndex = function (x, y) {
        var index = x + y * this.width;
        return (this.cells[index]);
    };

    GameOfLife.prototype.setCellState = function (x, y, state) {
        var index = x + y * this.width;

        if (state === "live") {
            this.cells[index].classList.add("live");
        } else {
            this.cells[index].classList.remove("live");
        }
    };


    /*    GameOfLife.prototype.firstGlider = function () {
            game.setCellState(10, 10, "live");
        };
    */

    GameOfLife.prototype.computeCellNextState = function (x, y) {

        var neighbour1 = this.cells[x + (y - 1) * this.width];
        var neighbour2 = this.cells[(x - 1) + (y - 1) * this.width];
        var neighbour3 = this.cells[(x - 1) + y * this.width];
        var neighbour4 = this.cells[(x - 1) + (y + 1) * this.width];
        var neighbour5 = this.cells[x + (y + 1) * this.width];
        var neighbour6 = this.cells[(x + 1) + (y + 1) * this.width];
        var neighbour7 = this.cells[(x + 1) + y * this.width];
        var neighbour8 = this.cells[(x + 1) + (y - 1) * this.width];


        var cellCurrentState = [];
        if (neighbour1 !== undefined && neighbour1.className === "live") {
            cellCurrentState.push(neighbour1.className);
        }

        if (neighbour2 !== undefined && neighbour2.className === "live") {
            cellCurrentState.push(neighbour2.className);
        }

        if (neighbour3 !== undefined && neighbour3.className === "live") {
            cellCurrentState.push(neighbour3.className);
        }

        if (neighbour4 !== undefined && neighbour4.className === "live") {
            cellCurrentState.push(neighbour4.className);
        }

        if (neighbour5 !== undefined && neighbour5.className === "live") {
            cellCurrentState.push(neighbour5.className);
        }

        if (neighbour6 !== undefined && neighbour6.className === "live") {
            cellCurrentState.push(neighbour6.className);
        }

        if (neighbour7 !== undefined && neighbour7.className === "live") {
            cellCurrentState.push(neighbour7.className);
        }

        if (neighbour8 !== undefined && neighbour8.className === "live") {
            cellCurrentState.push(neighbour8.className);
        }

        var numOfLivingCells = cellCurrentState.length;


        if ((this.cells[x + y * this.width].className !== "live") && (numOfLivingCells === 3)) {
            return 1;
        }

        if ((this.cells[x + y * this.width].className !== "live") && (numOfLivingCells !== 3)) {
            return 0;
        }

        if (this.cells[x + y * this.width].className === "live" && ((numOfLivingCells === 2) || (numOfLivingCells === 3))) {
            return 1;
        }

        if (this.cells[x + y * this.width].className === "live" && ((numOfLivingCells < 2) || (numOfLivingCells > 3))) {
            return 0;
        }
    };


    GameOfLife.prototype.computeNextGeneration = function () {
        /*this.newBoard = [];

        for (var i = 0; i < this.width; i++) {
            var x = i;
            for (var j = 0; j < this.height; j++) {
                var y = j;
                this.newBoard.push(this.computeCellNextState(i, j));
            }
        }
        return this.newBoard; */
// Nie dzialalo, bo petle byly zle. Zewnetrzna petla musi byc po wysokosci, a wewnetrzna po szerokosci.
        this.newBoard = [];
        for (var i = 0; i < this.height; i++) {
            var y = i;
            for (var j = 0; j < this.width; j++) {
                var x = j;
                this.newBoard.push(this.computeCellNextState(j, i));
            }
        }
        return this.newBoard;

    };


    GameOfLife.prototype.printNextGeneration = function () {
        this.computeNextGeneration();
        for (var i = 0; i < this.cells.length; i++) {
            if (this.newBoard[i] === 1) {
                this.cells[i].classList.add("live");
            } else if (this.newBoard[i] === 0) {
                this.cells[i].classList.remove("live");
            }
        }
        return this.cells;
    };

    //Dodaje eventy na buttonach, pozwalajace zaczac i zatrzymac gre.
    var btnplay = document.getElementById("play");
    var btnpause = document.getElementById("pause");

    var interval;
    btnplay.addEventListener("click", function () {
        interval = setInterval(function () {
            game.printNextGeneration()
        }, 200);
    });

    btnpause.addEventListener("click", function () {
        clearInterval(interval);
    });


    var game = new GameOfLife(50, 50);

    game.createBoard();

    //game.firstGlider();

})
