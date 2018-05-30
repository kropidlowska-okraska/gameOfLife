document.addEventListener("DOMContentLoaded", function () {


    function GameOfLife(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;


        this.createBoard = function () {
            const board = document.getElementById("board");

            board.style.width = boardWidth * 18 + 'px';
            board.style.height = boardHeight * 18 + 'px';

            const allCells = this.width * this.height;

            for (let i = 0; i < allCells; i++) {
                const newdiv = document.createElement("div");
                board.appendChild(newdiv);
            }

            this.cells = document.querySelectorAll("#board > div");

            for (let j = 0; j < this.cells.length; j++) {
                this.cells[j].addEventListener("click", function () {
                    this.classList.toggle("live");
                })
            }
        }
    }

    GameOfLife.prototype.cellIndex = function (x, y) {
        const index = x + y * this.width;
        return (this.cells[index]);
    };

    GameOfLife.prototype.setCellState = function (x, y, state) {
        const index = x + y * this.width;
        this.cells[index].classList.toggle("live");
    };


    /*    GameOfLife.prototype.firstGlider = function () {
            game.setCellState(10, 10, "live");
        };
    */

    GameOfLife.prototype.computeCellNextState = function (x, y) {

        const neighbour1 = this.cells[x + (y - 1) * this.width];
        const neighbour2 = this.cells[(x - 1) + (y - 1) * this.width];
        const neighbour3 = this.cells[(x - 1) + y * this.width];
        const neighbour4 = this.cells[(x - 1) + (y + 1) * this.width];
        const neighbour5 = this.cells[x + (y + 1) * this.width];
        const neighbour6 = this.cells[(x + 1) + (y + 1) * this.width];
        const neighbour7 = this.cells[(x + 1) + y * this.width];
        const neighbour8 = this.cells[(x + 1) + (y - 1) * this.width];


        const cellCurrentState = [];
        if (neighbour1 !== undefined && neighbour1.classList.contains('live')) {
            cellCurrentState.push(neighbour1.className);
        }

        if (neighbour2 !== undefined && neighbour2.classList.contains('live')) {
            cellCurrentState.push(neighbour2.className);
        }

        if (neighbour3 !== undefined && neighbour3.classList.contains('live')) {
            cellCurrentState.push(neighbour3.className);
        }

        if (neighbour4 !== undefined && neighbour4.classList.contains('live')) {
            cellCurrentState.push(neighbour4.className);
        }

        if (neighbour5 !== undefined && neighbour5.classList.contains('live')) {
            cellCurrentState.push(neighbour5.className);
        }

        if (neighbour6 !== undefined && neighbour6.classList.contains('live')) {
            cellCurrentState.push(neighbour6.className);
        }

        if (neighbour7 !== undefined && neighbour7.classList.contains('live')) {
            cellCurrentState.push(neighbour7.className);
        }

        if (neighbour8 !== undefined && neighbour8.classList.contains('live')) {
            cellCurrentState.push(neighbour8.className);
        }

        const numOfLivingCells = cellCurrentState.length;


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
        this.newBoard = [];
        for (let i = 0; i < this.height; i++) {
            const y = i;
            for (let j = 0; j < this.width; j++) {
                const x = j;
                this.newBoard.push(this.computeCellNextState(j, i));
            }
        }
        return this.newBoard;
    };


    GameOfLife.prototype.printNextGeneration = function () {
        this.computeNextGeneration();
        for (let i = 0; i < this.cells.length; i++) {
            if (this.newBoard[i] === 1) {
                this.cells[i].classList.add("live");
            } else if (this.newBoard[i] === 0) {
                this.cells[i].classList.remove("live");
            }
        }
        return this.cells;
    };

    //Dodaje eventy na buttonach, pozwalajace zaczac i zatrzymac gre.
    const btnplay = document.getElementById("play");
    const btnpause = document.getElementById("pause");

    let interval = null;
    btnplay.addEventListener("click", function () {
        interval = setInterval(function () {
            game.printNextGeneration()
        }, 200);
    });

    btnpause.addEventListener("click", function () {
        clearInterval(interval);
    });


    const game = new GameOfLife(30, 30);

    game.createBoard();

    //game.firstGlider();

})
