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

    swap(source, target){
        const temp = this.grid[target.row][target.col];
        this.grid[target.row][target.col] = this.grid[source.row][source.col];
        this.grid[source.row][source.col] = temp;

        const tempPos = {
            row: source.row,
            col: source.col,
        };
        source.row = target.row;
        source.col = target.col;
        target.row = tempPos.row;
        target.col = tempPos.col;

        this.consoleLog();
    }

    checkAdjacent(source,target){
        const diffRow = Math.abs(source.row - target.row);
        const diffCol = Math.abs(source.col - target.col);
        const isAdjacent = (diffRow === 1 && diffCol === 0) || (diffCol === 1 && diffRow === 0)
        return isAdjacent;
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