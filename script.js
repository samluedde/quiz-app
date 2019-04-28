'use strict'

let questionNum = 1;

let rightAnswers = 0;

function goQuizGo() {
  startQuiz();
  submitAnswer();
  nextButton();
  restartQuiz();
}
function startQuiz() {
  $('#start').click(function(event) {
    nextQuestion();
  });
}
function renderQuestions(rightAnswers, quiz, answered) {
  return`
    <section id="quiz-questions" role="main">
    <h2 id="question">${quiz.text}</h2>
    <form>
      <fieldset>
      <label>
          <input class="answer" type="radio"
          name="answer" checked></input>
          <span> ${quiz.ans1}</span> 
        </label>
        <label>
          <input class="answer" type="radio" 
          name="answer"></input>
          <span>${quiz.ans2}</span>
        </label>
        <label>
          <input class="answer" type="radio" name="answer"
          ></input>
          <span>${quiz.ans3}</span>
        </label>
        <label>
          <input class="answer" type="radio" name="answer"></input>
          <span>${quiz.ans4}</span>
        </label>
      </fieldset>  
      <button id="submit-button"><span>Submit</span></button>
    </form>
    <div id="so-far">
      <span id="question-on">Question:     ${quiz.num}/10</span>
      <span id="score-bar">Score: ${rightAnswers}/${answered}</span>
    </div>
  </section>
  `;
}
function submitAnswer() {
  $('#quiz-container').on('click', '#submit-button', function(event) {
    event.preventDefault()
  const answer = $('input:checked').siblings('span');
    const ifCorrect = checkAnswer(answer);
    if(ifCorrect) {
      renderCorrectResults();
    }else{
      renderFalseResults();
      }
});
}

 
function nextButton() {
  $('#quiz-container').on('click', '#next-button', function(event) {
      if(questionNum === 10) {
      results(rightAnswers);
    } else {
      incrementQuestionNumber();
      nextQuestion();
  }
  });
}
function restartQuiz() {
  $('#quiz-container').on('click', '#playAgain-button', function(event) {
    questionNum = 1;
    rightAnswers = 0;
    nextQuestion();
  });
}

function nextQuestion() {
  const question = questionBank[questionNum - 1];
  const answered = questionNum - 1;
  $('#quiz-container').html(renderQuestions(rightAnswers, question, answered));
}
function checkAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}
function renderCorrectResults() {
  $('#quiz-container').html(correctResults);
  incrementRightAnswers();
}
function correctResults() {
  return`
  <section class="results-page" role="main">
  <h2>Great Job Ally!
   Your answer:
   <div>"${ANSWERS[questionNum - 1]}"<div>
   <div>was correct!</div?</h2>
   <div>
   <img class='ally' src="http://media1.giphy.com/media/S3bfBC8O3QI48/giphy.gif" alt="Congratulatory image designating you recieved the correct answer ">
   <div>
   <button id="next-button"><span>Next</span></button>
   </section>
`;
}
function renderFalseResults() {
  $('#quiz-container').html(falseResults(questionNum));
}
function falseResults(questionNum) {
  return `
    <section class="results-page" role="main">
      <h2>Sorry, the correct answer was:
      <div> "${ANSWERS[questionNum - 1]}"</h2></div>
      <img class='incorrect' src="https://www.glsen.org/sites/default/files/Gender%20Terminology%20Visual.png" alt="Diagram explaining gender terminology">
      <button id="next-button"><span>Next</span></button>
    </section>
`;
}
function incrementQuestionNumber() {
  questionNum++;
}
function incrementRightAnswers() {
  rightAnswers++;
}
function results(rightAnswers) {
  $('#quiz-container').html(`
    <section id="last-page">
      <h2>You got: ${rightAnswers}  out of 10 correct!</h2>
      <div class= "resources">
      <h3>For further resources check out these links:</h3>
      <span><a href="https://www.glsen.org/"target="_blank">Gay, Lesbian & Straight Education Network</a></span>
      <span><a href="https://transequality.org/"target="_blank">National Center for Transgender Equality</a></span>
      <span><a href="https://www.glaad.org/transgender/resources"target="_blank">Gay & Lesbian Alliance Against Defamation(Transgender Resources)</a></span>
      <span><a href= "https://transgenderlawcenter.org/"target="_blank">Transgender Law Center</a></span>
      </div>
      <button id="playAgain-button">Play Again?</button>
    </section>
  `);
}
goQuizGo();