// create a new scene
let homeScene = new Phaser.Scene('Home');

//Create
homeScene.create = function(){
    //Game background, with active input
    let bg = this.add.sprite(0,0,'backyard').setInteractive();
    bg.setOrigin(0,0);

    //Welcome Text
    let text = this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/2, 'VIRTUAL PET', {
        font: '40px Arial',
        fill: '#ffffff',
    });

    text.setOrigin(0.5, 0.5);

    bg.on('pointerdown', function(){
        this.scene.start('Game');
    }, this);
};