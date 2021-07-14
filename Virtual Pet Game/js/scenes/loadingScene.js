// create a new scene
let loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function(){
    //Show Logo
    let logo = this.add.sprite(this.sys.game.config.width/2, 250, 'logo');

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

loadingScene.create = function(){

    //Animation
    this.anims.create({
        key: 'funnyfaces',
        frames: this.anims.generateFrameNames('pet', {frames: [1,2,3]}),
        frameRate: 7,
        yoyo: true,
        repeat: 0 //Repeat forever is -1
    });

    //this.scene.start('Home');
}