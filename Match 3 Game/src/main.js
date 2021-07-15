/*
import { test } from './Game.js';

console.log(test);
*/
const { init, GameLoop, Sprite } = kontra;

const { canvas, context } = init();

const blockImage = new Image();
blockImage.src = 'assets/images/bean_blue.png';

const sprite = Sprite({
    x: 200,
    y: 200,
    color: 'blue',
//    width: 50,
//    height: 20,
    dx: 2,
    image: blockImage
});

console.log(sprite);

const loop = GameLoop({
    update: ()=>{
        sprite.update();

        if (sprite.x>canvas.width){
            sprite.x = -sprite.width;
        }
    },
    render: ()=>{
        sprite.render();
    } 
});

loop.start();