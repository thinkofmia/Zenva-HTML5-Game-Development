export default class Board{
    constructor(rows, cols, blockVariations, debug = false){
        this.rows = rows;
        this.cols = cols;
        this.blockVariations = blockVariations;
        this.debug = debug;

        this.grid = [];

        for (let i=0;i<rows;i++){
            for (let j=0;j<cols;j++){
                this.grid.push([]);
            }
        };

        console.log(this.grid);
    }
}