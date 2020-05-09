import Square from "./Square";
import KB from "./KeyBorad";
import { TYPE } from "./StaticValue";

export default class Game {
  sceneData: number[][] = [];
  sceneDivs: HTMLDivElement[][] = [];

  currSquare!: Square;
  nextSquare!: Square;
  nextDivs: HTMLDivElement[][] = [];

  score: number = 0;
  maxscore: number = 0;
  timerKey: number = -1;
  isPaused: boolean = false;

  onGameStart: (maxscore: number) => void = (maxscore) => { };
  onGameOver: (score: number) => void = (score) => { };
  onScoreUpdate: (score: number, maxscore: number) => void = (score, maxscore) => { };

  constructor(
    public sceneDiv: HTMLDivElement,
    public nextDiv: HTMLDivElement) {

    this.init();
    this.createDivs();

    this.updateSquareData();
    this.initKeyBoradControl();

    this.updateViews("scene");
    this.updateViews("next");
  }

  // 初始化游戏数据
  init() {
    this.sceneData = [];
    for (let i = 0; i < 18; i++) {
      this.sceneData[i] = [];
      for (let j = 0; j < 10; j++) {
        this.sceneData[i][j] = 0
      }
    }

    this.score = 0;
    this.maxscore = Number(localStorage.getItem("maxscore") || "0");
    this.currSquare = new Square();
    this.nextSquare = new Square();
  }

  // 初始页面
  createDivs() {
    this.sceneData.forEach((data, i) => {
      this.sceneDivs[i] = [];
      data.forEach((t, j) => {
        let node = document.createElement("div");
        node.className = "none";
        node.style.left = j * 40 + "px";
        node.style.top = i * 40 + "px";
        this.sceneDiv.appendChild(node);
        this.sceneDivs[i][j] = node;
      })
    })

    this.nextSquare.data.forEach((data, i) => {
      this.nextDivs[i] = [];
      data.forEach((t, j) => {
        let node = document.createElement("div");
        node.className = "none";
        node.style.left = j * 40 + "px";
        node.style.top = i * 40 + "px";
        this.nextDiv.appendChild(node);
        this.nextDivs[i][j] = node;
      })
    })
  }

  // 刷新方块所在位置的数据
  // 设置|清理 所在方块的数据
  updateSquareData(type: "set" | "clean" = "set") {
    let x = this.currSquare.origin.x, y = this.currSquare.origin.y;

    for (let i = 0; i < this.currSquare.data.length; i++) {
      for (let j = 0; j < this.currSquare.data[0].length; j++) {
        if (this.currSquare.checkPoint(this.currSquare.origin, i, j, this.sceneData)) {
          if (type === "clean") {
            this.sceneData[x + i][y + j] = TYPE.none;
          }
          else if (type === "set") {
            this.sceneData[x + i][y + j] = this.currSquare.data[i][j];
          }
        }
      }
    }
  }

  // 刷新页面显示
  // @views 下一个|游戏界面
  updateViews(views: "next" | "scene" = "scene") {
    let data = views === "next" ? this.nextSquare.data : this.sceneData;
    let divs: HTMLDivElement[][] = views === "next" ? this.nextDivs : this.sceneDivs;

    for (let i = 0; i < divs.length; i++) {
      for (let j = 0; j < divs[i].length; j++) {
        divs[i][j].className = TYPE[data[i][j]];
      }
    }
  }
  // 更新分数
  updateScore(score: number) {
    // console.log("score", score);
    this.score += score;

    if (this.maxscore < this.score) {
      localStorage.setItem("maxscore", this.score.toString());
      this.maxscore = this.score;
    }

    this.onScoreUpdate && this.onScoreUpdate(this.score, this.maxscore);
  }

  // ******************************
  // 移动控制
  // ******************************
  // 键盘控制
  initKeyBoradControl() {
    KB.isDebug = false; KB.initControl();
    KB.onRight = () => { this.right(); }
    KB.onLeft = () => { this.left(); }
    KB.onDown = () => { this.fail(); }
    KB.onUp = () => { this.rotate(); }
    KB.onSpace = () => { this.pause(); }
  }

