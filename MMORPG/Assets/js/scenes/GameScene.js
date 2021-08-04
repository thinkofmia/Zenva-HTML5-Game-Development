class GameScene extends Phaser.Scene{
    constructor() {
        super('Game');
    }

    init(){
        this.scene.launch('Ui');
    }

    create() {
        this.createAudio();
    
        this.createChests();
        
        this.createWalls();
    
        this.createPlayer();
    
       this.setCollision();

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    update() {
        this.player.update(this.cursors);
    }

    createAudio(){
        this.goldPickupAudio = this.sound.add('goldSound', {
            loop:false,
            volume: 0.2,
        });
    }

    createPlayer(){
        this.player = new Player(this, 32,32,'characters',0);
        
    }

    createChests(){
        this.chest = new Chest(this, 300,300,'items');
    
    }

    createWalls(){
        //this.add.sprite(300,100,'button1');

        this.wall = this.physics.add.image(500,100, 'button1');
        this.wall.setImmovable();
    }

    setCollision(){
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.overlap(this.player, this.chest, this.collectChest, null,this);
    
    }

    collectChest(player, chest){
        this.goldPickupAudio.play();
        this.events.emit('updateScore', chest.coins);
        chest.destroy();
    }
}
