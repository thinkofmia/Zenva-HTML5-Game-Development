import Grid from './Grid.js';
import Board from './Board.js';
import Block from './Block.js';

const { init, GameLoop, Sprite, initPointer, track, load, on, Pool } = kontra;

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

        //Create board
        this.createBoard();

        //Load Assets
        this.load();
    }
    
    render(){
        //Render sprites with Kontra
        this.grid.render();

        if (this.blockPool){
            this.blockPool.getAliveObjects().forEach((block)=>{
                if (block.selected){
                    block.context.globalAlpha = 0.6;
                }
                else {
                    block.context.globalAlpha = 1;
                }
                block.render();
                block.context.globalAlpha = 1;
            });
        }
    }

    update(){
        //Update Sprites
        if (this.blockPool){
            this.blockPool.update();
        }
    }

    load(){
        //Load Game Assets
        console.log('Loading Assets for Game');

        on('assetLoaded', (asset, url)=>{
            asset.id = url;
        });

        load(
            'assets/images/bean_blue.png',
            'assets/images/bean_green.png',
            'assets/images/bean_orange.png',
            'assets/images/bean_pink.png',
            'assets/images/bean_purple.png',
            'assets/images/bean_red.png',
            'assets/images/bean_yellow.png',
            'assets/images/bean_white.png',
            'assets/images/bean_dead.png',
        ).then((assets)=>{
            this.assets = assets;
            
            //Start Game
            this.start();
            console.log(this.assets);
        }).catch((error)=>{
            console.log(error);
        });

    }
    start(){
        //Start Game loop
        console.log('Starting Game');
        this.GameLoop.start();
        this.drawBoard();
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

    createBoard(){
        this.board = new Board(
            this,
            this.numberOfRows,
            this.numberOfCols,
            6,
            false,
        )

        //window.board = this.board;

        this.blockPool = Pool({
            create: ()=>{
                return new Block();
            },
        });
    }

    drawBoard(){
        for (let i=0;i<this.numberOfRows;i++){
            for (let j=0;j<this.numberOfCols;j++){
                const x = 28 + j * (this.blockSize + 4);
                const y = 183 + i*(this.blockSize + 4);

                const block = this.blockPool.get({
                   x,
                   y,
                   row: i,
                   col: j,
                   image: this.assets[this.board.grid[i][j]],
                   ttl: Infinity, 
                });

                block.onDown = () =>{
                    this.pickBlock(block);
                };
                track(block);
            }
        };
    }

    pickBlock(block){
        if (this.isBoardBlocked){
            return;
        }

        //If this is the first block picked
        if (!this.selectedBlock){
            block.selected = true;
            this.selectedBlock = block;
        }
        else {
            //2nd Block selected is target
            this.targetBlock = block;

            if(this.board.checkAdjacent(this.selectedBlock, this.targetBlock)){
                this.isBoardBlocked = true;

                this.swapBlocks(this.selectedBlock, this.targetBlock);
            }
            else {
                this.clearSelection();
            }
        }
    }

    swapBlocks(block1, block2){
        //console.log(block1, block2);
        //Swap locatioon of 2 blocks
        const tempX = block1.x;
        const tempY = block1.y;
        block1.x = block2.x;
        block1.y = block2.y;
        block2.x = tempX;
        block2.y = tempY;

        this.board.swap(block1,block2);

        if (!this.isReversingSwap){
            //Check chains
            const chains = this.board.findAllChains();
            if (chains.length>0){
                this.updateBoard();
            }
            else {
                this.isReversingSwap = true;
                this.swapBlocks(block1,block2);
            }
        }
        else {
            this.isReversingSwap = false;
            this.clearSelection();
        }
        
    }

    clearSelection(){
        this.isBoardBlocked = false;
        this.selectedBlock.selected =false;
        this.selectedBlock =null;
    }

    updateBoard(){
        this.board.clearChains();
        this.board.updateGrid();

        const chains = this.board.findAllChains();

        if (chains.length>0){
            this.updateBoard();
        }
        else {
            this.clearSelection();
        }
    }

    getBlockFromColRow(position){
        let foundBlock;

        this.blockPool.getAliveObjects().forEach((block) =>{
            if (block.row === position.row && block.col === position.col){
                foundBlock = block;
                return true;
            }
            return false;
        });

        return foundBlock;
    }

    dropBlock(sourceRow, targetRow, col) {
        const block = this.getBlockFromColRow({col, row: sourceRow});
        const targetY = 183 + targetRow * (this.blockSize +4);
        block.row = targetRow;
        block.y = targetY;
    }

    dropReserveBlock(sourceRow, targetRow, col) {

    }

}