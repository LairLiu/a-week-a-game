/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Square_1 = __importDefault(__webpack_require__(/*! ./Square */ "./src/Square.ts"));
var KeyBorad_1 = __importDefault(__webpack_require__(/*! ./KeyBorad */ "./src/KeyBorad.ts"));
var StaticValue_1 = __webpack_require__(/*! ./StaticValue */ "./src/StaticValue.ts");
var Game = /** @class */ (function () {
    function Game(sceneDiv, nextDiv) {
        this.sceneDiv = sceneDiv;
        this.nextDiv = nextDiv;
        this.sceneData = [];
        this.sceneDivs = [];
        this.nextDivs = [];
        this.score = 0;
        this.maxscore = 0;
        this.timerKey = -1;
        this.isPaused = false;
        this.onGameStart = function (maxscore) { };
        this.onGameOver = function (score) { };
        this.onScoreUpdate = function (score, maxscore) { };
        this.init();
        this.createDivs();
        this.updateSquareData();
        this.initKeyBoradControl();
        this.updateViews("scene");
        this.updateViews("next");
    }
    // 初始化游戏数据
    Game.prototype.init = function () {
        this.sceneData = [];
        for (var i = 0; i < 18; i++) {
            this.sceneData[i] = [];
            for (var j = 0; j < 10; j++) {
                this.sceneData[i][j] = 0;
            }
        }
        this.score = 0;
        this.maxscore = Number(localStorage.getItem("maxscore") || "0");
        this.currSquare = new Square_1.default();
        this.nextSquare = new Square_1.default();
    };
    // 初始页面
    Game.prototype.createDivs = function () {
        var _this = this;
        this.sceneData.forEach(function (data, i) {
            _this.sceneDivs[i] = [];
            data.forEach(function (t, j) {
                var node = document.createElement("div");
                node.className = "none";
                node.style.left = j * 40 + "px";
                node.style.top = i * 40 + "px";
                _this.sceneDiv.appendChild(node);
                _this.sceneDivs[i][j] = node;
            });
        });
        this.nextSquare.data.forEach(function (data, i) {
            _this.nextDivs[i] = [];
            data.forEach(function (t, j) {
                var node = document.createElement("div");
                node.className = "none";
                node.style.left = j * 40 + "px";
                node.style.top = i * 40 + "px";
                _this.nextDiv.appendChild(node);
                _this.nextDivs[i][j] = node;
            });
        });
    };
    // 刷新方块所在位置的数据
    // 设置|清理 所在方块的数据
    Game.prototype.updateSquareData = function (type) {
        if (type === void 0) { type = "set"; }
        var x = this.currSquare.origin.x, y = this.currSquare.origin.y;
        for (var i = 0; i < this.currSquare.data.length; i++) {
            for (var j = 0; j < this.currSquare.data[0].length; j++) {
                if (this.currSquare.checkPoint(this.currSquare.origin, i, j, this.sceneData)) {
                    if (type === "clean") {
                        this.sceneData[x + i][y + j] = StaticValue_1.TYPE.none;
                    }
                    else if (type === "set") {
                        this.sceneData[x + i][y + j] = this.currSquare.data[i][j];
                    }
                }
            }
        }
    };
    // 刷新页面显示
    // @views 下一个|游戏界面
    Game.prototype.updateViews = function (views) {
        if (views === void 0) { views = "scene"; }
        var data = views === "next" ? this.nextSquare.data : this.sceneData;
        var divs = views === "next" ? this.nextDivs : this.sceneDivs;
        for (var i = 0; i < divs.length; i++) {
            for (var j = 0; j < divs[i].length; j++) {
                divs[i][j].className = StaticValue_1.TYPE[data[i][j]];
            }
        }
    };
    // 更新分数
    Game.prototype.updateScore = function (score) {
        // console.log("score", score);
        this.score += score;
        if (this.maxscore < this.score) {
            localStorage.setItem("maxscore", this.score.toString());
            this.maxscore = this.score;
        }
        this.onScoreUpdate && this.onScoreUpdate(this.score, this.maxscore);
    };
    // ******************************
    // 移动控制
    // ******************************
    // 键盘控制
    Game.prototype.initKeyBoradControl = function () {
        var _this = this;
        KeyBorad_1.default.isDebug = false;
        KeyBorad_1.default.initControl();
        KeyBorad_1.default.onRight = function () { _this.right(); };
        KeyBorad_1.default.onLeft = function () { _this.left(); };
        KeyBorad_1.default.onDown = function () { _this.fail(); };
        KeyBorad_1.default.onUp = function () { _this.rotate(); };
        KeyBorad_1.default.onSpace = function () { _this.pause(); };
    };
    Game.prototype.right = function () {
        if (!this.currSquare.canRight(this.sceneData))
            return;
        this.updateSquareData("clean");
        this.currSquare.right();
        this.updateSquareData();
        this.updateViews();
    };
    Game.prototype.left = function () {
        if (!this.currSquare.canLeft(this.sceneData))
            return;
        this.updateSquareData("clean");
        this.currSquare.left();
        this.updateSquareData();
        this.updateViews();
    };
    Game.prototype.fail = function () {
        while (this.down()) { }
    };
    Game.prototype.down = function () {
        if (!this.currSquare.canDown(this.sceneData))
            return false;
        this.updateSquareData("clean");
        this.currSquare.down();
        this.updateSquareData();
        this.updateViews();
        return true;
    };
    Game.prototype.rotate = function () {
        if (!this.currSquare.canRotate(this.sceneData))
            return;
        this.updateSquareData("clean");
        this.currSquare.rotate();
        this.updateSquareData();
        this.updateViews();
    };
    // ******************************
    // 游戏进度控制
    // ******************************
    Game.prototype.move = function () {
        if (!this.down()) {
            this.currSquare.sleep(this.sceneData);
            this.updateViews();
            var lines = this.checkClean();
            this.updateScore(lines);
            if (this.checkGameOver()) {
                this.gameOver();
            }
            else {
                this.showNextSquare();
            }
        }
    };
    Game.prototype.showNextSquare = function () {
        this.currSquare = this.nextSquare;
        this.updateSquareData();
        this.updateViews();
        this.nextSquare = new Square_1.default();
        this.updateViews("next");
    };
    // 判断是否消除行
    Game.prototype.checkClean = function () {
        var clearLineNum = 0;
        // 从后往前判断
        out: for (var len = this.sceneData.length, i = len - 1; i >= 0; i--) {
            var isClear = true;
            out2: for (var j = 0; j < this.sceneData[i].length; j++) {
                // 当存在非 sleep 状态时，判断该行不可消除
                if (this.sceneData[i][j] != StaticValue_1.TYPE.sleep) {
                    isClear = false;
                    break out2;
                }
            }
            // 当该行为清除时，执行清除操作
            if (isClear) {
                clearLineNum++; //消除行+1，用于分数
                // console.log("need to clear", i, this.sceneData);
                // 整体下移,可将此方法独立，记录所有需要消除的行，再添加效果
                for (var m = i; m > 0; m--) {
                    for (var n = 0; n < this.sceneData[0].length; n++) {
                        this.sceneData[m][n] = this.sceneData[m - 1][n];
                    }
                }
                for (var k = 0; k < this.sceneData[0].length; k++) {
                    this.sceneData[0][k] = StaticValue_1.TYPE.none;
                }
                i++;
            }
            // console.log("check", i)
        }
        return clearLineNum;
    };
    // 判断游戏是否结束
    // 判断第一行是否存在 sleep 方块
    Game.prototype.checkGameOver = function () {
        // console.log("checkGameOver", this.sceneData[0]);
        for (var j = 0; j < this.sceneData[0].length; j++) {
            if (this.sceneData[0][j] === StaticValue_1.TYPE.sleep) {
                return true;
                break;
            }
        }
        return false;
    };
    // ******************************
    // 游戏控制
    // ******************************
    Game.prototype.startGame = function () {
        this.resume();
        this.onGameStart && this.onGameStart(this.maxscore);
    };
    Game.prototype.reStartGame = function () {
        clearInterval(this.timerKey);
        this.score = 0;
        this.init();
        this.updateViews();
        this.updateViews("next");
        this.resume();
    };
    Game.prototype.pause = function () {
        this.isPaused ?
            this.resume() :
            clearInterval(this.timerKey);
        this.isPaused = !this.isPaused;
        KeyBorad_1.default.open = !this.isPaused;
    };
    Game.prototype.resume = function () {
        var _this = this;
        this.isPaused = false;
        KeyBorad_1.default.open = true;
        this.timerKey = setInterval(function () {
            _this.move();
            // this.updateSocre(1);
        }, 500);
    };
    Game.prototype.gameOver = function () {
        console.log("gameover");
        KeyBorad_1.default.open = false;
        clearInterval(this.timerKey);
        this.onGameOver && this.onGameOver(this.score);
    };
    return Game;
}());
exports.default = Game;


