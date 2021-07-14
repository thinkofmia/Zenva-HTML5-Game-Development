// create a new scene
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function() {

  //Player parameters
  this.playerSpeed = 150;
  this.jumpSpeed = -600;
};

// load asset files for our game
gameScene.preload = function() {

  // load images
  this.load.image('ground', 'assets/images/ground.png');
  this.load.image('platform', 'assets/images/platform.png');
  this.load.image('block', 'assets/images/block.png');
  this.load.image('goal', 'assets/images/gorilla3.png');
  this.load.image('barrel', 'assets/images/barrel.png');

  // load spritesheets
  this.load.spritesheet('player', 'assets/images/player_spritesheet.png', {
    frameWidth: 28,
    frameHeight: 30,
    margin: 1,
    spacing: 1
  });

  this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', {
    frameWidth: 20,
    frameHeight: 21,
    margin: 1,
    spacing: 1
  });
};

// executed once, after assets were loaded
gameScene.create = function() {


  this.platforms = this.add.group();

  //Ground
  let ground = this.add.sprite(180, 604, 'ground');
  this.physics.add.existing(ground, true);
  this.platforms.add(ground);

  //Platform
  let platform = this.add.tileSprite(180, 500, 4 * 36, 1 * 30, 'block');
  this.physics.add.existing(platform, true);
  this.platforms.add(platform);

  //Player
  this.player = this.add.sprite(180, 400, 'player');
  this.physics.add.existing(this.player);

  //Walking ANimation
  this.anims.create({
    key: 'walking',
    frames: this.anims.generateFrameNames('player', {
      frames: [0,1,2]
    }),
    frameRate: 12,
    yoyo: true,
    repeat: -1
  });

  //Disable Gravity
  //ground.body.allowGravity = false;

  //Immovable
  //ground.body.immovable = true;

  //Create and add sprites to physics
  //let ground2 = this.physics.add.sprite(180, 200, 'ground');

  //Collision Detection
  this.physics.add.collider(this.player, this.platforms);

  //Enable cursor keys
  this.cursors = this.input.keyboard.createCursorKeys();

};

//Executed on every frame
gameScene.update = function(){
  if (this.cursors.left.isDown){
    this.player.body.setVelocityX(-this.playerSpeed);
    this.player.flipX = false;

    //Check
    if (!this.player.anims.isPlaying) this.player.anims.play('walking');
  }
  else if (this.cursors.right.isDown){
    this.player.body.setVelocityX(this.playerSpeed);
    this.player.flipX = true;
    if (!this.player.anims.isPlaying) this.player.anims.play('walking');
  }
  else {
    this.player.body.setVelocityX(0);
    this.player.anims.stop('walking')

    //Set default frame
    this.player.setFrame(3);
  }
};

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: gameScene,
  title: 'Monster Kong',
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1000},
      debug: true
    }
  }
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
