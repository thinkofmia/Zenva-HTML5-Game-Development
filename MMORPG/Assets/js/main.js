var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
    },
};

var game = new Phaser.Game(config);

function preload(){
    this.load.image('button1', 'Assets/images/ui/blue_button01.png');

}

function create(){
    this.add.image(100,100,'button1');
}