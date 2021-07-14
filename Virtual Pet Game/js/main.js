// create a new scene
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function() {
  //Game Stats
  this.stats = {
    health: 100,
    fun: 100
  }

};

// load asset files for our game
gameScene.preload = function() {
  
  // load assets
  this.load.image('backyard', 'assets/images/backyard.png');
  this.load.image('apple', 'assets/images/apple.png');
  this.load.image('candy', 'assets/images/candy.png');
  this.load.image('rotate', 'assets/images/rotate.png');
  this.load.image('toy', 'assets/images/rubber_duck.png');

  //Load Spritesheet
  this.load.spritesheet('pet','assets/images/pet.png', {
    frameWidth: 97,
    frameHeight: 83,
    margin: 1,
    spacing: 1
  });
};

// executed once, after assets were loaded
gameScene.create = function() {

  //Game BG
  let bg = this.add.sprite(0,0,'backyard').setInteractive();
  bg.setOrigin(0,0);

  //Event listener for the bg
  bg.on('pointerdown', this.placeItem, this);

  this.pet = this.add.sprite(100,200,'pet',0).setInteractive();

  //Make pet draggable
  this.input.setDraggable(this.pet);

  //Follow pointer when dragging
  this.input.on('drag', function(pointer, gameObject, dragX, dragY){
    //Make sprite located at dragging
    gameObject.x = dragX;
    gameObject.y = dragY;
  });

  this.createUI();
};

//Create UI
gameScene.createUI = function(){
  //Buttons
  this.appleBtn = this.add.sprite(72,570,'apple').setInteractive();
  this.appleBtn.customStats = {health: 20, fun: 0};
  this.appleBtn.on('pointerdown', this.pickItem);

  this.candyBtn = this.add.sprite(144,570,'candy').setInteractive();
  this.candyBtn.customStats = {health: -10, fun: 10};
  this.candyBtn.on('pointerdown', this.pickItem);

  this.toyBtn = this.add.sprite(216,570,'toy').setInteractive();
  this.toyBtn.customStats = {health: 0, fun: 15};
  this.toyBtn.on('pointerdown', this.pickItem);

  this.rotateBtn = this.add.sprite(288,570,'rotate').setInteractive();
  this.rotateBtn.customStats = {fun: 20};
  this.rotateBtn.on('pointerdown', this.rotatePet);

  //Array with all buttons
  this.buttons = [this.appleBtn, this.candyBtn, this.toyBtn, this.rotateBtn];

  //UI not blocked
  this.uiBlocked = false;

  //Refresh UI
  this.uiReady();
};

//Place new items on game
gameScene.placeItem = function(pointer, localX, localY){
  //console.log(pointer);
  //console.log(localX, localY);

  //Check item selected
  if (!this.selectedItem) return;

  //UI must be unblocked
  if (this.uiBlocked) return;

  // Create new item in position
  let newItem = this.add.sprite(localX, localY, this.selectedItem.texture.key);

  //Clear UI
  //this.uiReady();

  //Block UI
  this.uiBlocked = true;

  //Pet movement
  let petTween = this.tweens.add({
    targets: this.pet,
    duration: 500,
    x: newItem.x,
    y: newItem.y,
    paused: false,
    callbackScope: this,
    onComplete: function(tween, sprites){
      //Pet stats
      //this.stats.health += this.selectedItem.customStats.health;
      //this.stats.fun += this.selectedItem.customStats.fun;
      
      for (stat in this.selectedItem.customStats){
        if (this.selectedItem.customStats.hasOwnProperty(stat)){
          this.stats[stat] += this.selectedItem.customStats[stat];
        }
      };

      //Clear UI
      this.uiReady();
      
      console.log(this.stats);
      }
  });

  

  
};

//Rotate Pet
gameScene.rotatePet = function(){
  if (this.scene.uiBlocked) return;
  
  //Make sure UI is ready
  this.scene.uiReady();
  
  //Block UI
  this.scene.uiBlocked = true;

  //Rotate
  this.alpha = 0.5;

  let scene = this.scene;

  /*setTimeout(function(){
    //Set scene to ready
    scene.uiReady();
  }, 2000);
  */

  //Rotation Tween
  let rotateTween = this.scene.tweens.add({
    targets: this.scene.pet,
    duration: 600,
    angle: 360,
    pause: false,
    callbackScope: this,
    onComplete: function(tween, sprites){
      //Increase Fun
      this.scene.stats.fun += this.customStats.fun;

      // Set UI to ready
      this.scene.uiReady();

      console.log(this.scene.stats);
    }
  });

  console.log('Rotating pet');
};

//Pick item
gameScene.pickItem = function(){
  //console.log(this.customStats);
  if (this.scene.uiBlocked) return;
  
  //Make sure UI is ready
  this.scene.uiReady();

  //Select Item
  this.scene.selectedItem = this;

  //Change transparency
  this.alpha = 0.5;

  console.log('Picking ' + this.texture.key);
};

//Set UI to ready
gameScene.uiReady = function(){
  //Nothing selected
  this.selectedItem = null;

  //Reset transparency
  for (let i=0; i<this.buttons.length; i++){
    this.buttons[i].alpha = 1;
  }

  //Unblock scene
  this.uiBlocked = false;
}

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scene: gameScene,
  title: 'Virtual Pet',
  pixelArt: false,
  backgroundColor: 'ffffff'
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
