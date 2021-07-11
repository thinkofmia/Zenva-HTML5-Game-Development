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
    this.player = this.add.sprite(70, gameH/2, 'player');

    // Scaling player
    this.player.setScale(0.5);

    // create an enemy
    this.enemy1 = this.add.sprite(250, gameH/2, 'enemy');

    this.enemy1.scaleX = 3;
    this.enemy1.scaleY = 3;

    // Rotating using the angle of rotation in degrees
    //this.enemy1.angle = 45;
    //this.enemy1.setAngle(45);

    // Rotating using angle of rotation in radians
    // this.enemy1.setOrigin(0, 0);
    this.enemy1.rotation = Math.PI / 4;
    this.enemy1.setRotation(Math.PI / 4);
    
    console.log(this.enemy1);

    //Create a second enemy
    this.enemy2 = this.add.sprite(450, gameH/2, 'enemy');
    this.enemy2.displayWidth = 300;

    // Flip
    this.enemy1.flipX = true;
    this.enemy1.flipY = true;
  };

// Updates to 60 times per second
gameScene.update = function(){
    // this.enemy1.x += 1;
    
    this.enemy1.angle += 1;
    
    // Check if we've reached scale of 2
    if(this.player.scaleX < 2) {
      // Make the player grow
      this.player.scaleX += 0.01;
      this.player.scaleY += 0.01;
    }
    
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