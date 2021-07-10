let question = {
    title: 'Whats my fav animal?',
    alternatives: ['dog','cat','bird','fish'],
    correctAnswer: 0
}

function showQuestion(q){
    let titleDiv = document.getElementById('title');

    titleDiv.textContent = q.title;

    let alts = document.querySelectorAll('.alternative');

    alts.forEach(function(element,index){
        element.textContent = q.alternatives[index];

        element.addEventListener('click', function(){
            //Check correct answer
            if (q.correctAnswer == index){
                console.log('Correct Answer!');
            }
            else {
                console.log('Wrong Answer!');
            }
        })
    })
}

showQuestion(question);

let btn = document.getElementById('btn');

btn.addEventListener('click', function(){
    console.log('Clicked!');
})