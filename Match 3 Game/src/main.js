/*
import { test } from './Game.js';

console.log(test);
*/
const { init, GameLoop, Sprite } = kontra;

const { canvas, context } = init();

const sprite = Sprite({
    x: 200,
    y: 200,
    color: 'blue',
    width: 50,
    height: 20
});

console.log(sprite);

const loop = GameLoop({
    update: ()=>{
        //console.log('Update');
    },
    render: ()=>{
        sprite.render();
        //console.log('Render');
    } 
});

loop.start();