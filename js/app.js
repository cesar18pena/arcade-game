// Enemies our player must avoid
var Enemy = function (positionX, positionY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.positionX = positionX;
    this.positionY = positionY;
    this.speed = Math.floor(Math.random() * 6) + 1;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.positionX = this.positionX >= 500 ? this.positionX = -50 : this.positionX += this.speed * dt * 50;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.sprite = 'images/char-boy.png';
    this.lives = 3;
}

Player.prototype.restart = function () {
    this.positionX = 200;
    this.positionY = 380;
};

Player.prototype.reduceLive = function () {
    this.lives--;
    let livesSpan = document.getElementById('lives');
    livesSpan.innerHTML = player.lives;

    if (player.lives === 0) {
        livesSpan.innerHTML = player.lives;
        gameOver();
    }
    else {
        livesSpan.innerHTML = player.lives;
    }
};

Player.prototype.update = function (dt) {

};

Player.prototype.resetGame = function () {
    this.restart();
    this.lives = 3;
    document.getElementById('scores').innerHTML = 0;
    document.getElementById('lives').innerHTML = 3;

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
}

Player.prototype.handleInput = function (keyCode) {
    switch (keyCode) {
        case "up":
            if (this.positionY > -10) {
                this.positionY -= 80;
                if (this.positionY < 50) {
                    const value = document.getElementById("scores").innerHTML;
                    const result = parseInt(value, 10) + 50;
                    document.getElementById("scores").innerHTML = result;
                    player.restart();
                }
            }
            break;
        case "down":
            if (this.positionY < 350)
                this.positionY += 80;
            break;
        case "right":
            if (this.positionX < 400)
                this.positionX += 100;
            break;
        case "left":
            if (this.positionX > 0)
                this.positionX -= 100;
            break;
        default:
            console.log('Pressed another key');
    }
}

function gameOver() {
    const answer = confirm('You did great, want to play again');
    if (answer) {
        player.resetGame();
    } else {
        player.resetGame();
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(0, 60);
const enemy2 = new Enemy(0, 140);
const enemy3 = new Enemy(0, 220);

const allEnemies = [enemy1, enemy2, enemy3];

const player = new Player(200, 380);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
