import Phaser from "phaser";
import { PreloadScene } from "./PreloadScene";

const sizes = {
  width: 743,
  height: 860,
};

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("bgClosed", "assets/images/Open-Closed-Temple-Gate-Closed.png");
  }

  create() {
    this.add.image(0, 0, "bgClosed").setOrigin(0, 0);

    const soundButton = this.add
      .text(sizes.width / 2, 40, "🔊 Play Sound", {
        font: "24px Arial",
        fill: "#ffffff",
        backgroundColor: "#1e40af",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5, 0)
      .setInteractive({ useHandCursor: true });

    // Option Buttons
    const buttonLabels = ["A", "B", "C"];
    const buttonY = sizes.height - 80;
    const spacing = sizes.width / (buttonLabels.length + 1);


    buttonLabels.forEach((label, index) => {
      const buttonX = spacing * (index + 1);

      this.add
        .text(buttonX, buttonY, label, {
          font: "22px Arial",
          fill: "#ffffff",
          backgroundColor: "#2563eb",
          padding: { x: 16, y: 10 },
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          console.log(label === "B" ? "Correct!" : "Incorrect, try again!");
        });
    });
  }

  update() {
    // Game loop
  }
}

const canvas = document.getElementById("gameCanvas");

const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: canvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [PreloadScene, GameScene],
};

if (!window.gameStarted) {
  window.startGame = () => {
    new Phaser.Game(config);
    window.gameStarted = true;
  };
}

const startBtn = document.getElementById("start-btn");
const introImg = document.getElementById("intro-img");

let gameStarted = false;

if (startBtn) {
  startBtn.addEventListener("click", () => {
    document.getElementById("home-screen").style.display = "none";
    document.querySelector("header").style.display = "flex";
    document.querySelector("footer").style.display = "flex";
    canvas.style.display = "block";
    introImg.style.display = "block";

    document.addEventListener("click", function startGameAfterIntro() {
      if (!gameStarted) {
        new Phaser.Game(config);
        gameStarted = true;
        introImg.style.display = "none";
        document.removeEventListener("click", startGameAfterIntro);
      }
    });
  });
}

// Fullscreen 
document.getElementById("fullscreen-btn").addEventListener("click", () => {
  const canvas = document.getElementById("gameCanvas");
  if (!document.fullscreenElement) {
    canvas.requestFullscreen().catch(err => console.warn(err));
  } else {
    document.exitFullscreen();
  }
});

// Credits popup
document.getElementById("credits-btn").addEventListener("click", () => {
  document.getElementById("credits-modal").style.display = "flex";
});


