const questions = [
    {
        type: 'radio',
        question: 'What is the output of "console.log(typeof null)"?',
        options: ['null', 'object', 'undefined', 'number'],
        correctAnswer: 'object'
    },
    {
        type: 'radio',
        question: 'Which of the following are JavaScript data types?',
        options: ['Character', 'String', 'Boolean', 'Object'],
        correctAnswer: 'Object'
    },
    {
        type: 'radio',
        question: 'Which company developed JavaScript?',
        options: ['Microsoft', 'Netscape', 'Google', 'Oracle'],
        correctAnswer: 'Netscape'
    },
    {
        type: 'radio',
        question: 'Which method is used to add an element to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 'push()'
    },
    {
        type: 'radio',
        question: 'What is the result of "1 + \'1\'" in JavaScript?',
        options: ['2', '11', 'undefined', 'NaN'],
        correctAnswer: '11'
    },
    {
        type: 'radio',
        question: 'Which of these are JavaScript frameworks or libraries?',
        options: ['React', 'Laravel', 'Django', 'Rails'],
        correctAnswer: 'React'
    },
    {
        type: 'radio',
        question: 'Which symbol is used for comments in JavaScript?',
        options: ['//', '/*', '#', '/--'],
        correctAnswer: '//'
    },
    {
        type: 'radio',
        question: 'Which method is used to remove the last element from an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 'pop()'
    },
    {
        type: 'radio',
        question: 'What is the output of "console.log([] + [])"?',
        options: ['[]', 'undefined', '""', 'null'],
        correctAnswer: '""'
    },
    {
        type: 'radio',
        question: 'Which of the following are looping structures in JavaScript?',
        options: ['for', 'foreach', 'loop', 'while'],
        correctAnswer: 'for'
    },
    {
        type: 'radio',
        question: 'Which method is used to find HTML elements by ID?',
        options: ['getElementById()', 'querySelector()', 'getElementsByClassName()', 'getElementsByTagName()'],
        correctAnswer: 'getElementById()'
    },
    {
        type: 'radio',
        question: 'Which of the following is a JavaScript package manager?',
        options: ['npm', 'pip', 'composer', 'gem'],
        correctAnswer: 'npm'
    },
    {
        type: 'radio',
        question: 'What is the keyword used to declare a variable in JavaScript?',
        options: ['let', 'int', 'float', 'double'],
        correctAnswer: 'let'
    },
    {
        type: 'radio',
        question: 'Which of the following are JavaScript comparison operators?',
        options: ['==', '===', '<>', '!='],
        correctAnswer: '==='
    },
    {
        type: 'radio',
        question: 'Which JavaScript method is used to write HTML content?',
        options: ['document.write()', 'console.log()', 'window.alert()', 'innerHTML'],
        correctAnswer: 'document.write()'
    },
    {
        type: 'radio',
        question: 'Which of the following is used to convert a string to an integer?',
        options: ['parseInt()', 'parseFloat()', 'toString()', 'Number()'],
        correctAnswer: 'parseInt()'
    },
    {
        type: 'radio',
        question: 'What will the code "Boolean(\'false\')" return?',
        options: ['true', 'false', 'undefined', 'null'],
        correctAnswer: 'true'
    },
    {
        type: 'radio',
        question: 'Which of these are JavaScript primitive types?',
        options: ['String', 'Array', 'Object', 'Function'],
        correctAnswer: 'String'
    },
    {
        type: 'radio',
        question: 'Which function is used to parse a JSON string to an object?',
        options: ['JSON.parse()', 'JSON.stringify()', 'JSON.object()', 'JSON.toObject()'],
        correctAnswer: 'JSON.parse()'
    },
    {
        type: 'radio',
        question: 'Which method is used to join two or more arrays?',
        options: ['concat()', 'join()', 'append()', 'merge()'],
        correctAnswer: 'concat()'
    }
];


const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const scorePopup = document.getElementById('score-popup');
const quizScoreDisplay = document.getElementById('quiz-score');
const timerDisplay = document.getElementById('timer');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
let currentPageIndex = 0;
let score = 0;
const questionsPerPage = 5;
const totalQuizTimeInSeconds = 4 * 60; // 4 minutes for all 4 pages
let quizTimerInterval;
let selectedAnswers = new Array(questions.length).fill(null); // Array to store selected answers

function startQuiz() {
    showQuestionsForCurrentPage();
    startQuizTimer();
}

function showQuestionsForCurrentPage() {
    const startIndex = currentPageIndex * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const pageQuestions = questions.slice(startIndex, endIndex);
    quizContainer.innerHTML = '';
    pageQuestions.forEach((questionData, index) => {
        const questionIndex = startIndex + index;
        quizContainer.innerHTML += `
            <div class="question">
                <h2>${questionIndex + 1}. ${questionData.question}</h2>
                ${questionData.options.map(option => `
                    <label>
                        <input type="radio" name="answer-${questionIndex}" value="${option}" ${selectedAnswers[questionIndex] === option ? 'checked' : ''}>
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
    });
    updateNavigationButtons();
}

function startQuizTimer() {
    updateTimerDisplay(totalQuizTimeInSeconds);
    let currentTimeInSeconds = totalQuizTimeInSeconds;
    quizTimerInterval = setInterval(() => {
        currentTimeInSeconds--;
        updateTimerDisplay(currentTimeInSeconds);
        if (currentTimeInSeconds <= 0) {
            clearInterval(quizTimerInterval);
            finishQuiz();
        }
    }, 1000);
}

function updateTimerDisplay(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    timerDisplay.textContent = `Time Left: ${minutes}:${formattedSeconds}`;
}

function finishQuiz() {
    calculateFinalScore();
    showScorePopup();
}

function calculateFinalScore() {
    score = 0; // Reset score before calculating
    questions.forEach((questionData, index) => {
        const answer = selectedAnswers[index];
        if (answer === questionData.correctAnswer) {
            score++;
        }
    });
}

function showScorePopup() {
    quizScoreDisplay.textContent = score;
    scorePopup.style.display = 'block';
}

function updateNavigationButtons() {
    if (currentPageIndex === 0) {
        prevPageButton.style.display = 'none'; // Hide previous button on first page
    } else {
        prevPageButton.style.display = 'inline-block'; // Show previous button on other pages
    }

    if (currentPageIndex === Math.ceil(questions.length / questionsPerPage) - 1) {
        submitButton.style.display = 'inline-block';
        nextPageButton.style.display = 'none';
    } else {
        submitButton.style.display = 'none';
        nextPageButton.style.display = 'inline-block';
    }
}


prevPageButton.addEventListener('click', () => {
    goToPreviousPage();
});

nextPageButton.addEventListener('click', () => {
    goToNextPage();
});

submitButton.addEventListener('click', () => {
    clearInterval(quizTimerInterval); // Stop the quiz timer
    finishQuiz();
    nextPageButton.style.display = 'none'; // Hide next page button after submitting
});

// Event listener for storing selected answers
quizContainer.addEventListener('change', event => {
    const target = event.target;
    if (target.type === 'radio') {
        const questionIndex = parseInt(target.name.split('-')[1], 10);
        selectedAnswers[questionIndex] = target.value;
    }
});

function goToPreviousPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        showQuestionsForCurrentPage();
        resetQuizTimer();
    }
}

function goToNextPage() {
    if (currentPageIndex < Math.ceil(questions.length / questionsPerPage) - 1) {
        currentPageIndex++;
        showQuestionsForCurrentPage();
        resetQuizTimer();
    }
}

window.addEventListener('load', startQuiz);