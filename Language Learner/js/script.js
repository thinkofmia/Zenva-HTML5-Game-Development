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
    })
}

showQuestion(question);