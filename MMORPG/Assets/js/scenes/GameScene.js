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
    
        this.createGroups();
        
        //this.createWalls();

        this.createGameManager();

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    update() {
        if (this.player) this.player.update(this.cursors);
    }

    createGameManager(){
        this.events.on('spawnPlayer', (location)=>{            
            this.createPlayer(location);
            this.setCollision();
        });

        this.events.on('chestSpawned', (chest)=>{            
            this.spawnChest(chest);
        });

        this.events.on('monsterSpawned', (monster)=>{            
            this.spawnMonster(monster);
        });

        this.gameManager = new GameManager(this, this.map.map.objects);
        this.gameManager.setup();
    }

    createAudio(){
        this.goldPickupAudio = this.sound.add('goldSound', {
            loop:false,
            volume: 0.2,
        });
    }

    createPlayer(location){
        this.player = new Player(this, location[0] *2,location[1]*2,'characters',0);
        
    }

    createGroups(){
        //Create chest group
        this.chests = this.physics.add.group();
        this.monsters = this.physics.add.group();
        /*
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
        */
    
    }

    spawnMonster(monsterObject){
        console.log(monsterObject);
        let monster = this.monsters.getFirstDead();
        if(!monster){
            monster = new Monster(this, 
                monsterObject.x * 2, 
                monsterObject.y * 2,
                'monsters', 
                0,  
                monsterObject.id,
                monsterObject.health,
                monsterObject.maxHealth,
                );
            this.monsters.add(monster);
        }
        else {
            monster.id = monsterObject.id;
            monster.health = monsterObject.health;
            monster.maxHealth = monsterObject.maxHealth;
            monster.setTexture('monsters', monsterObject.frame);
            monster.setPosition(monsterObject.x * 2, monsterObject.y * 2);
            monster.makeActive();
        }
    }

    spawnChest(chestObject){
        //const location = this.chestPositions[Math.floor(Math.random()*this.chestPositions.length)];
        let chest = this.chests.getFirstDead();
        if(!chest){
            chest = new Chest(this, chestObject.x * 2, chestObject.y * 2,'items', 0, chestObject.gold, chestObject.id);
            this.chests.add(chest);
        }
        else {
            chest.coins = chestObject.gold;
            chest.id = chestObject.id;
            chest.setPosition(chestObject.x * 2, chestObject.y * 2);
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
        this.physics.add.collider(this.player, this.map.blockedLayer);
        //Check overlaps between player and chests
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null,this);
        //Check collision between monsters and blocked layer
        this.physics.add.collider(this.monsters, this.map.blockedLayer);
        //Check overlaps between monsters and chests
        this.physics.add.overlap(this.player, this.monsters, this.enemyOverlap, null,this);
    
    }

    enemyOverlap( player, enemy){
        enemy.makeInactive();
        this.events.emit('destroyEnemy', enemy.id);
    }

    collectChest(player, chest){
        this.goldPickupAudio.play();
        //Update score
        this.score += chest.coins;
        this.events.emit('updateScore', this.score);
        chest.makeInactive();
        //Spawn a new chest
        //this.time.delayedCall(1000,this.spawnChest, [],this);
        this.events.emit('pickUpChest', chest.id);
    }

    createMap(){
        this.map = new Map(this, 'map','background','background', 'blocked');
    }
}
