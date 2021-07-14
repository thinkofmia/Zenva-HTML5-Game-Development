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

  this.load.json('levelData', 'assets/json/levelData.json');
};

// executed once, after assets were loaded
gameScene.create = function() {

  //World bounds
  this.physics.world.bounds.width = 360;
  this.physics.world.bounds.height = 700;

  //Player
  this.player = this.add.sprite(175, 280, 'player');
  this.physics.add.existing(this.player);

  //Constraint player
  this.player.body.setCollideWorldBounds(true);

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

    //Fire ANimation
    this.anims.create({
      key: 'burning',
      frames: this.anims.generateFrameNames('fire', {
        frames: [0,1]
      }),
      frameRate: 4,
      repeat: -1
    });

    //Add all level elements
    this.setupLevel();
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

  this.input.on('pointerdown', function(pointer){
    console.log(pointer.x, pointer.y);
  });

};

//Executed on every frame
gameScene.update = function(){

  //Check on ground
  let onGround = this.player.body.blocked.down || this.player.body.touching.down;

  if (this.cursors.left.isDown){
    this.player.body.setVelocityX(-this.playerSpeed);
    this.player.flipX = false;

    //Check
    if (onGround && !this.player.anims.isPlaying) this.player.anims.play('walking');
  }
  else if (this.cursors.right.isDown){
    this.player.body.setVelocityX(this.playerSpeed);
    this.player.flipX = true;
    if (onGround && !this.player.anims.isPlaying) this.player.anims.play('walking');
  }
  else {
    this.player.body.setVelocityX(0);
    this.player.anims.stop('walking');

    //Set default frame
    if (onGround) this.player.setFrame(3);
  }

  //Jumping
  if (onGround && (this.cursors.space.isDown || this.cursors.up.isDown)){
    //Give player velocity Y
    this.player.body.setVelocityY(this.jumpSpeed);

    //Stop walking animation
    this.player.anims.stop('walking');

    //Change frame
    this.player.setFrame(2);
  }
};

//Set up elements in level
gameScene.setupLevel = function(){

  //Load Json data
  this.levelData = this.cache.json.get('levelData');

  //Create all platforms
  this.platforms = this.add.group();
  for (let i=0;i<this.levelData.platforms.length;i++){
    let curr = this.levelData.platforms[i];

    let newObj;

    //Create Object
    if (curr.numTiles == 1){
      //Create sprite
      newObj = this.add.sprite(curr.x, curr.y, curr.key).setOrigin(0,0);
    }
    else {
      //Create tilesprite
      let width = this.textures.get(curr.key).get(0).width;
      let height = this.textures.get(curr.key).get(0).height;
      newObj = this.add.tileSprite(curr.x, curr.y, curr.numTiles * width, height, curr.key).setOrigin(0);
    }

    //Enable Physics
    this.physics.add.existing(newObj, true);

    //Add to group
    this.platforms.add(newObj);
  }

    //Create all fires
    this.fires = this.add.group();
    for (let i=0;i<this.levelData.fires.length;i++){
      let curr = this.levelData.fires[i];
  
      let newObj = this.add.sprite(curr.x, curr.y, 'fire').setOrigin(0,0);

      //Enable Physics
      this.physics.add.existing(newObj, true);
      newObj.body.immovable = false;

      //Play animation
      newObj.anims.play('burning');

      //Add to group
      this.platforms.add(newObj);
    }
}

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
