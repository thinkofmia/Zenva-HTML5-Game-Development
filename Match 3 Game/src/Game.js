import Grid from './Grid.js';

const { init, GameLoop, Sprite, initPointer, track } = kontra;

export default class Game {
    constructor(width, height){
        this.width = width;
        this.height = height;

        this.numberOfCols = 8;
        this.numberOfRows = 8;
        this.blockSize = 35;

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

        //Create Grid
        this.createGrid();

        //Load Assets
        this.load();
    }
    
    render(){
        //Render sprites with Kontra
        this.grid.render();
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
    createGrid(){
        this.grid = new Grid({
            numberOfRows: this.numberOfRows,
            numberOfCols: this.numberOfCols,
            cellSize: this.blockSize + 4,
            x: 25,
            y: 180,
            color: 'lavender',
        });
    }
}