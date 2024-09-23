const questions = [
    {
        question: "What is the smallest header in HTML by default?",
        answers: [
            {text: "h1", correct: false},
            {text: "h6", correct: true},
            {text: "h2", correct: false},
            {text: "h5", correct: false},
        ]
    },

    {
        question: "What is the select tag used for?",
        answers: [
            {text: "Create a combo box.", correct: true},
            {text: "Select some attribute", correct: false},
            {text: "Change text font", correct: false},
            {text: "None of above", correct: false},
        ]
    },

    {
        question: "What tag is used to render an image on a webpage?",
        answers: [
            {text: "img", correct: true},
            {text: "src", correct: false},
            {text: "image", correct: false},
            {text: "a", correct: false},
        ]
    },

    {
        question: "Which attribute is used to provide a unique name to an HTML element?",
        answers: [
            {text: "id", correct: true},
            {text: "class", correct: false},
            {text: "image", correct: false},
            {text: "type", correct: false},
        ]
    },

    {
        question: "Which HTML element is used to define description data?",
        answers: [
            {text: "li", correct: false},
            {text: "ol", correct: false},
            {text: "dd", correct: true},
            {text: "dl", correct: false},
        ]
    },

    {
        question: "Which of the following are examples of block-level elements in HTML?",
        answers: [
            {text: "div", correct: false},
            {text: "p", correct: false},
            {text: "h1", correct: false},
            {text: "All of the above", correct: true},
        ]
    },

    {
        question: "Colors are defined in HTML using?",
        answers: [
            {text: "RGB Values", correct: false},
            {text: "HEX Values", correct: false},
            {text: "RGBA Values", correct: false},
            {text: "All of above", correct: true},
        ]
    },

    {
        question: "How many sizes of headers are available in HTML by default?",
        answers: [
            {text: "5", correct: false},
            {text: "3", correct: false},
            {text: "6", correct: true},
            {text: "7", correct: false},
        ]
    },

    {
        question: "HTML files are saved by default with the extension?",
        answers: [
            {text: ".html", correct: true},
            {text: ".h", correct: false},
            {text: ".ht", correct: false},
            {text: ".ml", correct: false},
        ]
    },

    {
        question: "The CSS inside HTML elements used alongside style attribute is called?",
        answers: [
            {text: "Inline CSS", correct: true},
            {text: "Internal CSS", correct: false},
            {text: "External CSS", correct: false},
            {text: "None of above", correct: false},
        ]
    },

]


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const progress = document.getElementById("perentage-container");
const circular_progress = document.getElementById("circular-progress");
const progressValue = document.getElementById("progress-value");
const header = document.getElementById("header");

let currentQuestionIndex = 0;
let score = 0;

function startQuize(){
    currentQuestionIndex = 0
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });  
}

function resetState() {
    nextButton.style.display = "none";
    progress.style.display = "none";
    header.innerHTML = "HTML QUIZ"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }   
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";    
}

function showScore() {
    resetState();
    header.innerHTML = "Quiz Result..."
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!!!!`;
    questionElement.style.textAlign = "center";
    progress.style.display = "block";

    let progressStartvalue = -1;
    // let Endvalue = (score*100)/questions.length;
    // let progressEndvalue = 10* score;
    let progressEndvalue = (score/questions.length)*100;
    let speed = 20;

    let progres = setInterval(() => {
        progressStartvalue++;
        progressValue.textContent = `${progressStartvalue}%`;
        circular_progress.style.background = `conic-gradient(navy ${progressStartvalue * 3.6}deg, rgba(143, 2, 2, 0.1)0deg)` ;
        if (progressStartvalue == progressEndvalue){            
            clearInterval(progres);
        }
        
    }, speed);
    nextButton.innerHTML = "Play Again"; 
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();

    }
}

nextButton.addEventListener("click", ()=> { 
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuize();
    }

});

startQuize();

