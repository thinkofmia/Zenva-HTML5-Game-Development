/*
import { test } from './Game.js';

console.log(test);
*/
const { init, GameLoop } = kontra;

const { canvas, context } = init();

const loop = GameLoop({
    update: ()=>{
        //console.log('Update');
    },
    render: ()=>{
        //console.log('Render');
    } 
});

loop.start();