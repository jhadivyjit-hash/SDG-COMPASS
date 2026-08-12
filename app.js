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

let answers =
    new Array(questions.length).fill(null);


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            document.getElementById(
                "questionText"
            )
        ) {
            showQuestion();
        }


        if (
            document.getElementById(
                "overallScore"
            )
        ) {
            loadResults();
        }


        if (
            document.getElementById(
                "currentScore"
            )
        ) {
            loadWeeklyDashboard();
        }

    }
);


// ==========================================
// SHOW QUESTION
// ==========================================

function showQuestion() {

    const question =
        questions[currentQuestion];


    const questionText =
        document.getElementById(
            "questionText"
        );


    const questionSDG =
        document.querySelector(
            ".question-sdg"
        );


    const questionNumber =
        document.getElementById(
            "questionNumber"
        );


    const progressPercent =
        document.getElementById(
            "progressPercent"
        );


    const progressFill =
        document.getElementById(
            "progressFill"
        );


    const answerContainer =
        document.querySelector(
            ".answer-options"
        );


    const previousButton =
        document.getElementById(
            "previousButton"
        );


    const nextButton =
        document.getElementById(
            "nextButton"
        );


    if (
        !questionText ||
        !answerContainer
    ) {
        return;
    }


    questionText.textContent =
        question.question;


    if (questionSDG) {

        questionSDG.textContent =
            `SDG ${question.sdg} • ${question.title}`;

    }


    if (questionNumber) {

        questionNumber.textContent =
            currentQuestion + 1;

    }


    const progress =
        Math.round(
            (
                (currentQuestion + 1) /
                questions.length
            ) * 100
        );


    if (progressPercent) {

        progressPercent.textContent =
            `${progress}%`;

    }


    if (progressFill) {

        progressFill.style.width =
            `${progress}%`;

    }


    answerContainer.innerHTML = "";


    question.options.forEach(
        function (option, index) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer-option";


            button.textContent =
                option.text;


            button.dataset.score =
                option.score;


            if (
                answers[currentQuestion] ===
                index
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.addEventListener(
                "click",
                function () {

                    answers[currentQuestion] =
                        index;


                    document
                        .querySelectorAll(
                            ".answer-option"
                        )
                        .forEach(
                            function (btn) {

                                btn.classList
                                    .remove(
                                        "selected"
                                    );

                            }
                        );


                    button.classList.add(
                        "selected"
                    );


                    if (nextButton) {

                        nextButton.disabled =
                            false;

                    }

                }
            );


            answerContainer.appendChild(
                button
            );

        }
    );


    if (previousButton) {

        previousButton.disabled =
            currentQuestion === 0;

    }


    if (nextButton) {

        nextButton.disabled =
            answers[currentQuestion] ===
            null;


        if (
            currentQuestion ===
            questions.length - 1
        ) {

            nextButton.textContent =
                "Finish Assessment ✓";

        } else {

            nextButton.textContent =
                "Next →";

        }

    }

}


// ==========================================
// NEXT BUTTON
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.id !==
            "nextButton"
        ) {
            return;
        }


        if (
            answers[currentQuestion] ===
            null
        ) {
            return;
        }


        if (
            currentQuestion <
            questions.length - 1
        ) {

            currentQuestion++;

            showQuestion();

        } else {

            finishAssessment();

        }

    }
);


// ==========================================
// PREVIOUS BUTTON
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.id !==
            "previousButton"
        ) {
            return;
        }


        if (currentQuestion > 0) {

            currentQuestion--;

            showQuestion();

        }

    }
);


// ==========================================
// FINISH ASSESSMENT
// ==========================================

function finishAssessment() {

    let totalScore = 0;


    const maximumScore =
        questions.length * 4;


    answers.forEach(
        function (answer, index) {

            if (answer !== null) {

                totalScore +=
                    questions[index]
                        .options[answer]
                        .score;

            }

        }
    );


    const overallScore =
        Math.round(
            (
                totalScore /
                maximumScore
            ) * 100
        );


    // SAVE CURRENT RESULT

    localStorage.setItem(
        "sdgOverallScore",
        overallScore
    );


    localStorage.setItem(
        "sdgAnswers",
        JSON.stringify(answers)
    );


    // SAVE SCORE HISTORY

    const today =
        new Date();


    const dateString =
        today
            .toISOString()
            .split("T")[0];


    const history =
        JSON.parse(
            localStorage.getItem(
                "sdgScoreHistory"
            )
        ) || [];


    history.push({

        date: dateString,

        score: overallScore

    });


    localStorage.setItem(
        "sdgScoreHistory",
        JSON.stringify(history)
    );


    // GO TO RESULTS

    window.location.href =
        "results.html";

}


// ==========================================
// LOAD RESULTS
// ==========================================

function loadResults() {

    const overallScoreElement =
        document.getElementById(
            "overallScore"
        );


    const savedAnswers =
        JSON.parse(
            localStorage.getItem(
                "sdgAnswers"
            )
        );


    const savedOverallScore =
        localStorage.getItem(
            "sdgOverallScore"
        );


    if (!savedAnswers) {

        if (overallScoreElement) {

            overallScoreElement.textContent =
                "--";

        }

        return;

    }


    const overallScore =
        Number(savedOverallScore);


    if (overallScoreElement) {

        overallScoreElement.textContent =
            overallScore;

    }


    updateScoreMessage(
        overallScore
    );


    calculateSDGScores(
        savedAnswers
    );

}


// ==========================================
// SCORE MESSAGE
// ==========================================

