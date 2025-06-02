export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("titleText", "assets/Sanskrit.svg");
    this.load.image("playButton", "assets/play.png");
    this.load.video("bgvideo", "assets/video.mp4", "loadeddata", false, true);
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    const video = this.add.video(0, 0, "bgvideo");
    video.setDisplaySize(600, 500);
    video.setOrigin(0, 0);
    video.setLoop(true).setMute(true).play(true);


    this.input.once("pointerdown", () => {
      video.setMute(false);
    });

    this.add.image(centerX, centerY - 100, "titleText").setOrigin(0.5).setScale(0.6);

    const playButton = this.add.image(centerX, centerY + 150, "playButton")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .setScale(1.5);

    playButton.on("pointerdown", () => {
      this.scene.start("GameScene");
    });

    this.tweens.add({
      targets: playButton,
      scale: { from: 1.0, to: 1.1 },
      yoyo: true,
      repeat: -1,
      duration: 600,
    });
  }
}
