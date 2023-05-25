const questionElement = document.querySelector('#question');
const choiceElements = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

// Timer for game
let timer;
let totalTime = 60;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  startTimer();
  getNewQuestion();
};

const startTimer = () => {
  timer = setInterval(() => {
    totalTime--;
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    timerElement.innerText = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (totalTime === 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
};

// When timer reaches 0
const handleTimeout = () => {
  getNewQuestion();
};

// Get a new question
const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('/end.html');
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  questionElement.innerText = currentQuestion.question;

  choiceElements.forEach((choice, index) => {
    const choiceNumber = index + 1;
    choice.innerText = currentQuestion['choice' + choiceNumber];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

let questions = [
  {
    question: '1. What are the four Hogwarts houses?',
    choice1: 'Ravenclaw, Gryffins, Salazar and Hermione',
    choice2: 'Gryffindor, Ravenclaw, Slytherin, and Hufflepuff.',
    choice3: 'IIvermorny, Hogwarts, Mahouotokoro and Blacks',
    choice4: 'Wampus, Horned Serpent, Thunderbird and Pukwudgie',
    answer: 2,
  },    
]
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame();