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
            //Printe reserve grid
            let prettyString = '';
            for (let i=0;i<this.rows;i++){
                prettyString += "\n";
                for (let j=0;j<this.cols;j++){
                    prettyString += " " +this.reserveGrid[i][j];
                }
            };

            //Separate grids
            prettyString += '\n';
            for (let j=0;j< this.cols;j++){
                prettyString += ' -';
            }

            //Print Main Grid
            for (let i=0;i<this.rows;i++){
                prettyString += "\n";
                for (let j=0;j<this.cols;j++){
                    prettyString += " " +this.grid[i][j];
                }
            };

            console.log(prettyString);
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