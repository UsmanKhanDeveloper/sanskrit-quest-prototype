import Phaser from "phaser";
import { PreloadScene } from "./PreloadScene";

//set the size of the canvas same size as the bg image
const sizes = {
  width: 743,
  height: 860,
};

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    // load assets
    this.load.image(
      "bgClosed",
      "assets/images/Open-Closed-Temple-Gate-Closed.png"
    );
  }

  create() {
    // setup game

    // this also works -> "this.add.image(sizes.width / 2, sizes.height / 2, "bgClosed");" but below is more explicit
    this.add.image(0, 0, "bgClosed").setOrigin(0, 0); // Set origin to top-left corner

    const playButton = this.add
      .text(sizes.width / 2, 40, "🔊 Play Sound", {
        font: "24px Arial",
        fill: "#ffffff",
        backgroundColor: "#1e40af",
        padding: { x: 10, y: 5 },
        borderRadius: 5,
      })
      .setOrigin(0.5, 0) // center horizontally, align top
      .setInteractive({ useHandCursor: true }) // makes it clickable
      .on("pointerdown", () => {
        // Call your sound playback logic here
        this.sound.play("yourSoundKey"); // replace with your actual sound key
      });

    const buttonLabels = ["A", "B", "C"];
    const buttonY = sizes.height - 80; // near bottom of canvas
    const spacing = sizes.width / (buttonLabels.length + 1); // spacing between buttons

    buttonLabels.forEach((label, index) => {
      const buttonX = spacing * (index + 1);

      const optionButton = this.add
        .text(buttonX, buttonY, label, {
          font: "22px Arial",
          fill: "#ffffff",
          backgroundColor: "#2563eb", // blue-600
          padding: { x: 16, y: 10 },
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          // Handle answer check here
          if (label === "B") {
            console.log("Correct!");
            // Add correct answer logic
          } else {
            console.log("Incorrect, try again!");
            // Add incorrect feedback logic
          }
        });
    });
  }

  update() {
    // game loop
  }
}

const canvas = document.getElementById("gameCanvas"); // 👈 fetch canvas properly

//define the game config and launch
const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: canvas, // 👈 now using valid DOM reference
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }, // You can change speedDown later
      debug: true,
    },
  },
  scene: [PreloadScene,GameScene],
};

const game = new Phaser.Game(config);
