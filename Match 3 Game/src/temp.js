/*
import { test } from './Game.js';

console.log(test);
*/
const { init, GameLoop, Sprite, initPointer, track } = kontra;

const { canvas, context } = init();
initPointer(); //Call interaction

let sprite = null;
const blockImage = new Image();
blockImage.src = 'assets/images/bean_blue.png';
blockImage.onload = () => {
    sprite = Sprite({
        x: 200,
        y: 200,
    //    color: 'blue',
    //    width: 50,
    //    height: 20,
    //    dx: 2,
        image: blockImage,
        onDown: () => {
            console.log('Down');
        },
        onUp: () => {
            console.log('Up');
        },
        onOver: () => {
            console.log('Over');
        },
    });

    
    track(sprite);
};


console.log(sprite);

const loop = GameLoop({
    update: ()=>{
        if (sprite){
            sprite.update();
/*
            if (sprite.x>canvas.width){
                sprite.x = -sprite.width;
            }*/
        }
    },
    render: ()=>{
        if (sprite){
            sprite.render();
        }
    } 
});

loop.start();