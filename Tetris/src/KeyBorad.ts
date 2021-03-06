class KeyBorad {
  constructor() {

  }
  static open: boolean = true;
  static isDebug: boolean = false;
  static onLeft: () => void
  static onRight: () => void
  static onUp: () => void
  static onDown: () => void
  static onSpace: () => void

  static initControl() {
    window.onkeydown = (ev: KeyboardEvent) => {
      if (!this.open) return;
      this.isDebug && console.log('userclick', ev.key, 'keycode=', ev.keyCode);
      switch (ev.keyCode) {
        case 32:    //空格
          this.isDebug && console.log('空格');
          this.onSpace && this.onSpace();
          break;
        case 87:    // W、上
          this.isDebug && console.log('上');
          this.onUp && this.onUp();
          break;
        case 83:    // S、下
          this.isDebug && console.log('下');
          this.onDown && this.onDown();
          break;
        case 65:    // A、左
          this.isDebug && console.log('左');
          this.onLeft && this.onLeft();
          break;
        case 68:    // D、右
          this.isDebug && console.log('右');
          this.onRight && this.onRight();
          break;
      }
    }
  }
}

export default KeyBorad
