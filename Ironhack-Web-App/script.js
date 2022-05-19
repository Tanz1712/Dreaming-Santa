/* function myFunction() {
    alert("This app is awesome!");
} */
var myMusic;
var mySound;

const myGameArea = {
  frames: 0,

  score: 0,

  start: function () {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");

    const bgImage = new Image();
    const santaImage = new Image();

    this.snowBallImage = new Image();

    this.giftImage = new Image();

    bgImage.src = "Images/background.jpg";
    santaImage.src = "Images/sleepsanta.jpg";

    this.snowBallImage.src = "Images/newball.jpg";

    this.giftImage.src = "Images/gift.jpg";

    bgImage.onload = () => {
      this.bg = new Background(bgImage);
      santaImage.onload = () => {
        this.santa = new SantaClaus(santaImage);

        this.snowBallImage.onload = () => {
          this.giftImage.onload = () => {
            this.bg.update();

            this.santa.update();

            document.onkeydown = (e) => {
              switch (e.key) {
                case "ArrowLeft":
                  this.santa.speedX -= 1;
                  break;
                case "ArrowRight":
                  this.santa.speedX += 1;
                  break;
                default:
                  break;
              }
            };
            document.onkeyup = () => {
              this.santa.speedX = 0;
            };
            updateGameArea();
          };
        };
      };
    };
  },

  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

const obstacles = [];
const gifts = [];

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    /* startGame(); */
    startScreen();
    gameScreen();
    startGame();
  };
  function startScreen() {
    
    const x = document.getElementById("start-screen");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function gameScreen() {
    
    const x = document.getElementById("game-board");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function startGame() {
    myGameArea.start();
    myMusic = new Sound("./music/jingle-bells-8bit.mp3");
    myMusic.loop = true;
    myMusic.play();
    mySound = new Sound("./music/big-impact-7054.mp3");
  }
};

class Component {
  constructor(posX, posY, width, height) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
  }

  getX() {
    return this.posX;
  }

  getY() {
    return this.posY;
  }

  getSpeedX() {
    return this.speedX;
  }

  getSpeedY() {
    return this.speedY;
  }

  setX(newX) {
    this.posX = newX;
  }

  setY(newY) {
    this.posY = newY;
  }

  setSpeedX(newSpeed) {
    this.speedX = newSpeed;
  }

  setSpeedY(newSpeed) {
    this.speedY = newSpeed;
  }

  update() {}

  move() {
    this.setX(this.getX() + this.getSpeedX());
    this.setY(this.getY() + this.getSpeedY());
  }

  left() {
    return this.posX;
  }

  right() {
    return this.posX + this.width;
  }

  top() {
    return this.posY;
  }

  bottom() {
    return this.posY + this.height;
  }

  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
}

class Background extends Component {
  constructor(image) {
    super(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    this.image = image;
  }

  update() {
    myGameArea.context.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }
}

class Obstacle extends Component {
  constructor(image) {
    const xPos = Math.floor(Math.random() * myGameArea.canvas.width);

    super(xPos, -50, 50, 50);

    this.speedY = 2;
    this.image = image;
  }

  update() {
    this.move();

    myGameArea.context.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }
}

class Gift extends Component {
  constructor(image) {
    const xPos = Math.floor(Math.random() * myGameArea.canvas.width);

    super(xPos, -50, 50, 50);

    this.speedY = 2;
    this.image = image;
  }

  update() {
    this.move();

    myGameArea.context.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }
}

class SantaClaus extends Component {
  constructor(image) {
    super(640, 550, 250, 100);
    this.image = image;
  }

  update() {
    this.move();
    myGameArea.context.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  //Avoid Santa going out of Canvas

  setX(newX) {
    if (newX >= 0 && newX < myGameArea.canvas.width - this.width) {
      this.posX = newX;
    }
  }
}

function updateGameArea() {
  myGameArea.clear();
  myGameArea.bg.update();
  myGameArea.santa.update();

  if (myGameArea.frames % 120 === 0) {
    obstacles.push(new Obstacle(myGameArea.snowBallImage));
  }
  obstacles.forEach((element) => {
    element.update();
  });
  myGameArea.frames += 1;
  myGameArea.context.font = "50px comic sans ms";
  myGameArea.context.fillStyle = "black";
  myGameArea.context.fillText(`Score: ${myGameArea.score}`, 200, 150);
  const gameOver = obstacles.some((element) => {
    return myGameArea.santa.crashWith(element);
  });

  if (myGameArea.frames % 120 === 0) {
    gifts.push(new Gift(myGameArea.giftImage));
  }
  gifts.forEach((element) => {
    element.update();
  });

  myGameArea.context.font = "50px comic sans ms";
  myGameArea.context.fillStyle = "black";
  myGameArea.context.fillText(`Score: ${myGameArea.score}`, 200, 150);
  const bonus = gifts.some((element) => {
    const collision = myGameArea.santa.crashWith(element); 
    if(collision) {
      gifts.splice(gifts.indexOf(element));
    }
    return collision;
     
  });

  if(bonus) {
    myGameArea.score += 10;
  }

  if (!gameOver) {
    
    requestAnimationFrame(updateGameArea);
  } else {
    myMusic.stop();
    mySound.play();
    alert(
      `Game Over, you scored ${myGameArea.score} Points. Refresh the page to try again`
    );
  }
}

class Sound {
  constructor(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
      this.sound.play();
    };
    this.stop = function () {
      this.sound.pause();
    };
  }
}