/***/ }),

/***/ "./src/KeyBorad.ts":
/*!*************************!*\
  !*** ./src/KeyBorad.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var KeyBorad = /** @class */ (function () {
    function KeyBorad() {
    }
    KeyBorad.initControl = function () {
        var _this = this;
        window.onkeydown = function (ev) {
            if (!_this.open)
                return;
            _this.isDebug && console.log('userclick', ev.key, 'keycode=', ev.keyCode);
            switch (ev.keyCode) {
                case 32: //空格
                    _this.isDebug && console.log('空格');
                    _this.onSpace && _this.onSpace();
                    break;
                case 87: // W、上
                    _this.isDebug && console.log('上');
                    _this.onUp && _this.onUp();
                    break;
                case 83: // S、下
                    _this.isDebug && console.log('下');
                    _this.onDown && _this.onDown();
                    break;
                case 65: // A、左
                    _this.isDebug && console.log('左');
                    _this.onLeft && _this.onLeft();
                    break;
                case 68: // D、右
                    _this.isDebug && console.log('右');
                    _this.onRight && _this.onRight();
                    break;
            }
        };
    };
    KeyBorad.open = true;
    KeyBorad.isDebug = false;
    return KeyBorad;
}());
exports.default = KeyBorad;


/***/ }),

/***/ "./src/Square.ts":
/*!***********************!*\
  !*** ./src/Square.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StaticValue_1 = __webpack_require__(/*! ./StaticValue */ "./src/StaticValue.ts");