  right() {
    if (!this.currSquare.canRight(this.sceneData)) return;
    this.updateSquareData("clean");
    this.currSquare.right();
    this.updateSquareData();
    this.updateViews();
  }
  left() {
    if (!this.currSquare.canLeft(this.sceneData)) return;
    this.updateSquareData("clean");
    this.currSquare.left();
    this.updateSquareData();
    this.updateViews();
  }
  fail() {
    while (this.down()) { }
  }
  down() {
    if (!this.currSquare.canDown(this.sceneData)) return false;
    this.updateSquareData("clean");
    this.currSquare.down();
    this.updateSquareData();
    this.updateViews();
    return true;
  }
  rotate() {
    if (!this.currSquare.canRotate(this.sceneData)) return;
    this.updateSquareData("clean");
    this.currSquare.rotate();
    this.updateSquareData();
    this.updateViews();
  }

  // ******************************
  // 游戏进度控制
  // ******************************
  move() {
    if (!this.down()) {
      this.currSquare.sleep(this.sceneData);
      this.updateViews();
      let lines = this.checkClean();
      this.updateScore(lines);

      if (this.checkGameOver()) {
        this.gameOver();
      } else {
        this.showNextSquare();
      }
    }
  }
  showNextSquare() {
    this.currSquare = this.nextSquare;
    this.updateSquareData();
    this.updateViews();

    this.nextSquare = new Square();
    this.updateViews("next");
  }

  // 判断是否消除行
  checkClean() {
    let clearLineNum = 0;
    // 从后往前判断
    out:
    for (let len = this.sceneData.length, i = len - 1; i >= 0; i--) {
      let isClear = true;
      out2:
      for (let j = 0; j < this.sceneData[i].length; j++) {
        // 当存在非 sleep 状态时，判断该行不可消除
        if (this.sceneData[i][j] != TYPE.sleep) {
          isClear = false;
          break out2;
        }
      }
      // 当该行为清除时，执行清除操作
      if (isClear) {
        clearLineNum++;   //消除行+1，用于分数
        // console.log("need to clear", i, this.sceneData);
        // 整体下移,可将此方法独立，记录所有需要消除的行，再添加效果
        for (let m = i; m > 0; m--) {
          for (let n = 0; n < this.sceneData[0].length; n++) {
            this.sceneData[m][n] = this.sceneData[m - 1][n];
          }
        }
        for (let k = 0; k < this.sceneData[0].length; k++) {
          this.sceneData[0][k] = TYPE.none;
        }
        i++;
      }
      // console.log("check", i)
    }
    return clearLineNum;
  }

  // 判断游戏是否结束
  // 判断第一行是否存在 sleep 方块
  checkGameOver() {
    // console.log("checkGameOver", this.sceneData[0]);
    for (let j = 0; j < this.sceneData[0].length; j++) {
      if (this.sceneData[0][j] === TYPE.sleep) {
        return true;
        break;
      }
    }
    return false;
  }

  // ******************************
  // 游戏控制
  // ******************************
  startGame() {
    this.resume();
    this.onGameStart && this.onGameStart(this.maxscore);
  }

  reStartGame() {
    clearInterval(this.timerKey);

    this.score = 0;
    this.init();
    this.updateViews();
    this.updateViews("next");
    this.resume();
  }

  pause() {
    this.isPaused ?
      this.resume() :
      clearInterval(this.timerKey);
    this.isPaused = !this.isPaused;
    KB.open = !this.isPaused;
  }
  resume() {
    this.isPaused = false;
    KB.open = true;
    this.timerKey = setInterval(() => {
      this.move();
      // this.updateSocre(1);
    }, 500);
  }

  gameOver() {
    console.log("gameover");

    KB.open = false;
    clearInterval(this.timerKey);

    this.onGameOver && this.onGameOver(this.score);
  }
}
