// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function() {}

// load asset files for our game
gameScene.preload = function() {
  // Load Images
  this.load.image('background','assets/images/background-city.png');
  this.load.image('building','assets/images/building.png');
  this.load.image('car','assets/images/car.png');
  this.load.image('house','assets/images/house.png');
  this.load.image('tree','assets/images/tree.png');
};

// executed once, after assets were loaded
gameScene.create = function() {
  //Load Background
  this.add.sprite(0,0,'background').setOrigin(0,0);

};

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene,
  title: 'Spanish Learning Game',
  pixelArt: false,
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