var Square = /** @class */ (function () {
    function Square() {
        this.origin = { x: 0, y: 3 };
        this.data = Square.defaultSquare;
        this.datas = [];
        this.index = 0;
        var random = Math.floor(Math.random() * StaticValue_1.SQUARES.length);
        this.datas = StaticValue_1.SQUARES[random];
        this.index = Math.floor(Math.random() * this.datas.length);
        this.data = this.datas[this.index];
    }
    ;
    // ******************************
    // 合法性检测
    // ******************************
    // 判断移动是否合法
    Square.prototype.isValid = function (pos, data, sceneData) {
        // 检查方块上的点
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].length; j++) {
                if (data[i][j] != StaticValue_1.TYPE.none) {
                    if (!this.checkPoint(pos, i, j, sceneData)) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    // 检查单个点
    Square.prototype.checkPoint = function (pos, i, j, sceneData) {
        return (pos.x + i >= sceneData.length //下边界
            // || pos.x + i < 0                                    //上边界
            || pos.y + j >= sceneData[0].length //右边界
            || pos.y + j < 0 //左边界
            || sceneData[pos.x + i][pos.y + j] === StaticValue_1.TYPE.sleep //该位置存在方块
        ) ? false : true;
    };
    // ******************************
    // 移动控制
    // ******************************
    Square.prototype.canRight = function (sceneData) {
        var test = { x: this.origin.x, y: this.origin.y + 1 };
        return this.isValid(test, this.data, sceneData);
    };
    Square.prototype.right = function () {
        this.origin.y += 1;
    };
    Square.prototype.canLeft = function (sceneData) {
        var test = { x: this.origin.x, y: this.origin.y - 1 };
        return this.isValid(test, this.data, sceneData);
    };
    Square.prototype.left = function () {
        this.origin.y -= 1;
    };
    Square.prototype.canDown = function (sceneData) {
        var test = { x: this.origin.x + 1, y: this.origin.y };
        return this.isValid(test, this.data, sceneData);
    };
    Square.prototype.down = function () {
        this.origin.x += 1;
    };
    // for debug
    Square.prototype.canUP = function (sceneData) {
        var test = { x: this.origin.x - 1, y: this.origin.y };
        return this.isValid(test, this.data, sceneData);
    };
    Square.prototype.up = function () {
        this.origin.x -= 1;
    };
    Square.prototype.canRotate = function (sceneData) {
        var index = this.index + 1 >= this.datas.length ? 0 : this.index + 1;
        var data = this.datas[index];
        return this.isValid(this.origin, data, sceneData);
    };
    Square.prototype.rotate = function () {
        this.index = this.index + 1 >= this.datas.length ? 0 : this.index + 1;
        this.data = this.datas[this.index];
    };
    // ******************************
    // 改变状态
    // ******************************
    Square.prototype.sleep = function (sceneData) {
        var _a = this.origin, x = _a.x, y = _a.y;
        for (var i = 0; i < this.data.length; i++) {
            for (var j = 0; j < this.data[i].length; j++) {
                if (this.checkPoint(this.origin, i, j, sceneData)) {
                    if (this.data[i][j] === StaticValue_1.TYPE.alive)
                        sceneData[x + i][y + j] = StaticValue_1.TYPE.sleep;
                }
            }
        }
    };
    Square.defaultSquare = [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ];
    return Square;
}());
exports.default = Square;


/***/ }),

