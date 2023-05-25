const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const backButton = document.querySelector('#backButton');


highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join('');

backButton.addEventListener('click', () => {
    console.log('button clicked');
    window.location.assign('./index.html');
});