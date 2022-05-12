/* function myFunction() {
    alert("This app is awesome!");
} */

 const myGameArea = {
    frames: 0,
    score: 0,
    start: function () {
      this.canvas = document.getElementById("canvas");
      this.context = this.canvas.getContext("2d");
      const bgImage = new Image();
      const santaImage = new Image();
      bgImage.src = "images/background.jpg";
      santaImage.src = "images/santa.jpg";
      bgImage.onload = () => {
        this.bg = new Background(bgImage);
        santaImage.onload = () => {
          this.santa = new SantaClaus(santaImage);
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
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

const obstacles = [];

window.onload = () => {
  document.getElementById('play-button').onclick = () => {
    startGame();
  };

  function startGame() {
    myGameArea.start();
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
        this.right() < obstacle.right() ||
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
  constructor() {
    const xPos = Math.floor(Math.random() * myGameArea.canvas.width);
    const height = 50;
    const width = 50;
    const yPos = -height;
    super(xPos, yPos, width, height);
    this.color = "red";
    this.speedY = 1;
  }

  update() {
    this.move();
    myGameArea.context.fillStyle = this.color;
    myGameArea.context.fillRect(this.posX, this.posY, this.width, this.height);
    
  }
}

class SantaClaus extends Component {
    constructor(image) {
      super(640, 550, 80, 150);
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
    if (newX >= 0 && newX < myGameArea.canvas.width - this.width) 
    {
      this.posX = newX;
    }
  }
}

function updateGameArea() {
  myGameArea.clear();
  myGameArea.bg.update();
  myGameArea.santa.update();
  if (myGameArea.frames % 120 === 0) {
    obstacles.push(new Obstacle());
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
  if (!gameOver) {
    myGameArea.score += 10;
    requestAnimationFrame(updateGameArea);
  } else {
    alert(`Congrats, you just got ${myGameArea.score} points`);
  }
}










 