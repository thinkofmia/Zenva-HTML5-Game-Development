// Create a Scene
let gameScene = new Phaser.Scene('Game');

// Initiate Scene Parameters
gameScene.init = function(){
    //Player Speed
    this.playerSpeed = 3;

    //Enemy Speed
    this.enemyMinSpeed = 1;
    this.enemyMaxSpeed = 5;

    //Boundaries
    this.enemyMinY = 80;
    this.enemyMaxY = 280;
}

// Load Assets
gameScene.preload = function(){
    // Load Images
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/dragon.png');
    this.load.image('goal', 'assets/treasure.png');
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
    this.player = this.add.sprite(20, gameH/2, 'player');

    // Scaling player
    this.player.setScale(0.5);

    //Goal
    this.goal = this.add.sprite(gameW - 80, gameH/2, 'goal');
    this.goal.setScale(0.6);

    this.enemies = this.add.group({
        key: 'enemy',
        repeat: 5,
        setXY: {
          x: 90,
          y: 100,
          stepX: 80,
          stepY: 20
        }
      });

    /*
    // Create an enemy
    this.enemy = this.add.sprite(180, gameH/2, 'enemy');
    this.enemy.flipX = true;
    //this.enemy.setScale(0.6);

    
    */

    //this.enemies.add(this.enemy);

    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4);

    //Set FlipX and speed
    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy){
        //Flip enemy
        enemy.flipX = true

        let dir = Math.random() < 0.5 ? 1 : -1;
        let speed = this.enemyMinSpeed + Math.random()*(this.enemyMaxSpeed-this.enemyMinSpeed);
        enemy.speed = dir * speed;
    }, this);
    //console.log(this.enemies.getChildren());

/*
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
    this.enemy1.flipY = true;
    */
  };

// Updates to 60 times per second
gameScene.update = function(){
    /*
    // this.enemy1.x += 1;  
    this.enemy1.angle += 1;
    
    // Check if we've reached scale of 2
    if(this.player.scaleX < 2) {
      // Make the player grow
      this.player.scaleX += 0.01;
      this.player.scaleY += 0.01;
    }*/

    //Check for active input
    if (this.input.activePointer.isDown){
        //Player walks
        this.player.x += this.playerSpeed;
    }

    //Treasure overlap check
    let playerRect = this.player.getBounds();
    let treasureRect = this.goal.getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)){
        console.log('Reached Goal!');

        //Restart Scene
        this.scene.restart();
        return;
    }

    //Get Enemies
    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;

    for (let i=0; i<numEnemies;i++){
        //Enemy overlap check
        let enemyRect = enemies[i].getBounds();

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)){
            console.log('Oww!');

            //Restart Scene
            this.scene.restart();
            return;
        }

        //Enemy Movement
        enemies[i].y += enemies[i].speed;

        let conditionUp = enemies[i].speed < 0 && enemies[i].y <= this.enemyMinY;
        let conditionDown = enemies[i].speed > 0 && enemies[i].y >= this.enemyMaxY;
        //Check if not pass min y and max y, reverse speed
        if (conditionUp || conditionDown){
            enemies[i].speed *= -1;
        }
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