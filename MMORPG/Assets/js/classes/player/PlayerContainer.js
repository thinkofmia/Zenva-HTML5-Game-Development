class PlayerContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, frame){
        super(scene,x,y);
        this.scene = scene;
        this.velocity = 160;

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