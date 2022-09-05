function Quiz(questions) {
  this.score = 0;
  this.questions = questions.map((question) => new Question(question));
  this.questionIndex = 0;
}

function Question(question) {
  this.questionNo = question.questionNo;
  this.questionText = question.questionText;
  this.answer = question.answer;
  this.choices = question.options;
}

Question.prototype.isCorrectAnswer = function (userAnswer) {
  return this.answer === userAnswer;
};

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length;
};

Quiz.prototype.getQuestionByIndex = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.checkOptionWithAnswer = function (answer) {
  if (this.getQuestionByIndex().answer === answer) {
    this.score++;
  }
  this.questionIndex++;
};

function getNumberFromText(inputText) {
  let numRegex = /(\d+)/g;
  const number = numRegex.exec(inputText);
  return parseInt(number[0]);
}

function loadOptions(options) {
  var choiceElements = document.getElementsByTagName("span");
  const choiceArray = Array.from(choiceElements);

  choiceArray.forEach((choiceElement) => {
    var id_attr = choiceElement.getAttribute("id");
    choiceElement.innerText = options[getNumberFromText(id_attr)];
  });
}

function loadQuestions() {
  if (!quiz.isEnded()) {
    var questionElement = document.getElementById("question");
    let question = quiz.getQuestionByIndex();
    questionElement.innerText = `${question.questionNo}. ${question.questionText}`;
    loadOptions(question.choices);
    showProgress();
  } else {
    showScore();
  }
}

function handleOnClick() {
  const btnArray = Array.from(document.getElementsByTagName("button"));
  btnArray.forEach((btn) => {
    btn.onclick = function () {
      quiz.checkOptionWithAnswer(btn.innerText);
      loadQuestions();
    };
  });
}

function showScore() {
  var quizElement = document.getElementById("quiz");

  var result = `<h1>Result</h1><div class="score"><h2>Your Score is : ${
    quiz.score
  }</h2><h2>Percentile Score : ${(
    (quiz.score * 100) /
    quiz.questions.length
  ).toFixed(2)}%</h2></div>`;

  quizElement.innerHTML = result;
}

function showProgress() {
  const progress_element = document.getElementById("progress");
  progress_element.innerText = `Question ${quiz.questionIndex + 1} of ${
    quiz.questions.length
  }`;
}

let questions = [
  {
    questionNo: 1,
    questionText: "Javascript is an _______ language?",
    options: ["Compiled", "Interpreted", "Both A and B", "None of the above"],
    answer: "Interpreted",
  },
  {
    questionNo: 2,
    questionText:
      "Which of the following keywords is used to define a variable in Javascript?",
    options: ["var", "let", "Both A and B", "None of the above"],
    answer: "Both A and B",
  },
  {
    questionNo: 3,
    questionText: "How can a datatype be declared to be a constant type?",
    options: ["constant", "var", "const", "let"],
    answer: "const",
  },
  {
    questionNo: 4,
    questionText: "Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<scripting>", "<javascript>", "<script>"],
    answer: "<script>",
  },
  {
    questionNo: 5,
    questionText: "How to stop an interval timer in Javascript?",
    options: [
      "clearInterval",
      "clearTimer",
      "intervalOver",
      "None of the above",
    ],
    answer: "clearInterval",
  },
  {
    questionNo: 6,
    questionText: "Which type of JavaScript language is ___",
    options: [
      "Object-Oriented",
      "Object-Based",
      "Assembly-language",
      "High-level",
    ],
    answer: "Object-Based",
  },
];

var quiz;
function initialise() {
  quiz = new Quiz(questions);
  loadQuestions();
  handleOnClick();
}
