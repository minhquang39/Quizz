import questions from "./script.js";

var currentQuestion = 0;
var count = 0;

const submitBtn = document.querySelector(".submit");
const question = document.querySelector(".question");
const currentNumber = document.querySelector(".current");

const answerForm = document.querySelector(".answers");
const answers = Array.from(document.querySelectorAll("label"));
const progressTrack = document.querySelector(".progress_track");

function renderQuestion() {
  currentNumber.innerText = currentQuestion + 1;
  progressTrack.style.width = parseInt(currentNumber.innerText) * 10 + "%";
  question.innerText = questions[currentQuestion].question;
  answers[0].innerText = questions[currentQuestion].A;
  answers[1].innerText = questions[currentQuestion].B;
  answers[2].innerText = questions[currentQuestion].C;
  answers[3].innerText = questions[currentQuestion].D;
}

function getTrueQuestion(index) {
  return questions[index].correct;
}

function showResult() {
  // answerForm.innerHTML = "";
  answerForm.style.display = "none";
  question.innerHTML = `Bạn đã làm đúng ${count} câu. Xin chúc mừng!`;
}

function resetQuiz() {
  currentQuestion = 0;
  count = 0;
  answerForm.style.display = "block";
  renderQuestion();
}

function handleSubmit() {
  const checked = document.querySelectorAll("input[type='radio']:checked");
  if (checked.length == 0 || checked.length > 1) {
    alert("check once please");
    checked.forEach((check) => {
      check.checked = false;
    });
  } else {
    const chooseAnswer = checked[0].getAttribute("id");
    if (chooseAnswer === getTrueQuestion(currentQuestion)) {
      count++;
    }
    currentQuestion++;
    if (currentQuestion >= questions.length) {
      showResult();
      setTimeout(() => {
        resetQuiz();
      }, 3000);
    } else {
      renderQuestion();
    }
    checked.forEach((check) => {
      check.checked = false;
    });
  }
}

submitBtn.onclick = function (e) {
  handleSubmit();
  console.log(count);
};

renderQuestion();
