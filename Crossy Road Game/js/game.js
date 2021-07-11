// Create a Scene
let gameScene = new Phaser.Scene('Game');

// Load Assets
gameScene.preload = function(){
    // Load Images
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/dragon.png');
  };

// Called once after the preload ends
gameScene.create = function() {
    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;

    // Create bg sprite
    let bg = this.add.sprite(0, 0, 'background');
   
    // change the origin to the top-left corner
    bg.setOrigin(0, 0);
    // Place bg sprite in the center
    //bg.setPosition(gameW/2, gameH/2);

    //Create Player Sprite
    let player = this.add.sprite(70, 180, 'player');

    // Stretching player
    player.setScale(0.5, 2);

    // create an enemy
    let enemy1 = this.add.sprite(250, 180, 'enemy');

    enemy1.scaleX = 2;
    enemy1.scaleY = 2;

    //create a second enemy
    let enemy2 = this.add.sprite(450, 180, 'enemy');
    enemy2.displayWidth = 300;

    // flip
    enemy1.flipX = true;
    enemy1.flipY = true;
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