class GameScene extends Phaser.Scene{
    constructor() {
        super('Game');
    }

    init(){
        this.scene.launch('Ui');
        this.score = 0;
    }

    create() {
        
        this.createMap();

        this.createAudio();
    
        this.createChests();
        
        //this.createWalls();
    
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
        this.player = new Player(this, 224,224,'characters',0);
        
    }

    createChests(){
        //Create chest group
        this.chests = this.physics.add.group();
        //Create chest position array
        this.chestPositions = [
            [100,100],
            [200,200],
            [300,300],
            [400,400],
            [500,500],
        ];
        //Specify max chest
        this.maxNoOfChests = 3;
        //Spawn a chest
        for (let i=0;i<this.maxNoOfChests;i++){
            this.spawnChest();
        }
    
    }

    spawnChest(){
        const location = this.chestPositions[Math.floor(Math.random()*this.chestPositions.length)];
        let chest = this.chests.getFirstDead();
        if(!chest){
            const chest = new Chest(this, location[0],location[1],'items');
            this.chests.add(chest);
        }
        else {
            chest.setPosition(location[0],location[1]);
            chest.makeActive();
        }
    }

    createWalls(){
        //this.add.sprite(300,100,'button1');

        this.wall = this.physics.add.image(500,100, 'button1');
        this.wall.setImmovable();
    }

    setCollision(){
        //Check collision between player and blocked layer
        this.physics.add.collider(this.player, this.blockedLayer);
        //Check overlaps between player and chests
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null,this);
    
    }

    collectChest(player, chest){
        this.goldPickupAudio.play();
        //Update score
        this.score += chest.coins;
        this.events.emit('updateScore', this.score);
        chest.makeInactive();
        //Spawn a new chest
        this.time.delayedCall(1000,this.spawnChest, [],this);
    }

    createMap(){
        //Create tile map
        this.map = this.make.tilemap({key: 'map'});
        //Add tileset image
        this.tiles = this.map.addTilesetImage('background','background',32,32,1,2);
        //Create background
        this.backgroundLayer = this.map.createStaticLayer('background', this.tiles, 0,0);
        this.backgroundLayer.setScale(2);
        //Crate Blocked layer
        this.blockedLayer = this.map.createStaticLayer('blocked', this.tiles, 0, 0);
        this.blockedLayer.setScale(2);
        this.blockedLayer.setCollisionByExclusion([-1]);

        //Update world bounds
        this.physics.world.bounds.width = this.map.widthInPixels *2;
        this.physics.world.bounds.height = this.map.heightInPixels *2;

        //Limit camera to size of map
        this.cameras.main.setBounds(0,0,this.map.widthInPixels *2, this.map.heightInPixels *2);
        
    }
}
