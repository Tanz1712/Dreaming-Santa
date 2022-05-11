function myFunction() {
    alert("This app is awesome!");
}

/* const myGameArea = {
    canvas: document.createElement("canvas"),
    frames: 0,
    start: function () {
      this.canvas.width = 800;
      this.canvas.height = 500;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.firstChild);
      this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
      clearInterval(this.interval);
    },
  };
  
  class Component {
    constructor(width, height, color, x, y) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.speedX = 0;
      this.speedY = 0;
    }
  
    update() {
      const ctx = myGameArea.context;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}

class Player extends Component {
    constructor() {
      super(30, 30, "red", 0, 110);
    }

const player = new Player();
myGameArea.start(); */