const questionElement = document.querySelector('#question');
const choiceElements = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timerElement = document.querySelector("#timerValue");


let timer;
let totalTime = 60;
let questionCounter = 0;
let score = 0;
let availableQuestions = [];
let currentQuestion = {};
let acceptingAnswers = false;

//timer for game
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
    return window.location.assign('./end.html');
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

// Event listener for question click
const handleQuestionClick = (event) => {
  if (acceptingAnswers) {
    const selectedChoice = event.target;
    const selectedAnswer = parseInt(selectedChoice.getAttribute('data-number'));

    // Perform necessary actions when the question is clicked
    // For example, you can check if the selectedAnswer is correct
    if (selectedAnswer === currentQuestion.answer) {
      incrementScore(SCORE_POINTS);
    }

    acceptingAnswers = false;
    setTimeout(getNewQuestion, 1000); // Delay before loading the next question
  }
};

// Add event listener to question element
choiceElements.forEach((choice) => {
choice.addEventListener('click', handleQuestionClick);
});


let questions = [
  {
    question: 'What are the four Hogwarts houses?',
    choice1: 'Ravenclaw, Gryffins, Salazar and Hermione',
    choice2: 'Gryffindor, Ravenclaw, Slytherin, and Hufflepuff.',
    choice3: 'IIvermorny, Hogwarts, Mahouotokoro and Blacks',
    choice4: 'Wampus, Horned Serpent, Thunderbird and Pukwudgie',
    answer: 2,
    },
        {
        question: 'What is Lord Voldemorts full, real name?',
        choice1: 'Tom Gaunt Jr.',
        choice2: 'Thomas Riddle Sr.',
        choice3: 'Tom Marvolo Riddle',
        choice4: 'Harry James Potter',
        answer: 3,
    },
      {
        question: 'Where in Kings Cross Station does the Hogwarts Express stop?',
        choice1: 'Hogsmead',
        choice2: 'Hogwarts',
        choice3: 'Platform 13',
        choice4: 'Platform 9 and ¾.',
        answer: 4,
    },  
    {
        question: 'In Book 4, which two teams compete for the Quidditch World Cup?',
        choice1: 'Ireland and America',
        choice2: 'France and Russia',
        choice3: 'Bulgaria and Ireland.',
        choice4: 'Scotland and Ireland',
        answer: 3,
    },  
    {
        question: 'Name the six subjects every Hogwarts student is required to study during their first two years of school.',
        choice1: 'Astronomy, Charms, Defense Against the Dark Arts, Herbology, History of Magic, Potions, and Transfiguration.',
        choice2: 'Charms, Herbology, Care of Magical Creatures, Secret of the Dark Arts, Flying and Potions',
        choice3: 'Teleportation, Legilimens, Quidditch, Herbology, Spell Casting and Flying',
        choice4: 'Magical Elixers, Charms, Astronomy, Flying, History of Magic and Potions',
        answer: 1,
    },  
    {
        question: 'Who is Harry Potters godfather?',
        choice1: 'Severus Snape',
        choice2: 'James Potter',
        choice3: 'Albus Dumbledore',
        choice4: 'Sirius Black',
        answer: 4,
    },  
    {
        question: 'Where was Harry Potter born?',
        choice1: 'Hogwarts',
        choice2: 'Privet Drive',
        choice3: ' Godrics Hollow',
        choice4: 'Diagon Alley',
        answer: 3,
    }, 
     {
        question: 'In Book 7, what three Ministry of Magic employees do Ron, Harry, and Hermione impersonate?',
        choice1: 'Severus Snape, Voldemort and Dolorus Umbridge',
        choice2: 'Mafalda Hopkirk, Reginald Cattermole and Albert Runcorn.',
        choice3: 'Albus Dumbledore, Regulus Black and Bellatrix Lestrange',
        choice4: 'Sirius Black, Argus Filch and Dobby',
        answer: 2,
    }, 
     {
        question: 'What spell does Harry discover written in the Half-Blood Prince’s potions textbook in Book 6, and who invented it?',
        choice1: 'Amortenia. Tom Riddle',
        choice2: 'Sectumsempra, Sirus Black',
        choice3: 'Sectumsempra, Severus Snape.',
        choice4: 'Felix Felicis, Proffesor Slughorn',
        answer: 3,
    }, 
    {
        question: 'What do the abbreviations for the two main wizarding exams, O.W.L.s and N.E.W.T.s, stand for?',
        choice1: 'Ordinary Wizarding Level and Nastily Exhausting Wizarding Test.',
        choice2: 'Outstanding Wizards Level and Neville Examination Wizarding Tests',
        choice3: 'It does not stand for anything',
        choice4: 'Only Witches Levels and Next Element Wizards Test',
        answer: 1,
    },
  ]
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame();