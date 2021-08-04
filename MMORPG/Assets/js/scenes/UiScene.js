class UiScene extends Phaser.Scene{
    constructor() {
        super('Ui');
    }

    init(){
        //Grab reference to game scene
        this.gameScene = this.scene.get('Game');
    }

    create() {
        this.setupUiElements();
        this.setupEvents();
    }

    setupUiElements(){
        //Create score text game obj
        this.scoreText= this.add.text(35,8, 'Coins: 0', {
            fontSize:'16px',
            fill: '#fff',
        });
        this.coinIcon = this.add.image(15,15,'items',3);
    }

    setupEvents(){
        //Listen
        this.gameScene.events.on('updateScore', (score)=>{
            this.scoreText.setText(`Coins: ${score}`);
        });
    }
}
