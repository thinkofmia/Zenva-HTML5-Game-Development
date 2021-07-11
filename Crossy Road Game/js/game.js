// Create a Scene
let gameScene = new Phaser.Scene('Game');

// Set Configuration of Game
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
};

//Create new game with config
let game = new Phaser.Game(config);