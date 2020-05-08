import Game from "./Game";
import KB from "./KeyBorad";

window.onload = function () {
}
const aprent = document.getElementById("game") as HTMLDivElement;
const scene = document.getElementById("scene") as HTMLDivElement;
const next = document.getElementById("next") as HTMLDivElement;

let game = new Game(scene, next);
// console.table(game.sceneData);

KB.isDebug = false; KB.initControl();
KB.onRight = () => { game.right(); }
KB.onLeft = () => { game.left(); }
KB.onDown = () => { game.down(); }
KB.onUp = () => { game.rotate(); }

