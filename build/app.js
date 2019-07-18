'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Global variables

// Static constant values that don't belong to any particular enemy instance
var ENEMY_Y_POSITIONS = [60, 145, 230];
var ENEMY_SPEEDS = [200, 250, 280, 300, 320, 350, 400, 500];
var ENEMY_CREATION_DELAYS = [200, 300, 400, 500, 650, 750, 900, 1000];

// Static constant values that don't belong to any particular gem instance
var GEM_STRIPES = ['images/gem-blue.png', 'images/gem-orange.png', 'images/gem-green.png'];
var GEM_X_POSITIONS = [126, 227, 328];
var GEM_Y_POSITIONS = [115, 200, 275];
var GEM_EXPIRE_TIMES = [5000, 7000, 8000, 9000];
var GEM_DELAY_TIMES = [10000, 15000, 20000];

// Game variable
var game = void 0;
// Array of enemies
var allEnemies = []; // stores all enemy objects
// Player variable
var player = void 0;
// Gem variable
var allGems = [];

// DOM elements
var scoreBoard = document.querySelector('#score-board');
var scoreElement = document.querySelector('.score');
var modal = document.querySelector('#simpleModal');
var modalCloseBtn = document.querySelector('.modal-close-btn');

// Base class, that has properties and methods that will be used by all
// inheriting subclassses

var GameObject = function () {
    function GameObject(sprite, x, y) {
        var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

        _classCallCheck(this, GameObject);

        // Sprite of the object
        this.sprite = sprite;
        // X coordinate
        this.x = x;
        // Y coordinate
        this.y = y;
        // Width
        this.width = width;
        // Height
        this.height = height;
    }

    _createClass(GameObject, [{
        key: 'update',
        value: function update() {
            var dt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        }

        /**
        * Reset object to ints initial state
        */

    }, {
        key: 'reset',
        value: function reset() {}

        /**
        * Draw object using its sprite, x & y coordinates
        */

    }, {
        key: 'render',
        value: function render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }

        /**
        * Checks if two GameObjects on the canvas overlap or touch.
        *
        * @param {GameObject} other    other GameObject
        * @returns                     true if collision happened
        */

    }, {
        key: 'collides',
        value: function collides(other) {
            var xCheck = this.x <= other.x + other.width / 2 && this.x >= other.x - other.width / 2;
            var yCheck = other.y <= this.y + this.height / 2 && other.y >= this.y;
            return xCheck && yCheck;
        }
    }]);

    return GameObject;
}();