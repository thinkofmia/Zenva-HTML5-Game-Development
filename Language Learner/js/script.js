let question = {
    title: 'Whats my fav animal?',
    alternatives: ['dog','cat','bird','fish'],
    correctAnswer: 0
}

let questions = [
    {
        title: 'gato',
        alternatives: ['dog', 'cat', 'bird', 'fish'],
        correctAnswer: 1
    },
    {
        title: 'ave',
        alternatives: ['mouse', 'hamster', 'lizard', 'bird'],
        correctAnswer: 3
    },
    {
        title: 'rata',
        alternatives: ['cat', 'fish', 'rat', 'shark'],
        correctAnswer: 2
    },
    {
        title: 'mosca',
        alternatives: ['fly', 'puma', 'fish', 'dog'],
        correctAnswer: 0
    }
]

let alts = document.querySelectorAll('.alternative');

let app = {
    start: function(){
        alts.forEach(function(element,index){
            element.addEventListener('click', function(){
                this.checkAnswer(index);
            }.bind(this));
        }.bind(this));

        /*alternaative way
        alts.forEach((element, index) => {
                    
            element.addEventListener('click', () => {
                // check correct answer
                this.checkAnswer(index);
            });
            });
        */
    
        this.showQuestion(question);
    },

    showQuestion: function(q){

        this.currQuestion = q;

        titleDiv.textContent = q.title;
        alts.forEach(function(element,index){
            element.textContent = q.alternatives[index];
        });
    },

    checkAnswer: function(userSelected){
        if (this.currQuestion.correctAnswer == userSelected){
            //correct
            console.log("correct!");
        }
        else {
            //wrong
            console.log("wrong!");
        }
    },
}

let titleDiv = document.getElementById('title');

let btn = document.getElementById('btn');

btn.addEventListener('click', function(){
    console.log('Clicked!');
})

app.start();