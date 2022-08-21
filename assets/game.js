const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
//const questionCounterText = document.getElementById("questionCounter");
const wrongAns = document.getElementById("wrongAns")
const rightAns = document.getElementById("rightAns")


wrongAns.style.opacity = 0;
rightAns.style.opacity = 0;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];


fetch('questions.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
const CORRECT_BONUS = 10;
// const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0;
    score = 0;
    //... spread out the questions into an array  
    availableQuesions = [...questions];
    // max questions determined based on length of the array 
    MAX_QUESTIONS = availableQuesions.length
    getNewQuestion();
};



getNewQuestion = () => {
    // if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('end.html');
    }
    rightAns.style.opacity = 0;
    wrongAns.style.opacity = 0;
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    //     select random questions 
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    // remove used questions 
    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
    //const classToApply = 'incorrect' ;
    // if (selectedAnswer == currentQuestion.answer) {
    //    classToApply = 'correct';
    //} 
        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            wrongAns.style.opacity = 0;
            rightAns.style.opacity = 1;
            incrementScore(CORRECT_BONUS);
        } else {
            rightAns.style.opacity = 0;
            wrongAns.style.opacity = 1;  
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};



// //let questions = [
// //    {
// //      question: "Inside which HTML element do we put the JavaScript??",
// //      choice1: "<script>",
// //      choice2: "<javascript>",
// //      choice3: "<js>",
// //      choice4: "<scripting>",
// //       answer: 1
// //     },
// //     {
// //       question:
// //         "What is the correct syntax for referring to an external script called 'xxx.js'?",
// //       choice1: "<script href='xxx.js'>",
// //       choice2: "<script name='xxx.js'>",
// //       choice3: "<script src='xxx.js'>",
// //       choice4: "<script file='xxx.js'>",
// //       answer: 3
// //     },
// //     {
// //       question: " How do you write 'Hello World' in an alert box?",
// //       choice1: "msgBox('Hello World');",
// //       choice2: "alertBox('Hello World');",
// //       choice3: "msg('Hello World');",
// //       choice4: "alert('Hello World');",
// //       answer: 4
// //     }
// //   ];

// startGame = () => {
//     questionCounter = 0;
//     score = 0;
//      //... spread out the questions into an array  
//     availableQuesions = [...questions];
//     getNewQuestion();
//   };

// getNewQuestion = () => {
//     if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
//         localStorage.setItem("mostRecentScore", score);
//       //go to the end page
//       return window.location.assign("end.html");
//     }
//     questionCounter++;
//         //update the HUD - q/n counter dynamically
//     //questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

//     progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
//         //Update the progress bar
//     progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
//     // select random questions 
//     const questionIndex = Math.floor(Math.random() * availableQuesions.length);
//     currentQuestion = availableQuesions[questionIndex];
//     question.innerText = currentQuestion.question;
  
//     choices.forEach(choice => {
//       const number = choice.dataset["number"];
//       choice.innerText = currentQuestion["choice" + number];
//     });
//     // remove used questions
//     availableQuesions.splice(questionIndex, 1);
//     acceptingAnswers = true;
//   };



// choices.forEach(choice => {
//     choice.addEventListener("click", e => {
//       if (!acceptingAnswers) return;
  
//       acceptingAnswers = false;
//       const selectedChoice = e.target;
//       const selectedAnswer = selectedChoice.dataset["number"];
//       //const classToApply = 'incorrect' ;
//      // if (selectedAnswer == currentQuestion.answer) {
//        //    classToApply = 'correct';
//       //}
      
//       const classToApply =
//         selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
  
//       if (classToApply === "correct") {
//         incrementScore(CORRECT_BONUS);
//       }
  
//       selectedChoice.parentElement.classList.add(classToApply);
  
//       setTimeout(() => {
//         selectedChoice.parentElement.classList.remove(classToApply);
//         getNewQuestion();
//       }, 1000);
//     });
//   });
  
//   incrementScore = num => {
//     score += num;
//     scoreText.innerText = score;
//   };
  
//   startGame();