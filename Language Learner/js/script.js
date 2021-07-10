let question = {
    title: 'Whats my fav animal?',
    alternatives: ['dog','cat','bird','fish'],
    correctAnswer: 0
}
let app = {
    start: function(){
        alts.forEach(function(element,index){
            element.addEventListener('click', function(){
                //Check correct answer
                //if (q.correctAnswer == index){
                    console.log('Correct Answer!');
                //}
                //else {
                //    console.log('Wrong Answer!');
                //}
            })
        });
    
        this.showQuestion(question);
    },

    showQuestion: function(q){
        titleDiv.textContent = q.title;
        alts.forEach(function(element,index){
            element.textContent = q.alternatives[index];
        });
    }
}

let alts = document.querySelectorAll('.alternative');
let titleDiv = document.getElementById('title');

let btn = document.getElementById('btn');

btn.addEventListener('click', function(){
    console.log('Clicked!');
})

app.start();