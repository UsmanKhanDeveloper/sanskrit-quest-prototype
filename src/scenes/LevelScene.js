import Phaser from "phaser";

function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

export class LevelScene extends Phaser.Scene {
  constructor() {
    super("LevelScene");
    this.currentIndex = 0;
    this.correctCount = 0;
  }

  preload() {
    this.load.image("bgClosed", "assets/images/Open-Closed-Temple-Gate-Closed.png");
    this.load.json("quizData", "assets/sanskrit_quiz_500.json");
  }

  create() {
    const sizes = {
      width: this.sys.game.config.width,
      height: this.sys.game.config.height,
    };

    this.add.image(0, 0, "bgClosed").setOrigin(0, 0);
    this.buttonY = sizes.height - 120;
    this.spacing = sizes.width / 4;
    this.centerX = sizes.width / 2;

    this.soundButton = this.add.text(this.centerX, 50, "🔊 Play Question", {
      font: "24px Arial",
      fill: "#ffffff",
      backgroundColor: "maroon",
      padding: { x: 12, y: 8 },
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        speakText(this.currentQuestion.prompt);
      });

    this.questions = Phaser.Utils.Array.Shuffle(this.cache.json.get("quizData"));
    this.loadQuestion();
  }

  loadQuestion() {
    this.clearButtons();

    if (this.currentIndex >= 5) {
      speakText(`You answered ${this.correctCount} out of 5 correctly.`);
      this.add.text(this.centerX, 400, `Score: ${this.correctCount}/5`, {
        font: "26px Arial",
        fill: "#ffffff",
      }).setOrigin(0.5);
      return;
    }

    this.currentQuestion = this.questions[this.currentIndex % this.questions.length];
    speakText(this.currentQuestion.prompt);

    this.answerButtons = [];

    this.currentQuestion.options.forEach((text, index) => {
      const label = String.fromCharCode(65 + index);
      const buttonX = this.spacing * (index + 1);

    const btn = this.add.text(buttonX, this.buttonY, `${label}: ${text}`, {
      fontFamily: "Verdana",
      fontSize: "30px",
      color: "#ffffff",
      backgroundColor: "maroon",
      padding: { x: 20, y: 12 },
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => btn.setStyle({ backgroundColor: "#1d4ed8" }))
      .on("pointerout", () => btn.setStyle({ backgroundColor: "#2563eb" }))
      .on("pointerdown", () => {
        if (label === this.currentQuestion.correctAnswer) {
          this.correctCount++;
          speakText("Correct! Next question.");
        } else {
          speakText("Wrong answer. Moving on.");
        }
        this.currentIndex++;
        this.time.delayedCall(1500, () => this.loadQuestion());
      });


      this.answerButtons.push(btn);
    });
  }

  clearButtons() {
    if (this.answerButtons) {
      this.answerButtons.forEach((btn) => btn.destroy());
    }
  }
}

window.addEventListener('resize', () => this.scale.resize(window.innerWidth, window.innerHeight));
