// ==========================================
// SDG LIFE COMPASS
// COMPLETE APP.JS
// ==========================================


// ==========================================
// QUESTION DATABASE
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
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById("questionText")) {
        showQuestion();
    }

    if (document.getElementById("overallScore")) {
        loadResults();
    }

    if (document.getElementById("currentScore")) {
        loadWeeklyDashboard();
    }

});


// ==========================================
// SHOW QUESTION
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