/***/ "./src/StaticValue.ts":
/*!****************************!*\
  !*** ./src/StaticValue.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TYPE;
(function (TYPE) {
    TYPE[TYPE["none"] = 0] = "none";
    TYPE[TYPE["alive"] = 1] = "alive";
    TYPE[TYPE["sleep"] = 2] = "sleep";
})(TYPE = exports.TYPE || (exports.TYPE = {}));
exports.SQUARES = [
    // ——
    [
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ],
    // 田
    [
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]
    ],
    // L
    [
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 1, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
    ],
    // 7
    [
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
    ],
    // 山
    [
        [
            [1, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ]
];


/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __importDefault(__webpack_require__(/*! ./Game */ "./src/Game.ts"));
var _parent = document.getElementById("game");
var _scene = document.getElementById("scene");
var _next = document.getElementById("next");
var _score = document.getElementById("score");
var _maxscore = document.getElementById("maxscore");
var _pause = document.getElementById("pause");
var _restart = document.getElementById("restart");
var game = new Game_1.default(_scene, _next);
game.onGameStart = function (maxscore) {
    _score.innerText = "0";
    _maxscore.innerText = maxscore.toString();
};
game.onGameOver = function (score) {
    console.log("app", "gameover", score);
};
game.onScoreUpdate = function (score, maxscore) {
    _score.innerText = score.toString();
    _maxscore.innerText = maxscore.toString();
};
game.startGame();
_pause.onclick = function () {
    game.pause();
    _pause.innerText = game.isPaused ? "resume" : "pause";
};
_restart.onclick = function () {
    game.reStartGame();
};


/***/ })

/******/ });
//# sourceMappingURL=app.js.map