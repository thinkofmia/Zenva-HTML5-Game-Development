// Create a Scene
let gameScene = new Phaser.Scene('Game');

// Load Assets
gameScene.preload = function(){
    // Load Images
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
  };

// Called once after the preload ends
gameScene.create = function() {
    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;

    // Create bg sprite
    let bg = this.add.sprite(0, 0, 'background');
   
    // Place bg sprite in the center
    bg.setPosition(gameW/2, gameH/2);

    //Create Player Sprite
    let player = this.add.sprite(70, 180, 'player');
  };

// Set Configuration of Game
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
};

//Create new game with config
let game = new Phaser.Game(config);