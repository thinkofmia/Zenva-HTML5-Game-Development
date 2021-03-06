class GameManager{
    constructor(scene, mapData){
        this.scene = scene;
        this.mapData = mapData;

        this.spawners = {};
        this.chests = {};
        this.monsters = {};
        this.players = {};

        this.playerLocations = [];
        this.chestLocations = {};
        this.monsterLocations = {};
    }

    setup(){
        this.parseMapData();
        this.setupEventListener();
        this.setupSpawners();
        this.spawnPlayer();
    }

    parseMapData(){
      this.mapData.forEach((layer) => {
        if (layer.name === 'player_locations') {
          layer.objects.forEach((obj) => {
            this.playerLocations.push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)]);
          });
        } else if (layer.name === 'chest_locations') {
          layer.objects.forEach((obj) => {
            if (this.chestLocations[obj.properties.spawner]) {
              this.chestLocations[obj.properties.spawner].push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)]);
            } else {
              this.chestLocations[obj.properties.spawner] = [[obj.x + (obj.width / 2), obj.y - (obj.height / 2)]];
            }
          });
        } else if (layer.name === 'monster_locations') {
          layer.objects.forEach((obj) => {
            if (this.monsterLocations[obj.properties.spawner]) {
              this.monsterLocations[obj.properties.spawner].push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)]);
            } else {
              this.monsterLocations[obj.properties.spawner] = [[obj.x + (obj.width / 2), obj.y - (obj.height / 2)]];
            }
          });
        }
      });
    }

    setupEventListener(){
      this.scene.events.on('pickUpChest', (chestId, playerId)=>{  
        
        //Update spawner
        if (this.chests[chestId]){
          const { gold } = this.chests[chestId];
          //Update player
          this.players[playerId].updateGold(gold);
          this.scene.events.emit('updateScore', this.players[playerId].gold);
          //Removing chest
          this.spawners[this.chests[chestId].spawnerId].removeObject(chestId);
          this.scene.events.emit('chestRemoved', chestId);
        }
      });

      this.scene.events.on('monsterAttacked', (monsterId, playerId)=>{  
        
        //Update spawner
        if (this.monsters[monsterId]){
          const { gold, attack } = this.monsters[monsterId];
          //Subtract health
          this.monsters[monsterId].loseHealth();

          //Check if monster dead
          if (this.monsters[monsterId].health <=0){

            //Update player
            this.players[playerId].updateGold(gold);
            this.scene.events.emit('updateScore', this.players[playerId].gold);
            
            //Removing monster
            this.spawners[this.monsters[monsterId].spawnerId].removeObject(monsterId);
            this.scene.events.emit('monsterRemoved', monsterId);

            //Add bonus health to player
            this.players[playerId].updateHealth(2);
            this.scene.events.emit('updatePlayerHealth', playerId, this.players[playerId].health);
          }
          else {
            //Update player health
            this.players[playerId].updateHealth(-attack);
            this.scene.events.emit('updatePlayerHealth', playerId, this.players[playerId].health);

            //Update monsters health
            this.scene.events.emit('updateMonsterHealth', monsterId, this.monsters[monsterId].health);

            //Check player health below 0, else respawn
            if (this.players[playerId].health<=0){
              //Update gold player has
              this.players[playerId].updateGold(parseInt(this.players[playerId].gold/2, 10));
              this.scene.events.emit('updateScore', this.players[playerId].gold);

              //Respawn player
              this.players[playerId].respawn();
              this.scene.events.emit('respawnPlayer', this.players[playerId]);
            }

          }
          
        }
      });
    }

    setupSpawners(){
      const config = {
        spawnInterval: 3000,
        limit: 3,
        spawnerType: SpawnerType.CHEST,
        id: '',
      };

      let spawner;

      //Create chest spawners
      Object.keys(this.chestLocations).forEach((key)=>{
        config.id = `chest-${key}`; 

        spawner = new Spawner(config, 
          this.chestLocations[key],
          this.addChest.bind(this), 
          this.deleteChest.bind(this)
        );
        this.spawners[spawner.id] = spawner;
      });

      //Create Monster Spawners
      Object.keys(this.monsterLocations).forEach((key)=>{
        config.id = `monster-${key}`;              // update the unique id for the monster
        config.spawnerType = SpawnerType.MONSTER;  // update the spawner type
  

        spawner = new Spawner(config, 
          this.monsterLocations[key],
          this.addMonster.bind(this), 
          this.deleteMonster.bind(this),
          this.moveMonsters.bind(this),
        );
        this.spawners[spawner.id] = spawner;
      });
    }

    addMonster( monsterId, monster){
      this.monsters[monsterId] = monster;
      this.scene.events.emit('monsterSpawned', monster);
    }

    deleteMonster(monsterId){
      delete this.monsters[monsterId];
    }

    spawnPlayer(){
        const player = new PlayerModel(this.playerLocations);
        this.players[player.id] = player;
        this.scene.events.emit('spawnPlayer', player);
    }

    addChest(id, chest){
      this.chests[id] = chest;
      this.scene.events.emit('chestSpawned', chest);

    }

    deleteChest(chestId){
      delete this.chests[chestId]
    }

    moveMonsters(){
      this.scene.events.emit('monsterMovement', this.monsters);
    }
}