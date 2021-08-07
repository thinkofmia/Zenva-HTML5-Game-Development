const Direction = {
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
    UP: 'UP',
    DOWN: 'DOWN',
};

class PlayerContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, frame){
        super(scene,x,y);
        this.scene = scene;
        this.velocity = 160;
        this.currentDirection = Direction.RIGHT;
        this.playerAttacking = false;
        this.flipX = true;
        this.swordHit = false;

        //Set size
        this.setSize(64,64);
        //Enable Physics
        this.scene.physics.world.enable(this);

        this.body.setCollideWorldBounds(true);

        this.scene.add.existing(this);
        //Camera
        this.scene.cameras.main.startFollow(this);

        //Create Player
        this.player = new Player(this.scene,0,0,key, frame);
        this.add(this.player);

        //Create weapon
        this.weapon = this.scene.add.image(40,0,'items',4);
        this.scene.add.existing(this.weapon);
        this.weapon.setScale(1.5);
        this.scene.physics.world.enable(this.weapon);
        this.add(this.weapon);
        this.weapon.alpha = 1;
    }

    update(cursors){
        this.body.setVelocity(0);
        if (cursors.left.isDown){
            this.body.setVelocityX(-this.velocity);
        }
        else if (cursors.right.isDown){
            this.body.setVelocityX(this.velocity);
        }
        if (cursors.up.isDown){
            this.body.setVelocityY(-this.velocity);
        }
        else if (cursors.down.isDown){
            this.body.setVelocityY(this.velocity);
        }
    }

}