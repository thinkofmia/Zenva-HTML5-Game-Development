class MonsterModel{
    constructor(x, y, gold, spawnerId, frame, health, attack){
        this.id = `${spawnerId}-${uuid.v4()}`;
        this.spawnerId = spawnerId;
        this.x = x;
        this.y =y;
        this.gold = gold;
        this.frame = frame;
        this.health = health;
        this.maxHealth = health;
        this.attack = attack;
    }

    loseHealth(){
        //console.log(this.health);
        this.health -=1;
    }

    move(){
        const randomPosition = randomNumber(1, 8);
        switch( randomPosition){
            case 1:
                this.x +=32;
                break;
            case 2:
                this.x -=32;
                break;
            case 3:
                this.y +=32;
                break;
            case 4:
                this.y -=32;
                break;
            case 5:
                this.x +=32;
                this.y +=32;
                break;
            case 6:
                this.x +=32;
                this.y -=32;
                break;
            case 7:
                this.x -=32;
                this.y +=32;
                break;
            case 8:
                this.x -=32;
                this.y -=32;
                break;
        }
    }
}