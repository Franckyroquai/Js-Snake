var canvas, gameContainer, scoreContainer, ctx, audioWin, audioLoose;

/** CANVAS PROPERTIES */
const canvasSize = 400;
const canvasBorder = "3px solid red";
const canvasBackgroundColor = "#1d1d1d";
const canvasOpacity = "0.8";

/** SCORE PROPERTIES */
var score = 0;
const scoreColor = "#fff";

/** SNAKE PROPERTIES */
const snakeColor = "yellow";
const snakeSize = 20;
var blockUnit = canvasSize / snakeSize;
var snakeX = Math.trunc(Math.random() * blockUnit) * snakeSize;
var snakeY = Math.trunc(Math.random() * blockUnit) * snakeSize;
/** FOOD PROPERTIES */
var rayonFood = snakeSize / 2;
var foodX = Math.trunc(Math.random() * blockUnit) * snakeSize + rayonFood;
var foodY = Math.trunc(Math.random() * blockUnit) * snakeSize + rayonFood;

/** STEP PROPERTIES */
var stepX = 0;
var stepY = 0;

export const SnakeGame = {
  start: () => {
    SnakeGame.initMedia();
    SnakeGame.createCanvas();
    SnakeGame.createSnake();
    SnakeGame.initMoveSnake();
    setInterval(SnakeGame.updateSnakePosition, 100)
  },
  createCanvas: () => {
    gameContainer = document.createElement("div");
    scoreContainer = document.createElement("div");
    scoreContainer.id = "score";
    scoreContainer.innerHTML = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(score);
    scoreContainer.style.color = scoreColor;
    scoreContainer.style.fontSize = "50px";
    scoreContainer.style.zIndex = 1000;
    scoreContainer.style.position = "fixed";
    gameContainer.id = "game-container";
    canvas = document.createElement("canvas");
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    canvas.style.border = canvasBorder;
    canvas.style.opacity = canvasOpacity;
    canvas.style.backgroundColor = canvasBackgroundColor;
    // canvas.style.display = "block"
    // canvas.style.marginLeft = "auto"
    // canvas.style.marginRight = "auto"
    //console.log(canvas);
    gameContainer.style.display = "flex";
    gameContainer.style.justifyContent = "center";
    gameContainer.style.alignItems = "center";

    ctx = canvas.getContext("2d");
    gameContainer.appendChild(scoreContainer);
    gameContainer.appendChild(canvas);
    document.body.appendChild(gameContainer);
  },
  initMedia: () =>{
    audioWin = document.createElement("audio")
    audioWin.src = "/assets/media/Applaudissements.wav"
    audioLoose = document.createElement("audio")
    audioLoose.src = "/assets/media/Cri_wilhelm.mp3"
  },
  createSnake: () => {
    ctx.fillStyle = snakeColor;
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);
    SnakeGame.createFood();
  },
  createFood: () =>{
    ctx.beginPath();
    ctx.arc(foodX, foodY, rayonFood, 0, 2 * Math.PI);
    ctx.fillStyle = snakeColor
    ctx.fill();
    ctx.closePath();
  },
  updateSnakePosition: () => {
    snakeX += stepX * snakeSize;
    snakeY += stepY * snakeSize;
    SnakeGame.createSnake();
    SnakeGame.checkClash();
  },
  initMoveSnake: () => {
    document.addEventListener("keydown", (event) => {
      console.log(event.key);
      switch (event.key) {
        case "ArrowUp":
          stepY = -1;
          stepX = 0;
          break;
        case "ArrowLeft":
          stepY = 0;
          stepX = -1;
          break;
        case "ArrowRight":
          stepY = 0;
          stepX = 1;
          break;
        case "ArrowDown":
          stepY = 1;
          stepX = 0;
          break;
        case "p":
          stepY = 0;
          stepX = 0;
          break;
        case "P":
          stepY = 0;
          stepX = 0;
          break;
        case " ":
          stepY = 0; 
          stepX = 0;
          break;

        default:
          break;
      }
    });
  },
  checkClash: () => {
    if ((snakeX < 0 || snakeX > (canvasSize - snakeSize)) || (snakeY <0 || snakeY > (canvasSize - snakeSize)) ) {
      // ERROR
      console.log("ERROR");
      SnakeGame.updateScore(score - 20);
      audioLoose.play();
      stepX = 0;
      stepY = 0;
      snakeX = Math.trunc(Math.random() * blockUnit) * snakeSize;
      snakeY = Math.trunc(Math.random() * blockUnit) * snakeSize;
    } else if (((foodX - rayonFood) === snakeX) && ((foodY - rayonFood) === snakeY)) {
      // WIN
      console.log("WIN");
      SnakeGame.updateScore(score + 10);
      audioWin.play();
      foodX = Math.trunc(Math.random() * blockUnit) * snakeSize + rayonFood;
      foodY = Math.trunc(Math.random() * blockUnit) * snakeSize + rayonFood;
    }
  },
  updateScore: (newScore) => {
    if(newScore !== score) {
      scoreContainer.innerHTML = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(newScore);
      score = newScore
    }
  }
};
