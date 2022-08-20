const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

//Local storarge only save data in key value pair in the string format.
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// max display top 5 results
const MAX_HIGH_SCORES = 5;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    //here if b is above a, put b before a . => has an implicit return so you dont need a return fn
    highScores.sort((a, b) => b.score - a.score);

    // max display top 5 results
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('../');
};