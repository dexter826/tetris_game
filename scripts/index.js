/**** CONSTANTS ****/
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLOR_MAPPING = [
    'red',
    'orange',
    'green',
    'purple',
    'blue',
    'cyan',
    'yellow',
    'white'
]

const BRICK_LAYOUT = [
    [
        [
            [1, 7, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 1],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 1, 7],
            [7, 1, 7],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [7, 1, 7],
            [7, 1, 1],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 1],
            [1, 1, 1],
            [7, 7, 7],
        ],
    ],
    [
        [
            [1, 7, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 1, 1],
            [1, 1, 7],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 7, 7],
            [7, 1, 1],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 7],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 7, 1],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 7],
            [7, 1, 1],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
        ],
        [
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
        ],
    ],
    [
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 1, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
    ],
];

const KEY_CODE = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    UP: 'ArrowUp',
}

const WHITE_COLOR_ID = 7;
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.generateWhiteBoard();
        this.score = 0;
        this.gameOver = false;
        this.isPlaying = false;
        this.paused = false;
        this.scoreAudio = new Audio('sounds/score.mp3');
        this.gameOverAudio = new Audio('sounds/game-over.mp3');
    }

    reset() {
        this.gameOver = false;
        this.score = 0;
        document.getElementById('score').innerHTML = this.score;
        this.grid = this.generateWhiteBoard();
        this.drawBoard();
        this.paused = false;
    }

    // Tạo bảng trắng
    generateWhiteBoard() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(WHITE_COLOR_ID));
    }

    // Vẽ ô
    drawCell(xAxis, yAxis, colorId) {
        this.ctx.fillStyle = COLOR_MAPPING[colorId] || COLOR_MAPPING[WHITE_COLOR_ID];
        this.ctx.fillRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(xAxis * BLOCK_SIZE, yAxis * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }

    // Vẽ bảng
    drawBoard() {
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[0].length; col++) {
                this.drawCell(col, row, this.grid[row][col]);
            }
        }
    }

    // Xử lý hàng đã đầy
    handleCompletedRows() {
        const latestGrid = board.grid.filter((row) => {
            return row.some((col) => col === WHITE_COLOR_ID);
        });
        const newScore = ROWS - latestGrid.length;
        const newRows = Array.from({ length: newScore }, () => Array(COLS).fill(WHITE_COLOR_ID));
        if (newScore) {
            board.grid = [...newRows, ...latestGrid];
            this.handleScore(newScore * 10);
            this.scoreAudio.play();
        }
    }

    // Xử lý ăn điểm
    handleScore(newScore) {
        this.score += newScore;
        document.getElementById('score').innerHTML = this.score;
        document.getElementById('top-score').innerHTML = Math.max(this.score, document.getElementById('top-score').innerHTML);
    }

    // Xử lý khi game over
    handleGameOver() {
        this.gameOver = true;
        this.isPlaying = false;
        this.gameOverAudio.play();
        Swal.fire({
            icon: "error",
            title: "GAME OVER!!!",
            text: "You have scored " + this.score + " points",
        });
        this.grid = this.generateWhiteBoard();
        this.drawBoard();
    }
}

class Brick {
    constructor(id) {
        this.id = id;
        this.layout = BRICK_LAYOUT[id];
        this.activeIndex = 0;
        this.colPos = 3;
        this.rowPos = -2
    }

