import Square from "./Square";

enum TYPE {
  "none" = 0,
  "alive" = 1,
  "sleep" = 2
}


export default class Game {
  sceneData: number[][] = [];
  sceneDivs: HTMLDivElement[][] = [];

  currSquare: Square = new Square;
  nextSquare: Square = new Square;
  nextDivs: HTMLDivElement[][] = [];

  constructor(public scene: HTMLDivElement, public next: HTMLDivElement) {

    this.init();
    this.create();
    this.updateSquareData();

    this.updateViews("scene");
    this.updateViews("next");
  }

  // 初始化游戏数据
  init() {
    for (let i = 0; i < 18; i++) {
      this.sceneData[i] = [];
      for (let j = 0; j < 10; j++) {
        this.sceneData[i][j] = 0
      }
    }
  }

  // 初始页面
  create() {
    this.sceneData.forEach((data, i) => {
      this.sceneDivs[i] = [];
      data.forEach((t, j) => {
        let node = document.createElement("div");
        node.className = "none";
        node.style.left = j * 40 + "px";
        node.style.top = i * 40 + "px";
        this.scene.appendChild(node);
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
        this.next.appendChild(node);
        this.nextDivs[i][j] = node;
      })
    })
  }

  // 刷新方块所在位置的数据
  // 设置|清理 所在方块的数据
  updateSquareData(type: "set" | "clean" = "set") {
    let x = this.currSquare.origin.x, y = this.currSquare.origin.y;
    
    console.table(this.sceneData);
    this.currSquare.data.forEach((data, i) => {
      data.forEach((t, j) => {
        if (this.currSquare.checkPoint(this.currSquare.origin, i, j, this.sceneData)) {
          if (type === "clean") {
            this.sceneData[x + i][y + j] = 0;
          }
          else {
            this.sceneData[x + i][y + j] = t;
          }
        }
      })
    })
    if (type === "clean") {
      // console.log(x, y);
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
  down() {
    if (!this.currSquare.canRight(this.sceneData)) return;
    this.updateSquareData("clean");
    this.currSquare.down();
    this.updateSquareData();
    this.updateViews();
  }
  rotate() {
    if (!this.currSquare.canRight(this.sceneData)) return;
    this.updateSquareData("clean");
    this.currSquare.up();
    this.updateSquareData();
    this.updateViews();
  }
}
