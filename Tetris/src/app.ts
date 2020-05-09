import Game from "./Game";

const _parent = document.getElementById("game") as HTMLDivElement;
const _scene = document.getElementById("scene") as HTMLDivElement;
const _next = document.getElementById("next") as HTMLDivElement;
const _score = document.getElementById("score") as HTMLDivElement;
const _maxscore = document.getElementById("maxscore") as HTMLDivElement;
const _pause = document.getElementById("pause") as HTMLDivElement;
const _restart = document.getElementById("restart") as HTMLDivElement;


let game = new Game(_scene, _next);

game.onGameStart = maxscore => {
  _score.innerText = "0";
  _maxscore.innerText = maxscore.toString();
}

game.onGameOver = score => {
  console.log("app", "gameover", score);
}

game.onScoreUpdate = (score, maxscore) => {
  _score.innerText = score.toString();
  _maxscore.innerText = maxscore.toString();
}

game.startGame();

_pause.onclick = () => {
  game.pause();
  _pause.innerText = game.isPaused ? "resume" : "pause";
}

_restart.onclick = () => {
  game.reStartGame();
}
