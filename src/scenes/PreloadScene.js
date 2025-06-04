export class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("bgClosed", "assets/images/Open-Closed-Temple-Gate-Closed.png");
  }

  create() {
    this.scene.start("GameScene");
  }
}
