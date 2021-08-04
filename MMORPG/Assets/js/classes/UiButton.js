class UiButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, hoverKey, text, targetCallback){
        super(scene,x,y);
        this.x = x;
        this.y =y;
        this.scene = scene;
        this.key = key;
        this.hoverKey = hoverKey;
        this.text = text;
        this.targetCallback = targetCallback;   

        //Create UI
        this.createButton();
        //Add container
        this.scene.add.existing(this);
    }

    createButton(){
    //Create button
    this.button = this.scene.add.image(0,0,'button1');
    this.button.setInteractive();
    this.button.setScale(1.4);

    //Create button text
    this.buttonText = this.scene.add.text(0,0,this.text, {fontSize: '26px', fill: '#fff'});
    //Center button text in UI button
    Phaser.Display.Align.In.Center(this.buttonText,this.button);

    //Add two objs to container
    this.add(this.button);
    this.add(this.buttonText);

    //Listen for events
    this.button.on('pointerdown', ()=>{
        this.targetCallback();
    });

    this.button.on('pointerover', ()=>{
        this.button.setTexture(this.hoverKey);
    });

    this.button.on('pointerout', ()=>{
        this.button.setTexture(this.key);
    });
    }
}
