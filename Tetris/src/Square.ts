import { TYPE, SQUARES } from "./StaticValue";

class Square {
  static defaultSquare: number[][] =
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ];

  origin = { x: 0, y: 3 };
  data = Square.defaultSquare;
  datas: number[][][] = [];
  index: number = 0;
  constructor() {
    let random = Math.floor(Math.random() * SQUARES.length);
    this.datas = SQUARES[random];

    this.index = Math.floor(Math.random() * this.datas.length);
    this.data = this.datas[this.index];
  };


  // ******************************
  // 合法性检测
  // ******************************

  // 判断移动是否合法
  isValid(pos: { x: number, y: number }, data: number[][], sceneData: number[][]): boolean {
    // 检查方块上的点
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] != TYPE.none) {
          if (!this.checkPoint(pos, i, j, sceneData)) { return false; }
        }
      }
    }
    return true;
  }
  // 检查单个点
  checkPoint(pos: { x: number, y: number }, i: number, j: number, sceneData: number[][]): boolean {
    return (
      pos.x + i >= sceneData.length                       //下边界
      // || pos.x + i < 0                                    //上边界
      || pos.y + j >= sceneData[0].length                 //右边界
      || pos.y + j < 0                                    //左边界
      || sceneData[pos.x + i][pos.y + j] === TYPE.sleep   //该位置存在方块
    ) ? false : true;
  }


  // ******************************
  // 移动控制
  // ******************************
  canRight(sceneData: number[][]) {
    let test = { x: this.origin.x, y: this.origin.y + 1 };
    return this.isValid(test, this.data, sceneData)
  }
  right() {
    this.origin.y += 1;
  }

  canLeft(sceneData: number[][]) {
    let test = { x: this.origin.x, y: this.origin.y - 1 };
    return this.isValid(test, this.data, sceneData)
  }
  left() {
    this.origin.y -= 1;
  }

  canDown(sceneData: number[][]) {
    let test = { x: this.origin.x + 1, y: this.origin.y };
    return this.isValid(test, this.data, sceneData)
  }
  down() {
    this.origin.x += 1;
  }

  // for debug
  canUP(sceneData: number[][]) {
    let test = { x: this.origin.x - 1, y: this.origin.y };
    return this.isValid(test, this.data, sceneData)
  }
  up() {
    this.origin.x -= 1;
  }

  canRotate(sceneData: number[][]) {
    let index = this.index + 1 >= this.datas.length ? 0 : this.index + 1;
    let data = this.datas[index];
    return this.isValid(this.origin, data, sceneData);
  }
  rotate() {
    this.index = this.index + 1 >= this.datas.length ? 0 : this.index + 1;
    this.data = this.datas[this.index];
  }


  // ******************************
  // 改变状态
  // ******************************
  sleep(sceneData: number[][]) {
    let { x, y } = this.origin;
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].length; j++) {
        if (this.checkPoint(this.origin, i, j, sceneData)) {
          if (this.data[i][j] === TYPE.alive)
            sceneData[x + i][y + j] = TYPE.sleep;
        }
      }
    }
  }
}
export default Square;
