// create a new scene
let loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function(){
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
    this.scene.start('Home');
}