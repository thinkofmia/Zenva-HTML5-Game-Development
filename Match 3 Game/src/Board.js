export default class Board{
    constructor(rows, cols, blockVariations, debug = false){
        this.rows = rows;
        this.cols = cols;
        this.blockVariations = blockVariations;
        this.debug = debug;

        this.grid = [];
        //Reserve Grid
        this.reserveGrid = [];

        for (let i=0;i<rows;i++){
            for (let j=0;j<cols;j++){
                this.grid.push([]);
                this.reserveGrid.push([]);
            }
        };

        this.populateGrid();
        this.populateReserveGrid();

        this.consoleLog();
    }

    consoleLog(){
        if (this.debug){
            console.log(this.grid);
        }
    }

    populateGrid(){
        for (let i=0;i<this.rows;i++){
            for (let j=0;j<this.cols;j++){
                const variation = Math.floor(Math.random()* this.blockVariations)+1;
                this.grid[i].push(variation);
            }
        };
    }

    populateReserveGrid(){
        for (let i=0;i<this.rows;i++){
            for (let j=0;j<this.cols;j++){
                const variation = Math.floor(Math.random()* this.blockVariations)+1;
                this.reserveGrid[i].push(variation);
            }
        };
    }

}