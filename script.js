const board = document.getElementById('board');
const diceDisplay = document.getElementById('dice');
const statusDisplay = document.getElementById('status');

const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78
};

const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100
};

let playerPosition = 1;

// Create board
for (let i = 100; i >= 1; i--) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = `cell-${i}`;
    cell.innerText = i;

    if (snakes[i]) {
        cell.classList.add('snake');
        cell.innerText += " 🐍";
    }
    if (ladders[i]) {
        cell.classList.add('ladder');
        cell.innerText += " 🪜";
    }

    board.appendChild(cell);
}

updatePlayer();

function rollDice() {
    if (playerPosition >= 100) {
        statusDisplay.innerText = "🎉 You already won! Refresh to play again.";
        return;
    }

    const roll = Math.floor(Math.random() * 6) + 1;
    diceDisplay.innerText = `Dice: ${roll}`;
    
    let nextPos = playerPosition + roll;

    if (nextPos > 100) {
        statusDisplay.innerText = "You need exact number to finish!";
        return;
    }

    // Check for snakes or ladders
    if (ladders[nextPos]) {
        statusDisplay.innerText = `You climbed a ladder! 🪜 From ${nextPos} to ${ladders[nextPos]}`;
        nextPos = ladders[nextPos];
    } else if (snakes[nextPos]) {
        statusDisplay.innerText = `Oh no! Bitten by a snake! 🐍 From ${nextPos} to ${snakes[nextPos]}`;
        nextPos = snakes[nextPos];
    } else {
        statusDisplay.innerText = `Moved to ${nextPos}`;
    }

    playerPosition = nextPos;
    updatePlayer();

    if (playerPosition === 100) {
        statusDisplay.innerText = "🎉 You reached 100! You Win!";
    }
}

function updatePlayer() {
    document.querySelectorAll('.player').forEach(p => p.remove());
    const player = document.createElement('div');
    player.classList.add('player');
    document.getElementById(`cell-${playerPosition}`).appendChild(player);
}
