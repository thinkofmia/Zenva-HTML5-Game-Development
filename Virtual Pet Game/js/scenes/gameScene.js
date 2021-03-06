// create a new scene
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function() {
  //Game Stats
  this.stats = {
    health: 100,
    fun: 100
  }

  //Decay Parameters
  this.decayRates = {
    health: -5,
    fun: -2
  }
};

// load asset files for our game
gameScene.preload = function() {
};

// executed once, after assets were loaded
gameScene.create = function() {

  //Game BG
  let bg = this.add.sprite(0,0,'backyard').setInteractive();
  bg.setOrigin(0,0);

  //Event listener for the bg
  bg.on('pointerdown', this.placeItem, this);

  this.pet = this.add.sprite(100,200,'pet',0).setInteractive();
  this.pet.depth = 1;

  //Make pet draggable
  this.input.setDraggable(this.pet);

  //Follow pointer when dragging
  this.input.on('drag', function(pointer, gameObject, dragX, dragY){
    //Make sprite located at dragging
    gameObject.x = dragX;
    gameObject.y = dragY;
  });

  this.createUI();

  //Show stats to user
  this.createHud();
  this.refreshHud();

  //Decay of health and fun over time
  this.timedEventStats = this.time.addEvent({
    delay: 1000,
    repeat: -1, //Repeat forever
    callback: function(){
      //Update stats
      this.updateStats(this.decayRates);
    },
    callbackScope: this
  });
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

      //Destroy Item
      newItem.destroy();

      //Event listener when animation ends
      this.pet.on('animationcomplete', function(){

        //Set pet back to neutral
        this.pet.setFrame(0);

        //Clear UI
        this.uiReady();

        //Refresh HUD
        this.refreshHud();

      }, this);

      //Play spreadsheet animation
      this.pet.play('funnyfaces');

      //Update stats
      this.updateStats(this.selectedItem.customStats);
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
      
      //Update stats
      this.scene.updateStats(this.customStats);

      //Increase Fun
      this.scene.stats.fun += this.customStats.fun;

      // Set UI to ready
      this.scene.uiReady();

      //Refresh HUD
      this.scene.refreshHud();
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

//Show stats
gameScene.createHud = function(){
  //Health Stat
  this.healthText = this.add.text(20,20,'Health: ',{
    font: '26px Arial',
    fill: '#ffffff'
  });

  //Fun stat
  this.funText = this.add.text(170,20,'Fun: ',{
    font: '24px Arial',
    fill: '#ffffff'
  });

}

//Show current value of Health and fun
gameScene.refreshHud = function(){
  this.healthText.setText('Health: '+ this.stats.health);
  this.funText.setText('Fun: '+this.stats.fun);
};

//Stats Updater
gameScene.updateStats = function(statDiff){
      //Pet stats
      //this.stats.health += this.selectedItem.customStats.health;
      //this.stats.fun += this.selectedItem.customStats.fun;
      
      //Flag to see if game over
      let isGameOver = false;

      for (stat in statDiff){
        if (statDiff.hasOwnProperty(stat)){
          this.stats[stat] += statDiff[stat];

          //Stats cant be negative
          if (this.stats[stat]<=0){
            isGameOver = true;
            this.stats[stat] = 0;
          } 

          //Refresh HUD
          this.refreshHud();

          //Check Game Over
          if(isGameOver) this.gameOver();
        }
      };
};

gameScene.gameOver = function(){
  //Block UI
  this.uiBlocked = true;

  //Change frame of pet
  this.pet.setFrame(4);

  //Keep game on for sometime
  this.time.addEvent({
    delay: 2000,
    repeat: 0,
    callback: function(){
      this.scene.start('Home');
    },
    callbackScope: this
  });
};
