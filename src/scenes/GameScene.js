import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    // load assets
  }

  create() {
    // setup game
  }

  update() {
    // game loop
  }
}

// Define game config and launch
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
};

const game = new Phaser.Game(config);