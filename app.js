// ==========================================
// SDG LIFE COMPASS
// DAILY ASSESSMENT ENGINE
// ==========================================

const questions = [

    {
        sdg: 6,
        title: "Clean Water & Sanitation",
        question: "How often do you avoid unnecessary water usage?",
        options: [
            { text: "Always", score: 4 },
            { text: "Often", score: 3 },
            { text: "Sometimes", score: 2 },
            { text: "Rarely", score: 1 },
            { text: "Never", score: 0 }
        ]
    },

    {
        sdg: 7,
        title: "Affordable & Clean Energy",
        question: "How often do you switch off lights or devices when they are not being used?",
        options: [
            { text: "Always", score: 4 },
            { text: "Often", score: 3 },
            { text: "Sometimes", score: 2 },
            { text: "Rarely", score: 1 },
            { text: "Never", score: 0 }
        ]
    },

    {
        sdg: 12,
        title: "Responsible Consumption",
        question: "How often do you avoid unnecessary purchases?",
        options: [
            { text: "Always", score: 4 },
            { text: "Often", score: 3 },
            { text: "Sometimes", score: 2 },
            { text: "Rarely", score: 1 },
            { text: "Never", score: 0 }
        ]
    },

    {
        sdg: 12,
        title: "Responsible Consumption",
        question: "How often do you reuse or recycle items instead of throwing them away?",
        options: [
            { text: "Always", score: 4 },
            { text: "Often", score: 3 },
            { text: "Sometimes", score: 2 },
            { text: "Rarely", score: 1 },
            { text: "Never", score: 0 }
        ]
    },

    {
        sdg: 13,
        title: "Climate Action",
        question: "How often do you choose walking, cycling or public transport when practical?",
        options: [
            { text: "Always", score: 4 },
            { text: "Often", score: 3 },
            { text: "Sometimes", score: 2 },
            { text: "Rarely", score: 1 },
            { text: "Never", score: 0 }
        ]
    },

    {
        sdg: 3,
        title: "Good Health & Well-being",
        question: "How regularly do you make time for physical activity?",
        options: [
            { text: "Daily", score: 4 },
            { text: "Most days", score: 3 },
            { text: "Sometimes", score: 2 },
            { text: "Rarely", score: 1 },
            { text: "Never", score: 0 }
        ]
    },

    {
        sdg: 3,
        title: "Good Health & Well-being",
        question: "How often do you make an effort to get enough sleep?",
        options: [
            { text: "Always", score: 4 },
            { text: "Often", score: 3 },
            { text: "Sometimes", score: 2 },
            { text: "Rarely", score: 1 },
            { text: "Never", score: 0 }
        ]
    },

    {
        sdg: 4,
        title: "Quality Education",
        question: "How often do you spend time learning something new?",
        options: [
            { text: "Every day", score: 4 },
            { text: "Often", score: 3 },
            { text: "Sometimes", score: 2 },
            { text: "Rarely", score: 1 },
            { text: "Never", score: 0 }
        ]
    },

    {
        sdg: 11,
        title: "Sustainable Cities & Communities",
        question: "How often do you keep your surroundings clean and avoid littering?",
        options: [
            { text: "Always", score: 4 },
            { text: "Often", score: 3 },
            { text: "Sometimes", score: 2 },
            { text: "Rarely", score: 1 },
            { text: "Never", score: 0 }
        ]
    },

    {
        sdg: 15,
        title: "Life on Land",
        question: "How often do you take actions that help protect plants and nature?",
        options: [
            { text: "Very often", score: 4 },
            { text: "Often", score: 3 },
            { text: "Sometimes", score: 2 },
            { text: "Rarely", score: 1 },
            { text: "Never", score: 0 }
        ]
    }

];


// ==========================================
// ASSESSMENT VARIABLES
// ==========================================

let currentQuestion = 0;

let answers = new Array(questions.length).fill(null);


// ==========================================
// START AFTER PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const questionText = document.getElementById("questionText");

    // Only run assessment code on assessment.html
    if (!questionText) {
        return;
    }

    showQuestion();

});


// ==========================================
// DISPLAY QUESTION
// ==========================================

function showQuestion() {

    const question = questions[currentQuestion];

    const questionText =
        document.getElementById("questionText");

    const questionSDG =
        document.querySelector(".question-sdg");

    const questionNumber =
        document.getElementById("questionNumber");

    const progressPercent =
        document.getElementById("progressPercent");

    const progressFill =
        document.getElementById("progressFill");

    const answerContainer =
        document.querySelector(".answer-options");

    const previousButton =
        document.getElementById("previousButton");

    const nextButton =
        document.getElementById("nextButton");


    questionText.textContent = question.question;

    questionSDG.textContent =
        `SDG ${question.sdg} • ${question.title}`;

    questionNumber.textContent =
        currentQuestion + 1;


    const progress =
        Math.round(
            ((currentQuestion + 1) / questions.length) * 100
        );

    progressPercent.textContent =
        `${progress}%`;

    progressFill.style.width =
        `${progress}%`;


    answerContainer.innerHTML = "";


    question.options.forEach(function (option, index) {

        const button =
            document.createElement("button");

        button.className = "answer-option";

        button.textContent =
            option.text;

        button.dataset.score =
            option.score;


        if (answers[currentQuestion] === index) {
            button.classList.add("selected");
        }


        button.addEventListener("click", function () {

            answers[currentQuestion] = index;

            document
                .querySelectorAll(".answer-option")
                .forEach(function (btn) {
                    btn.classList.remove("selected");
                });

            button.classList.add("selected");

            nextButton.disabled = false;

        });


        answerContainer.appendChild(button);

    });


    previousButton.disabled =
        currentQuestion === 0;

    nextButton.disabled =
        answers[currentQuestion] === null;


    if (currentQuestion === questions.length - 1) {

        nextButton.textContent =
            "Finish Assessment ✓";

    } else {

        nextButton.textContent =
            "Next →";

    }

}


// ==========================================
// NEXT BUTTON
// ==========================================

document.addEventListener("click", function (event) {

    if (event.target.id !== "nextButton") {
        return;
    }


    if (answers[currentQuestion] === null) {
        return;
    }


    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        finishAssessment();

    }

});


// ==========================================
// PREVIOUS BUTTON
// ==========================================

document.addEventListener("click", function (event) {

    if (event.target.id !== "previousButton") {
        return;
    }


    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

});


// ==========================================
// CALCULATE RESULTS
// ==========================================

function finishAssessment() {

    let totalScore = 0;

    let maximumScore =
        questions.length * 4;


    answers.forEach(function (answer, index) {

        if (answer !== null) {

            totalScore +=
                questions[index].options[answer].score;

        }

    });


    const overallScore =
        Math.round(
            (totalScore / maximumScore) * 100
        );


    // Store result temporarily in browser
    localStorage.setItem(
        "sdgOverallScore",
        overallScore
    );


    // Store individual answers
    localStorage.setItem(
        "sdgAnswers",
        JSON.stringify(answers)
    );


    // Go to results page
    window.location.href =
        "results.html";

}