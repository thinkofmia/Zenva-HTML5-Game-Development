class BootScene extends Phaser.Scene{
    constructor() {
        super('Boot');
    }

    preload(){
        //Load Images
        this.loadImages();
        
        //Load Spritesheets
        this.loadSpriteSheets();

        //Load Audios
        this.loadAudio();
    }

    create(){
        console.log('Starting Game...');
        this.scene.start('Title');
    }

    loadImages(){
        this.load.image('button1', 'Assets/images/ui/blue_button01.png');
        this.load.image('button2', 'Assets/images/ui/blue_button02.png');
    }

    loadSpriteSheets(){
        this.load.spritesheet('items','Assets/images/items.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet('characters','Assets/images/characters.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    loadAudio(){
        this.load.audio('goldSound','Assets/audio/Pickup.wav');
    }
}
