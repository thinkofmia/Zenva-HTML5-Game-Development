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

  this.load.audio('treeAudio','assets/audio/arbol.mp3');
  this.load.audio('carAudio','assets/audio/auto.mp3');
  this.load.audio('houseAudio','assets/audio/casa.mp3');
  this.load.audio('buildingAudio','assets/audio/edificio.mp3');
  this.load.audio('correct','assets/audio/correct.mp3');
  this.load.audio('wrong','assets/audio/wrong.mp3');
};

// executed once, after assets were loaded
gameScene.create = function() {
  //Load Background
  let bg = this.add.sprite(0,0,'background').setOrigin(0,0);

  /*let soundSample = this.sound.add('correct');
  soundSample.play();
  soundSample.stop();
  soundSample.pause();
  soundSample.resume();
  */

  this.items = this.add.group([{
    key: 'building',
    setXY: {
      x: 100,
      y: 240
      },
    },
    {
      key: 'house',
      setXY: {
        x: 240,
        y: 280
        },
      setScale: {
        x: 0.8,
        y: 0.8
      }
    },
    {
      key: 'car',
      setXY: {
        x: 400,
        y: 300
        },
      setScale: {
        x: 0.8,
        y: 0.8
      }
    },
    {
      key: 'tree',
      setXY: {
        x: 550,
        y: 250
        },
      setScale: {
        x: 0.8,
        y: 0.8
      }
    },
  ]);

  //Set positions of sprites
  bg.depth = -1;
  this.items.setDepth(1);

  //Make Bg Interactive
  bg.setInteractive();
  
  Phaser.Actions.Call(this.items.getChildren(), function(item){
    // Make item interactive
    item.setInteractive();

    //Creating Tween - Resize
    item.resizeTween = this.tweens.add({
      targets: item,
      scaleX: 1.5,
      scaleY: 1.5,
      duration: 300,
      paused: true,
      yoyo: true
    });

    //Transparency tween
    item.alphaTween = this.tweens.add({
      targets: item,
      alpha: 0.7,
      duration: 200,
      paused: true,
    });

    item.on('pointerdown', function(pointer){
      item.resizeTween.restart();
    });

    item.on('pointerover', function(pointer){
      item.alphaTween.restart();
    });

    item.on('pointerout', function(pointer){
      //Stop alpha tween
      item.alphaTween.stop();
      //Set no transparency
      item.alpha = 1;
    });

  }, this);
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
