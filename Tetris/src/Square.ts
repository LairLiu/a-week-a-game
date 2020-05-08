class Square {
  static defaultSquare: number[][] =
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ];


  origin = { x: 0, y: 0 };
  data = Square.defaultSquare;
  constructor() { };

  // 判断移动是否合法
  isValid(test: { x: number, y: number }, data: number[][], sceneData: number[][]): boolean {
    // 检查方块上的点
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] != 0) {
          if (!this.checkPoint(test, i, j, sceneData)) { console.log("-----222"); return false; }
        }
      }
    }
    return true;
  }

  // 检查单个点
  checkPoint(test: { x: number, y: number }, i: number, j: number, sceneData: number[][]): boolean {
    // console.log(sceneData.length, i + test.x, i, test.x, "----")
    // console.log(sceneData[0].length, j + test.y > sceneData[0].length, j, test.y)
    // console.log("下边界", test.x + i > sceneData.length);
    // console.log("上边界", test.x + i < 0);
    console.log("右边界", i, j, test.y + j > sceneData[0].length);
    // console.log("左边界", test.y + j < 0);
    // console.log("该位置存在方块", sceneData[test.x + i][test.y + j] === 2);

    if (
      test.x + i > sceneData.length               //下边界
      || test.x + i < 0                           //上边界
      || test.y + j > sceneData[0].length         //右边界
      || test.y + j < 0                           //左边界
      || sceneData[test.x + i][test.y + j] === 2  //该位置存在方块
    ) { console.log("-----"); return false }
    return true;
  }

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

  down() {
    this.origin.x += 1;
  }
  up() {
    this.origin.x -= 1;
  }
  rotate() {

  }
}
export default Square;
