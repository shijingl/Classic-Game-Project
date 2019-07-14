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
        const y = randElement(ENEMY_Y_POSITIONS);
        super('images/enemy-bug.png', 0, y, 101, 171);
        this.speed = randElement(ENEMY_SPEEDS);
    }

    update(dt) { this.x += this.speed * dt; }

    reset() { this.x = 0; }

    static generateEnemies() {
        allEnemies.push(new Enemy());
        const delay = randElement(ENEMY_CREATION_DELAYS);
        setTimeout(Enemy.generateEnemies, delay);
    }

    static resetAllEnemies() { 
        allEnemies.forEach(enemy => enemy.reset());
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
        const sprite = 'images/char-princess-girl.png';
        const initXPos = 202;
        const initYPos = 380;
        super(sprite, initXPos, initYPos, 101, 171);
        this.INITIAL_X_POSITION = initXPos;
        this.INITIAL_Y_POSITION = initYPos;
        this.VERTICAL_STEP = 83;
        this.HORIZONTAL_STEP = 101;
        this.MIN_X_POSITION = 0;
        this.MAX_X_POSITION = 404;
    }

    reset() {
        this.x = this.INITIAL_X_POSITION;
        this.y = this.INITIAL_Y_POSITION;
    }

    handleInput() {
        // Return if modal is currently showing
        if (!modal.classList.contains('close')) {
            return;
        }
        switch (keyCode) {
            case 'up':
                game.playJump();
                if (this.y - this.VERTICAL_STEP < 0) { // winning situation
                    game.win();
                } else {
                    this.y -= this.VERTICAL_STEP
                }
                break;
            case 'down':
                if (this.y + this.VERTICAL_STEP <= this.INITIAL_Y_POSITION) {
                    game.playJump();

                    this.y += this.VERTICAL_STEP
                }
                break;
            case 'left':
                if (this.x - this.HORIZONTAL_STEP >= 0) {
                    game.playJump();

                    this.x -= this.HORIZONTAL_STEP
                }
                break;
            case 'right':
                if (this.x + this.HORIZONTAL_STEP <= this.MAX_X_POSITION) {
                    game.playJump();

                    this.x += this.HORIZONTAL_STEP
                }
                break;
            default:
                break;
        }
    }
}

class Game {

    constructor() {
        this._score = 0;
        // Generate Audio objects
        this.jumpAudio = new Audio;
        this.winLoseAudio = new Audio;
        this.powerUpAudio = new Audio;
        // Initialize game
        this.start();
    }

    get Score() {
        return this._score;
    }

    set Score() {
        this._score = Math.max(0, newScore);
        this.updateScoreBoard();
    }

    start(){
        // Play start sound
        this.playStart();
        // Randomly generate enemies
        Enemy.generateEnemies();
        // Instantiate and place the player object in a variable called player
        player = new Player();
        // Instantiate gem object
        Gem.generateGems();
    }

    updateScoreBoard() {
        scoreElement.textContent = this._score;
    }

    reset() {
        this._score = 0;
        Enemy.resetAllEnemies();
        player.reset();
    }

    die() {
        this.playDeath();
        animateScoreLost();
        this.score -= 50;
        player.reset();
    }

    win() {
        this.playWin();
        animateScoreAdd();
        this.score += 10;
        player.reset();
    }

}

/**
 * IIFE starting game  
 */
void function startGame() {
    game = new Game();
}();

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
