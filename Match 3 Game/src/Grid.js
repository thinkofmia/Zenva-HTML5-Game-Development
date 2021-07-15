const { Sprite } = kontra;

export default class Grid {
    constructor(config){
        this.numberOfRows = config.numberOfRows;
        this.numberOfCols = config.numberOfCols;
        this.cellSize = config.cellSize;
        this.color = config.color;
        this.x = config.x;
        this.y = config.y;

        this.height = this.numberOfRows * this.cellSize;
        this.width = this.numberOfCols * this.cellSize;

        this.backgroundSprite = null;

        this.init();
    }

    init(){
        this.backgroundSprite = Sprite({
            x: this.x,
            y: this.y,
            color: 'grey',
            width: this.width,
            height: this.height,
        });
    }

    render(){
        if (this.backgroundSprite){
            this.backgroundSprite.render();
        }
    }
}