    // Vẽ hình
    draw() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, this.id);
                }
            }
        }
    }

    // Xóa hình
    clear() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.drawCell(col + this.colPos, row + this.rowPos, WHITE_COLOR_ID);
                }
            }
        }
    }

    moveLeft() {
        if (!this.checkCollision(this.rowPos, this.colPos - 1, this.layout[this.activeIndex])) {
            this.clear();
            this.colPos--;
            this.draw();
        }
    }

    moveRight() {
        if (!this.checkCollision(this.rowPos, this.colPos + 1, this.layout[this.activeIndex])) {
            this.clear();
            this.colPos++;
            this.draw();
        }
    }

    moveDown() {
        if (!this.checkCollision(this.rowPos + 1, this.colPos, this.layout[this.activeIndex])) {
            this.clear();
            this.rowPos++;
            this.draw();
            return;
        }
        this.handleLanded();
        if (!board.gameOver) {
            generateNewBrick();
        }
    }

    rotate() {
        if (!this.checkCollision(this.rowPos, this.colPos, this.layout[(this.activeIndex + 1) % this.layout.length])) {
            this.clear();
            this.activeIndex = (this.activeIndex + 1) % this.layout.length;
            this.draw();
        }
    }

    // Kiểm tra va chạm
    checkCollision(nextRow, nextCol, nextLayout) {
        for (let row = 0; row < nextLayout.length; row++) {
            for (let col = 0; col < nextLayout[0].length; col++) {
                if (nextLayout[row][col] !== WHITE_COLOR_ID) {
                    const newCol = col + nextCol;
                    const newRow = row + nextRow;
                    if (
                        newCol < 0 || // Va chạm bên trái
                        newCol >= COLS || // Va chạm bên phải
                        newRow >= ROWS || // Va chạm đáy
                        (newRow >= 0 && board.grid[newRow][newCol] !== WHITE_COLOR_ID) // Va chạm ô đã có gạch
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // Xử lý khi hình rơi hết
    handleLanded() {
        if (this.rowPos <= 0) {
            board.handleGameOver();
            return;
        }

        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
                if (this.layout[this.activeIndex][row][col] !== WHITE_COLOR_ID) {
                    board.grid[row + this.rowPos][col + this.colPos] = this.id;
                }
            }
        }
        board.handleCompletedRows();
        board.drawBoard();
    }
}

function generateNewBrick() {
    brick = new Brick(Math.floor(Math.random() * 10) % BRICK_LAYOUT.length);
}

function drawOverlay() {
    board.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    board.ctx.fillRect(0, 0, board.ctx.canvas.width, board.ctx.canvas.height);
    drawTriangle();
}

function drawTriangle() {
    const centerX = board.ctx.canvas.width / 2;
    const centerY = board.ctx.canvas.height / 2;
    const size = 30; // Smaller size for the triangle

    board.ctx.fillStyle = 'white';
    board.ctx.beginPath();
    board.ctx.moveTo(centerX - size, centerY - size);
    board.ctx.lineTo(centerX - size, centerY + size);
    board.ctx.lineTo(centerX + size, centerY);
    board.ctx.closePath();
    board.ctx.fill();
}

board = new Board(ctx);
board.drawBoard();
let gameInterval = null;
let playMusic = null;

// Sự kiện click vào nút play
document.getElementById('play').addEventListener('click', () => {
    toggleGame();
});

board.ctx.canvas.addEventListener('click', () => {
    if (!board.isPlaying) {
        toggleGame();
    }
});

// Sửa đổi hàm toggleGame()
function toggleGame() {
    const playButton = document.getElementById('play');
    if (board.isPlaying) {
        // Tạm dừng game
        clearInterval(gameInterval);
        board.isPlaying = false;
        board.paused = true;  // đánh dấu game đang bị tạm dừng
        playButton.querySelector('.button-82-front').textContent = 'Play';

        // Dừng nhạc
        if (playMusic) {
            playMusic.pause();
            playMusic.currentTime = 0;
        }

        // Vẽ overlay
        drawOverlay();
        board.ctx.canvas.classList.add('pointer-cursor');
    } else {
        // Nếu game không đang chơi
        // Nếu không phải ở trạng thái tạm dừng (ví dụ: game mới hoặc đã game over) thì reset game
        if (!board.paused) {
            board.reset();
            generateNewBrick();
        }
        // Nếu đang tạm dừng thì chỉ tiếp tục (resume) mà không reset lại trạng thái
        board.isPlaying = true;
        board.paused = false;
        playButton.querySelector('.button-82-front').textContent = 'Stop';

        // Bắt đầu lại tiến trình rơi của brick
        gameInterval = setInterval(() => {
            if (!board.gameOver) {
                brick.moveDown();
            } else {
                clearInterval(gameInterval);
            }
        }, 1000);

        // Phát nhạc
        playMusic = new Audio('sounds/play-music.wav');
        playMusic.volume = 0.1;
        playMusic.play();
        playMusic.addEventListener('ended', () => {
            playMusic.currentTime = 0;
            playMusic.play();
        });

        board.ctx.canvas.classList.remove('pointer-cursor');
    }
}

document.addEventListener('keydown', (event) => {
    if (!board.gameOver && board.isPlaying) {
        switch (event.key) {
            case KEY_CODE.LEFT:
                brick.moveLeft();
                break;
            case KEY_CODE.RIGHT:
                brick.moveRight();
                break;
            case KEY_CODE.DOWN:
                brick.moveDown();
                break;
            case KEY_CODE.UP:
                brick.rotate();
                break;
            default:
                break;
        }
    }
});