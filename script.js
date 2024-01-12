const question = [
    {
        question: "What does CPU stand for in computing?",
        answers: [
            { text: "Central Processing Unit", correct: true },
            { text: "Central Peripheral Unit", correct: false },
            { text: "Computer Personal Unit", correct: false },
            { text: "Central Processor Unit", correct: false },
        ]
    },
    {
        question :  "What is the capital city of Australia?" ,
        answers : [
            { text : "Sydney", correct: false},
            { text : "   Melbourne", correct: false},
            { text : " Canberra", correct: true},
            { text : "Brisbane", correct: false},
        ]
    },
    {
        question :  "Which element has the chemical symbol O?" ,
        answers : [
            { text : "Oxygen", correct: true},
            { text : "Gold", correct: false},
            { text : " Iron", correct: false},
            { text : "Uranium", correct: false},
        ]
    },
    {
        question :  "Which is the longest river in the world?" ,
        answers : [
            { text : " Nile ", correct: false},
            { text : " Amazon", correct:true},
            { text : "Yangtze", correct: false},
            { text : "Mississippi", correct: false},
        ]
    },
    {question :  "In which year did Christopher Columbus first reach the Americas?" ,
    answers : [
        { text : "1492 ", correct: true},
        { text : "1607", correct: false},
        { text : "1776", correct: false},
        { text : "1812", correct: false},
    ]
    },
    {
        question :  "Which country won the FIFA World Cup in 2018?" ,
        answers : [
            { text : "Germany ", correct: false},
            { text : " Argentina", correct: false},
            { text : "France", correct: true},
            { text : " Brazil", correct: false},
        ]
    }

];

const questionElement = document.getElementById("question");
const answersButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const playAgainButton = document.getElementById("play-again-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "block";
    playAgainButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = question[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => checkAnswer(answer.correct));
        answersButtons.appendChild(button);
    });
}

function checkAnswer(isCorrect) {
    const buttons = answersButtons.children;

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const answer = question[currentQuestionIndex].answers[i];

        if (answer.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }

        button.disabled = true; // Disable buttons after an answer is selected
    }

    if (isCorrect) {
        score++;
    }

    if (currentQuestionIndex < question.length - 1) {
        currentQuestionIndex++;
        setTimeout(() => {
            showQuestion();
        }, 1000); // Delay to show the correct/incorrect feedback
    } else {
        setTimeout(() => {
            endQuiz();
        }, 1000); // Delay to show the correct/incorrect feedback
    }
}


function endQuiz() {
    questionElement.innerHTML = `Your score: ${score} out of ${question.length}`;
    nextButton.style.display = "none";
    playAgainButton.style.display = "block";
    resetState();
}

function resetState() {
    while (answersButtons.firstChild) {
        answersButtons.removeChild(answersButtons.firstChild);
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function playAgain() {
    startQuiz();
}

startQuiz();
