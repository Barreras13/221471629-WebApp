// Game board settings
const boardSize = 20; // Size of the game board in terms of number of cells
const cellSize = 20; // Size of each cell in pixels

// Snake variables
let snake = [{ x: 10, y: 10 }]; // Initial position of the snake
let direction = "right"; // Initial direction of the snake

// Food variables
let food = { x: 15, y: 10 }; // Initial position of the food

// Score variable
let score = 0;

// Function to draw the game board
function drawBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";

    // Draw the snake
    snake.forEach(segment => {
        const snakeSegment = document.createElement("div");
        snakeSegment.className = "snake-segment";
        snakeSegment.style.left = segment.x * cellSize + "px";
        snakeSegment.style.top = segment.y * cellSize + "px";
        gameBoard.appendChild(snakeSegment);
    });

    // Draw the food
    const foodElement = document.createElement("div");
    foodElement.id = "food";
    foodElement.style.left = food.x * cellSize + "px";
    foodElement.style.top = food.y * cellSize + "px";
    gameBoard.appendChild(foodElement);

    // Update the score
    document.getElementById("score").textContent = score;
}

// Function to handle keyboard input
function handleKeyPress(event) {
    if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    } else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    } else if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    } else if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }
}

// Function to update the game state
function updateGame() {
    // Move the snake
    const head = { x: snake[0].x, y: snake[0].y };
    if (direction === "up") {
        head.y -= 1;
    } else if (direction === "down") {
        head.y += 1;
    } else if (direction === "left") {
        head.x -= 1;
    } else if (direction === "right") {
        head.x += 1;
    }

    snake.unshift(head);

    // Check if the snake collided with the food
    if (head.x === food.x && head.y === food.y) {
        // Generate new food at a random position
        food.x = Math.floor(Math.random() * boardSize);
        food.y = Math.floor(Math.random() * boardSize);

        // Increase the score
        score++;
    } else {
        // Remove the tail segment of the snake
        snake.pop();
    }

    // Check if the snake collided with itself or the game board edges
    if (
        head.x < 0 ||
        head.x >= boardSize ||
        head.y < 0 ||
        head.y >= boardSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + score);
    }

    // Redraw the game board
    drawBoard();
}

// Start the game
drawBoard();
const gameInterval = setInterval(updateGame, 200);
document.addEventListener("keydown", handleKeyPress);