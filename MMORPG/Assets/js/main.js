var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update,
    },
};

var game = new Phaser.Game(config);

function init(){

}

function preload(){
    this.load.image('button1', 'Assets/images/ui/blue_button01.png');

}

function create(){
    this.add.image(100,100,'button1');
}

function update(){
    
}