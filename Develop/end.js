const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore'); // Remove the #

const highScores = JSON.parse(localStorage.getItem('highScores')) || []; // Make sure it's 'highScores' instead of 'highscores'


username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value;
});

const saveHighScore = (e) => {
  e.preventDefault();
  const score = {
    score: mostRecentScore,
    name: username.value,
  };
  highScores.push(score);

  highScores.sort((a, b) => {
    return b.score - a.score;
  });
  highScores.splice(5);

  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.assign('/');
};
saveScoreBtn.addEventListener('click', saveHighScore);