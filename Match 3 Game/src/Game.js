const { init, GameLoop, Sprite, initPointer, track } = kontra;


export default class Game {
    constructor(width, height){
        this.width = width;
        this.height = height;

        this.init();
    }

    init(){
        //Initialize Kontra
        console.log('Initializing Game');
        const { canvas, context } = init();
        this.canvas = canvas;
        this.context = context;

        initPointer();

        //Create game loop
        this.GameLoop = GameLoop({
            update: this.update.bind(this),
            render: this.render.bind(this)
        });

        //Load Assets
        this.load();
    }
    
    render(){
        //Render sprites with Kontra
    }

    update(){
        //Update Sprites
    }

    load(){
        //Load Game Assets
        console.log('Loading Assets for Game');

        //Start Game
        this.start();
    }
    start(){
        //Start Game loop
        console.log('Starting Game');
        this.GameLoop.start();
    }
}