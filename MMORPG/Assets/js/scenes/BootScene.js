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

        //Load Tilemap
        this.loadTileMap();
    }

    create(){
        console.log('Starting Game...');
        this.scene.start('Title');
    }

    loadImages(){
        this.load.image('button1', 'Assets/images/ui/blue_button01.png');
        this.load.image('button2', 'Assets/images/ui/blue_button02.png');
        //Load tilemap
        this.load.image('background', 'assets/level/background-extruded.png');
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
        this.load.spritesheet('monsters','Assets/images/monsters.png', {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    loadAudio(){
        this.load.audio('goldSound','Assets/audio/Pickup.wav');
        this.load.audio('monsterDeath','Assets/audio/EnemyDeath.wav');
        this.load.audio('playerAttack','Assets/audio/PlayerAttack.wav');
        this.load.audio('playerDamage','Assets/audio/PlayerDamage.wav');
        this.load.audio('playerDeath','Assets/audio/PlayerDeath.wav');
    }

    loadTileMap(){
        this.load.tilemapTiledJSON('map','assets/level/large_level.json');
    }
}
