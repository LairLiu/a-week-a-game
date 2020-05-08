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
var TYPE;
(function (TYPE) {
    TYPE[TYPE["none"] = 0] = "none";
    TYPE[TYPE["alive"] = 1] = "alive";
    TYPE[TYPE["sleep"] = 2] = "sleep";
})(TYPE || (TYPE = {}));
var Game = /** @class */ (function () {
    function Game(scene, next) {
        this.scene = scene;
        this.next = next;
        this.sceneData = [];
        this.sceneDivs = [];
        this.currSquare = new Square_1.default;
        this.nextSquare = new Square_1.default;
        this.nextDivs = [];
        this.init();
        this.create();
        this.updateSquareData();
        this.updateViews("scene");
        this.updateViews("next");
    }
    // 初始化游戏数据
    Game.prototype.init = function () {
        for (var i = 0; i < 18; i++) {
            this.sceneData[i] = [];
            for (var j = 0; j < 10; j++) {
                this.sceneData[i][j] = 0;
            }
        }
    };
    // 初始页面
    Game.prototype.create = function () {
        var _this = this;
        this.sceneData.forEach(function (data, i) {
            _this.sceneDivs[i] = [];
            data.forEach(function (t, j) {
                var node = document.createElement("div");
                node.className = "none";
                node.style.left = j * 40 + "px";
                node.style.top = i * 40 + "px";
                _this.scene.appendChild(node);
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
                _this.next.appendChild(node);
                _this.nextDivs[i][j] = node;
            });
        });
    };
    // 刷新方块所在位置的数据
    // 设置|清理 所在方块的数据
    Game.prototype.updateSquareData = function (type) {
        var _this = this;
        if (type === void 0) { type = "set"; }
        var x = this.currSquare.origin.x, y = this.currSquare.origin.y;
        console.table(this.sceneData);
        this.currSquare.data.forEach(function (data, i) {
            data.forEach(function (t, j) {
                if (_this.currSquare.checkPoint(_this.currSquare.origin, i, j, _this.sceneData)) {
                    if (type === "clean") {
                        _this.sceneData[x + i][y + j] = 0;
                    }
                    else {
                        _this.sceneData[x + i][y + j] = t;
                    }
                }
            });
        });
        if (type === "clean") {
            // console.log(x, y);
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
                divs[i][j].className = TYPE[data[i][j]];
            }
        }
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
    Game.prototype.down = function () {
        if (!this.currSquare.canRight(this.sceneData))
            return;
        this.updateSquareData("clean");
        this.currSquare.down();
        this.updateSquareData();
        this.updateViews();
    };
    Game.prototype.rotate = function () {
        if (!this.currSquare.canRight(this.sceneData))
            return;
        this.updateSquareData("clean");
        this.currSquare.up();
        this.updateSquareData();
        this.updateViews();
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
            _this.isDebug && console.log('userclick', ev.key, 'keycode=', ev.keyCode);
            switch (ev.keyCode) {
                case 32: //空格
                    _this.isDebug && console.log('空格');
                    _this.onSpace();
                    break;
                case 87: // W、上
                    _this.isDebug && console.log('上');
                    _this.onUp();
                    break;
                case 83: // S、下
                    _this.isDebug && console.log('下');
                    _this.onDown();
                    break;
                case 65: // A、左
                    _this.isDebug && console.log('左');
                    _this.onLeft();
                    break;
                case 68: // D、右
                    _this.isDebug && console.log('右');
                    _this.onRight();
                    break;
            }
        };
    };
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
var Square = /** @class */ (function () {
    function Square() {
        this.origin = { x: 0, y: 0 };
        this.data = Square.defaultSquare;
    }
    ;
    // 判断移动是否合法
    Square.prototype.isValid = function (test, data, sceneData) {
        // 检查方块上的点
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].length; j++) {
                if (data[i][j] != 0) {
                    if (!this.checkPoint(test, i, j, sceneData)) {
                        console.log("-----222");
                        return false;
                    }
                }
            }
        }
        return true;
    };
    // 检查单个点
    Square.prototype.checkPoint = function (test, i, j, sceneData) {
        // console.log(sceneData.length, i + test.x, i, test.x, "----")
        // console.log(sceneData[0].length, j + test.y > sceneData[0].length, j, test.y)
        // console.log("下边界", test.x + i > sceneData.length);
        // console.log("上边界", test.x + i < 0);
        console.log("右边界", i, j, test.y + j > sceneData[0].length);
        // console.log("左边界", test.y + j < 0);
        // console.log("该位置存在方块", sceneData[test.x + i][test.y + j] === 2);
        if (test.x + i > sceneData.length //下边界
            || test.x + i < 0 //上边界
            || test.y + j > sceneData[0].length //右边界
            || test.y + j < 0 //左边界
            || sceneData[test.x + i][test.y + j] === 2 //该位置存在方块
        ) {
            console.log("-----");
            return false;
        }
        return true;
    };
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
    Square.prototype.down = function () {
        this.origin.x += 1;
    };
    Square.prototype.up = function () {
        this.origin.x -= 1;
    };
    Square.prototype.rotate = function () {
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
var KeyBorad_1 = __importDefault(__webpack_require__(/*! ./KeyBorad */ "./src/KeyBorad.ts"));
window.onload = function () {
};
var aprent = document.getElementById("game");
var scene = document.getElementById("scene");
var next = document.getElementById("next");
var game = new Game_1.default(scene, next);
// console.table(game.sceneData);
KeyBorad_1.default.isDebug = false;
KeyBorad_1.default.initControl();
KeyBorad_1.default.onRight = function () { game.right(); };
KeyBorad_1.default.onLeft = function () { game.left(); };
KeyBorad_1.default.onDown = function () { game.down(); };
KeyBorad_1.default.onUp = function () { game.rotate(); };


/***/ })

/******/ });
//# sourceMappingURL=app.js.map