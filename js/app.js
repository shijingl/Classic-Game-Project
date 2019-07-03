class GameObject {
    constructor(sprite, x, y, width = 0, height = 0) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update(dt = 0) { }

    reset() { }

    render() { 
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    collides(object) {
        const xCheck = this.x <= other.x + other.width / 2 &&
            this.x >= other.x - other.width / 2;
        const yCheck = other.y <= this.y + this.height / 2 &&
            other.y >= this.y;
        return xCheck && yCheck;
    }

}

class Enemy extends GameObject {
    constructor() {

    }

    update(dt) { }
    reset() { }

    static generateEnemies() {
        allEnemies.push(new Enemy());
        const delay = randElement(ENEMY_CREATION_DELAYS);
        setTimeout(Enemy.generateEnemies, delay);
    }

    static resetAllEnemies() { 

    } 
}

class Gem extends GameObject {
    constructor() {

    }

    static expireGem(gem) {

    }

    static generateGem(gem) {

    }
}

class Player extends GameObject {
    constructor() {

    }

    reset() {

    }

    handleInput() {

    }
}

class Game {

    constructor() {

    }

    get Score() {

    }

    set Score() {

    }

    start(){

    }

    updateScoreBoard() {

    }

    reset() {

    }

    die() {

    }

    win() {

    }

}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
