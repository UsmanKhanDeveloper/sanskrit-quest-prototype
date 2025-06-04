import Phaser from "phaser";

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
    //index for questions
    this.currentIndex = 0;

    // load assets
    this.load.image(
      "bgClosed",
      "assets/images/Open-Closed-Temple-Gate-Closed-GPT.png"
    );

    this.load.image(
      "bgOpened",
      "assets/images/Open-Closed-Temple-Gate-Open-GPT.png"
    );

    // Load questions.json
    this.load.json("questions", "/assets/data/questions.json");

    // You'll need to preload the audio files too
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (const letter of letters) {
      this.load.audio(letter, `/assets/Audio/${letter}.mp3`);
    }
  }

  create() {
    // setup game
    // 1. Background image
    this.add.image(0, 0, "bgClosed").setOrigin(0, 0);

    // 2. Get questions from cache and prepare current question
    this.questions = this.cache.json.get("questions");
    //console.log("Questions loaded:", this.questions);
    this.currentIndex = 0;
    const current = this.questions[this.currentIndex]; // should be like: { sound: "...", correct: "...", options: [...] }

    // 3. Add "Play Sound" button
    const playButton = this.add
      .text(sizes.width / 2, 40, "🔊 Play Sound", {
        font: "24px Arial",
        fill: "#ffffff",
        backgroundColor: "#1e40af",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.sound.play(current.correct); // correct is the letter, e.g., "A"
      });

    // 4. Use current.options from the JSON file to display the choices
    const options = current.options; // like ["A", "C", "B"]
    const buttonY = sizes.height - 80;
    const spacing = sizes.width / (options.length + 1);

    options.forEach((label, index) => {
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
          if (label === current.correct) {
            console.log("✅ Correct answer!");
            // Optional: Visual feedback or move to next question
          } else {
            console.log("❌ Incorrect. Try again!");
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
  scene: [GameScene],
};

const game = new Phaser.Game(config);
