"use strict"
/**
 * Class Enemy
 * Enemies our player must avoid
 * @param {Number} posX initial positionX of enemy
 * @param {Number} posY initial positionY of enemy
 * @param {String} sprite image use to display an enemy
 * @returns New instance of Enemy Class
 */
var Enemy = function (posX, posY, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.posX = posX;
    this.posY = posY;
    this.speed = Math.floor(Math.random() * 6) + 1;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    /**  
    * You should multiply any movement by the dt parameter
    * which will ensure the game runs at the same speed for
    * all computers.
    */
    this.posX = this.posX >= 500 ? this.posX = -50 : this.posX += this.speed * dt * 50;

    const booleanX = (parseInt(this.posX) + 100 >= player.posX) ? true : false;
    const booleanY = (parseInt(this.posX) <= player.posX + 30 && this.posY === player.posY) ? true : false;

    if (booleanX && booleanY) {
        player.reduceLive();
        player.restart();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};

// Player class
var Player = function (posX, posY, sprite) {
    this.posX = posX;
    this.posY = posY;
    this.sprite = sprite;
    this.lives = 3;
}

// Method Restart reset the position of the player to the initial point of the game.
Player.prototype.restart = function () {
    this.posX = 200;
    this.posY = 380;
};

// Method reduceLive decrease live by 1 of the player every time collision with an enemy.
Player.prototype.reduceLive = function () {
    this.lives--;
    const livesSpan = document.getElementById('lives');
    livesSpan.innerHTML = this.lives;

    if (this.lives === 0) {
        livesSpan.innerHTML = this.lives;
        gameOver();
    }
    else {
        livesSpan.innerHTML = this.lives;
    }
};

Player.prototype.update = function (dt) {

};

/**
 * This method reset the game and score when the player loses all lives.
 * Restart score to 0 and lives to 3
 */
Player.prototype.resetGame = function () {
    this.restart();
    this.lives = 3;
    document.getElementById('scores').innerHTML = 0;
    document.getElementById('lives').innerHTML = 3;

};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
}

/**
 * Method handleInput check everytime the arrows up, down, right, left
 * are pressed and move the player according the key pressed.
 */
Player.prototype.handleInput = function (keyCode) {
    switch (keyCode) {
        case "up":
            if (this.posY > -10) {
                this.posY -= 80;
                if (this.posY < 50) {
                    const value = document.getElementById("scores").innerHTML;
                    const result = parseInt(value, 10) + 50;
                    document.getElementById("scores").innerHTML = result;
                    this.restart();
                }
            }
            break;
        case "down":
            if (this.posY < 350)
                this.posY += 80;
            break;
        case "right":
            if (this.posX < 400)
                this.posX += 100;
            break;
        case "left":
            if (this.posX > 0)
                this.posX -= 100;
            break;
    }
}

// This function display a message to the player and reset the game to start over.
function gameOver() {
    alert('You did great, want to play again');
    player.resetGame();
}

// Now instantiate your objects.
const enemy1 = new Enemy(0, 60, 'images/enemy-bug.png');
const enemy2 = new Enemy(0, 140, 'images/enemy-bug.png');
const enemy3 = new Enemy(0, 220, 'images/enemy-bug.png');

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
const player = new Player(200, 380, 'images/char-boy.png');


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
