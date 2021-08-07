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
      this.scene.events.on('pickUpChest', (chestId)=>{  
        
        //Update spawner
        if (this.chests[chestId]){
          this.spawners[this.chests[chestId].spawnerId].removeObject(chestId);
        }
      });

      this.scene.events.on('monsterAttacked', (monsterId)=>{  
        
        //Update spawner
        if (this.monsters[monsterId]){
          //Subtract health
          this.monsters[monsterId].loseHealth();

          //Check if monster dead
          if (this.monsters[monsterId].health <=0){
            this.spawners[this.monsters[monsterId].spawnerId].removeObject(monsterId);
            this.scene.events.emit('monsterRemoved', monsterId);
          }
          else {
            this.scene.events.emit('updateMonsterHealth', monsterId, this.monsters[monsterId].health);
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
          this.deleteMonster.bind(this)
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
}