function updateScoreMessage(score) {

    const message =
        document.getElementById(
            "scoreMessage"
        );


    const description =
        document.getElementById(
            "scoreDescription"
        );


    if (
        !message ||
        !description
    ) {
        return;
    }


    if (score >= 80) {

        message.textContent =
            "Excellent progress! 🌱";


        description.textContent =
            "Your daily habits show strong alignment with several sustainability goals. Keep building on them.";

    } else if (score >= 60) {

        message.textContent =
            "Good start! 🌿";


        description.textContent =
            "You are making positive choices. A few small changes could make your impact even stronger.";

    } else if (score >= 40) {

        message.textContent =
            "There is room to improve. 🌱";


        description.textContent =
            "Your assessment highlights several areas where small daily actions could create a positive difference.";

    } else {

        message.textContent =
            "Let's start with small changes. 💚";


        description.textContent =
            "Every sustainable habit begins with one action. Small changes can create meaningful impact.";

    }

}


// ==========================================
// CALCULATE INDIVIDUAL SDG SCORES
// ==========================================

function calculateSDGScores(
    savedAnswers
) {

    const sdgTotals = {};

    const sdgCounts = {};


    savedAnswers.forEach(
        function (
            answerIndex,
            questionIndex
        ) {

            if (
                answerIndex === null
            ) {
                return;
            }


            const question =
                questions[
                    questionIndex
                ];


            if (!question) {
                return;
            }


            const selectedOption =
                question.options[
                    answerIndex
                ];


            if (!selectedOption) {
                return;
            }


            const score =
                selectedOption.score;


            if (
                !sdgTotals[
                    question.sdg
                ]
            ) {

                sdgTotals[
                    question.sdg
                ] = 0;


                sdgCounts[
                    question.sdg
                ] = 0;

            }


            sdgTotals[
                question.sdg
            ] += score;


            sdgCounts[
                question.sdg
            ]++;

        }
    );


    Object.keys(
        sdgTotals
    ).forEach(
        function (sdg) {

            const percentage =
                Math.round(
                    (
                        sdgTotals[sdg] /
                        (
                            sdgCounts[sdg] *
                            4
                        )
                    ) * 100
                );


            displaySDGScore(
                sdg,
                percentage
            );

        }
    );


    generateRecommendation(
        sdgTotals,
        sdgCounts
    );

}


// ==========================================
// DISPLAY SDG SCORE
// ==========================================

function displaySDGScore(
    sdg,
    score
) {

    const scoreElement =
        document.getElementById(
            `sdg${sdg}Score`
        );


    const barElement =
        document.getElementById(
            `sdg${sdg}Bar`
        );


    if (scoreElement) {

        scoreElement.textContent =
            `${score}/100`;

    }


    if (barElement) {

        barElement.style.width =
            `${score}%`;

    }

}


// ==========================================
// PERSONALIZED RECOMMENDATION
// ==========================================

function generateRecommendation(
    sdgTotals,
    sdgCounts
) {

    const recommendationElement =
        document.getElementById(
            "recommendationText"
        );


    if (
        !recommendationElement
    ) {
        return;
    }


    let lowestSDG = null;

    let lowestScore = 101;


    Object.keys(
        sdgTotals
    ).forEach(
        function (sdg) {

            const score =
                Math.round(
                    (
                        sdgTotals[sdg] /
                        (
                            sdgCounts[sdg] *
                            4
                        )
                    ) * 100
                );


            if (
                score <
                lowestScore
            ) {

                lowestScore =
                    score;


                lowestSDG =
                    Number(sdg);

            }

        }
    );


    const recommendations = {

        3:
            "Try building a consistent routine around physical activity, rest and healthy daily habits.",

        4:
            "Set aside a little time each day for learning, reading or developing a useful skill.",

        6:
            "Try reducing unnecessary water use, such as keeping taps off when water is not needed.",

        7:
            "Switch off lights and electronic devices when they are not being used.",

        11:
            "Keep your surroundings clean and consider sustainable ways of travelling when practical.",

        12:
            "Before buying something new, consider whether you really need it. Reuse and recycle where possible.",

        13:
            "Consider lower-emission travel options when practical and look for ways to reduce unnecessary energy use.",

        15:
            "Spend time caring for plants, avoiding litter and protecting the natural spaces around you."

    };


    if (
        lowestSDG &&
        recommendations[
            lowestSDG
        ]
    ) {

        recommendationElement.textContent =
            `Your current area with the most room for improvement is SDG ${lowestSDG}. ${recommendations[lowestSDG]}`;

    }

}


// ==========================================
// WEEKLY DASHBOARD
// ==========================================

function loadWeeklyDashboard() {

    const history =
        JSON.parse(
            localStorage.getItem(
                "sdgScoreHistory"
            )
        ) || [];


    const currentScoreElement =
        document.getElementById(
            "currentScore"
        );


    const changeElement =
        document.getElementById(
            "weeklyChange"
        );


    const countElement =
        document.getElementById(
            "assessmentCount"
        );


    // NO DATA

    if (
        history.length === 0
    ) {

        if (currentScoreElement) {

            currentScoreElement.textContent =
                "--";

        }


        if (changeElement) {

            changeElement.textContent =
                "--";

        }


        if (countElement) {

            countElement.textContent =
                "0";

        }


        drawWeeklyChart(
            history
        );


        updatePerformanceAreas();

        return;

    }


    // CURRENT SCORE

    const current =
        Number(
            history[
                history.length - 1
            ].score
        );


    if (currentScoreElement) {

        currentScoreElement.textContent =
            current;

    }


    // ASSESSMENT COUNT

    if (countElement) {

        countElement.textContent =
            history.length;

    }


    // WEEKLY CHANGE

    let change = 0;


    if (
        history.length