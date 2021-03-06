class GameScene extends Phaser.Scene{
    constructor() {
        super('Game');
    }

    init(){
        this.scene.launch('Ui');
        //this.score = 0;
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
        this.events.on('spawnPlayer', (playerObject)=>{            
            this.createPlayer(playerObject);
            this.setCollision();
        });

        this.events.on('chestSpawned', (chest)=>{            
            this.spawnChest(chest);
        });

        this.events.on('monsterSpawned', (monster)=>{            
            this.spawnMonster(monster);
        });

        this.events.on('chestRemoved', (chestId)=>{  
            this.chests.getChildren().forEach((chest)=>{
                if (chest.id===chestId){
                    chest.makeInactive();
                }
            })
        });

        this.events.on('monsterRemoved', (monsterId)=>{  
            this.monsters.getChildren().forEach((monster)=>{
                if (monster.id===monsterId){
                    monster.makeInactive();
                    this.monsterDeathAudio.play();
                }
            })
        });

        this.events.on('updateMonsterHealth', (monsterId, health)=>{  
            this.monsters.getChildren().forEach((monster)=>{
                if (monster.id===monsterId){
                    monster.updateHealth(health);
                }
            })
        });

        this.events.on('monsterMovement', (monsters)=>{  
            this.monsters.getChildren().forEach((monster)=>{
                Object.keys(monsters).forEach((monsterId)=>{
                    if (monster.id === monsterId){
                        this.physics.moveToObject(monster, monsters[monsterId], 40);
                    }
                })
            })
        });

        this.events.on('updatePlayerHealth', (playerId, health)=>{ 
            if (health< this.player.health) this.playerDamageAudio.play(); 
            this.player.updateHealth(health);
        });

        this.events.on('respawnPlayer', (playerObject)=>{
            this.playerDeathAudio.play();  
            this.player.respawn(playerObject);
        });

        this.gameManager = new GameManager(this, this.map.map.objects);
        this.gameManager.setup();
    }

    createAudio(){
        this.goldPickupAudio = this.sound.add('goldSound', {
            loop:false,
            volume: 0.3,
        });
        this.playerAttackAudio = this.sound.add('playerAttack', {
            loop:false,
            volume: 0.1,
        });
        this.playerDamageAudio = this.sound.add('playerDamage', {
            loop:false,
            volume: 0.2,
        });
        this.playerDeathAudio = this.sound.add('playerDeath', {
            loop:false,
            volume: 0.2,
        });
        this.monsterDeathAudio = this.sound.add('monsterDeath', {
            loop:false,
            volume: 0.2,
        });
    }

    createPlayer(playerObject){
        this.player = new PlayerContainer(
            this, 
            playerObject.x *2, 
            playerObject.y*2,
            'characters',
            0,
            playerObject.health,
            playerObject.maxHealth,
            playerObject.id,
            this.playerAttackAudio,
            );
        
    }

    createGroups(){
        //Create chest group
        this.chests = this.physics.add.group();
        this.monsters = this.physics.add.group();
        this.monsters.runChildUpdate = true;
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
                monsterObject.x, 
                monsterObject.y,
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
            monster.setPosition(monsterObject.x, monsterObject.y);
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
        //Check overlaps between monsters and weapon
        this.physics.add.overlap(this.player.weapon, this.monsters, this.enemyOverlap, null,this);
    
    }

    enemyOverlap(weapon, enemy){
        if (this.player.playerAttacking && !this.player.swordHit){
            this.player.swordHit = true;
            //enemy.makeInactive();
            this.events.emit('monsterAttacked', enemy.id, this.player.id);
        }
    }

    collectChest(player, chest){
        this.goldPickupAudio.play();
        //Update score
        //this.score += chest.coins;
        
        //this.events.emit('updateScore', this.score);

        //chest.makeInactive();
        //Spawn a new chest

        //this.time.delayedCall(1000,this.spawnChest, [],this);
        this.events.emit('pickUpChest', chest.id, player.id);
    }

    createMap(){
        this.map = new Map(this, 'map','background','background', 'blocked');
    }
}
