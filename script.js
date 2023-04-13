const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const timerElement = document.getElementById("timer");
const score = document.getElementById("final-score");
const yourScore = document.getElementById("your-score");
const ctx = document.getElementById("myChart").getContext("2d");
const nameField = document.querySelector('#name');
const idField = document.querySelector('#id');
const inputDiv = document.getElementById("input-div");



let shuffledQuestions, currentQuestionIndex;
let timeLeft = 100; // or any other starting value
let timerInterval,
  finalMarks,
  marks = 0,
  totalMarks = 10;



  

// startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", function() {
  

  if (nameField.value.trim() === '' || idField.value.trim() === '') {
    score.textContent='Enter Your name and id to start the quiz.'
    return;
  }

  startQuiz()
 
});
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

let timerStarted = false;

function startTimer(duration, display) {
  if (!timerStarted) {
    let timer = duration,
      minutes,
      seconds;
    let countdown = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(countdown);
        display.textContent = "Time's up!";
        startButton.disabled = true;
        yourScore.textContent = "Your final score is";
        totalMarks = marks
        finalMarks= finalMarks- totalMarks
// Create a new pie chart
new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Actual Marks", "Total Score"],
    datasets: [
      {
        label: "Marks",
        data: [finalMarks, totalMarks],
        backgroundColor: ["#B7950B", "#873600"],
      },
    ],
  },
});

      }
    }, 1000);

    timerStarted = true;
  }
}


function startQuiz() {

nameField.disabled=true
idField.textContent =`Id:${idField.value}`
idField.disabled=true
  startButton.textContent = "Next";
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
  startTimer(timeLeft, timerElement);

  
}



function setNextQuestion() {
  resetState();
  if (shuffledQuestions.length === 0) {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    yourScore.textContent = "Your final score is " + marks;
    clearInterval(timerInterval);
  } else {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-button");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
  shuffledQuestions.splice(currentQuestionIndex, 1);
}


function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}



function selectAnswer(e) {
  const selectedButton = e.target;
  let correct = selectedButton.dataset.correct;
  if (correct) {
    marks = marks + 1;
    score.textContent = marks;
    finalMarks = totalMarks - marks;
    console.log(finalMarks);
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "The additional return we must expect to recieve for assuming risk?",
    answers: [
      { text: "Par Risk", correct: false },
      { text: "Risk Premium", correct: true },
    ],
  },
  {
    question: 'In finance "working capital" means the same thing as......?',
    answers: [
      { text: "Fixed asset", correct: false },
      { text: "Total asset", correct: true },
      { text: "Current asset", correct: false },
      { text: "Current liabilities", correct: false },
    ],
  },
  {
    question: "Working capital management is managing........?",
    answers: [
      { text: "Long term assets", correct: true },
      { text: "Short term assets", correct: false },
      { text: "Long term liabilities", correct: false },
      { text: "Short term and long term", correct: false },
    ],
  },
  {
    question: 'Capital budgeting is related to ........?',
    answers: [
      { text: "Tangible assets", correct: false },
      { text: "Sort term assets", correct: false },
      { text: "Long term assets", correct: true },
      { text: "Long term assets", correct: false },
    ],
  },
  {
    question: 'What market is where transactions that generate new cash flow for the firm occur?',
    answers: [
      { text: "Secondary market transactions", correct: false },
      { text: "Initial public offering transactions", correct: false },
      { text: "Commodities market transactions", correct: false },
      { text: "Primary market transactions", correct: true },
    ],
  },
  {
    question: "Ratio analysis is one of the financial instrument to assess financial statement?",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
  },
  {
    question: "In finance working capital means the same thing is Total assets?",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
  },
  {
    question: "Financial leverage is the amount of debt used in the capital structure of the firm?",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
  },
  {
    question: "Cost of retained earnings is equal to .......?",
    answers: [
      { text: "Cost of bank loan", correct: false },
      { text: "Cost of debt", correct: false },
      { text: "Cost of term loans", correct: false },
      { text: "Cost of equity", correct: true },
    ],
  },
  {
    question: "The conventional measure of dispersion is .......?",
    answers: [
      { text: "Coefficient of variation", correct: false },
      { text: "The standard deviation", correct: false },
      { text: "The expected return", correct: false },
      { text: "A probability distribution", correct: true },
    ],
  },
];

