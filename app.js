// ==========================================
// SDG LIFE COMPASS
// COMPLETE APPLICATION JAVASCRIPT
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
// USER HELPERS
// ==========================================

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("sdgUser")
    );

}


function userKey(prefix) {

    const user = getCurrentUser();

    if (!user) {
        return null;
    }

    return `${prefix}_${user.email}`;

}


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            document.getElementById("questionText")
        ) {
            showQuestion();
        }


        if (
            document.getElementById("overallScore")
        ) {
            loadResults();
        }


        if (
            document.getElementById("currentScore")
        ) {
            loadWeeklyDashboard();
        }


        setupSignup();

        setupLogin();

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


            button.type =
                "button";


            button.textContent =
                option.text;


            button.dataset.score =
                option.score;


            if (
                answers[currentQuestion] === index
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

                                btn.classList.remove(
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
            answers[currentQuestion] === null;


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
            answers[currentQuestion] === null
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

    const user =
        getCurrentUser();


    if (!user) {

        alert(
            "Please create an account or login before saving your assessment."
        );

        window.location.href =
            "login.html";

        return;

    }


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


    localStorage.setItem(
        `sdgOverallScore_${user.email}`,
        overallScore
    );


    localStorage.setItem(
        `sdgAnswers_${user.email}`,
        JSON.stringify(answers)
    );


    saveUserPerformance(
        overallScore,
        answers
    );


    window.location.href =
        "results.html";

}


// ==========================================
// SAVE USER PERFORMANCE
// ==========================================

function saveUserPerformance(
    overallScore,
    userAnswers
) {

    const user =
        getCurrentUser();


    if (!user) {
        return;
    }


    const historyKey =
        `sdgScoreHistory_${user.email}`;


    const history =
        JSON.parse(
            localStorage.getItem(historyKey)
        ) || [];


    const today =
        new Date();


    const dateString =
        today
            .toISOString()
            .split("T")[0];


    history.push({

        date: dateString,

        score: overallScore,

        answers: userAnswers

    });


    localStorage.setItem(
        historyKey,
        JSON.stringify(history)
    );

}


// ==========================================
// LOAD RESULTS
// ==========================================

function loadResults() {

    const user =
        getCurrentUser();


    const overallScoreElement =
        document.getElementById(
            "overallScore"
        );


    if (!user) {

        if (overallScoreElement) {

            overallScoreElement.textContent =
                "--";

        }

        return;

    }


    const savedAnswers =
        JSON.parse(
            localStorage.getItem(
                `sdgAnswers_${user.email}`
            )
        );


    const savedOverallScore =
        localStorage.getItem(
            `sdgOverallScore_${user.email}`
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
// CALCULATE SDG SCORES
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
                sdgTotals[
                    question.sdg
                ] === undefined
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
                            sdgCounts[sdg] * 4
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
// PERSONALIZED AI COACH
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


    let lowestSDG =
        null;

    let lowestScore =
        101;


    let strongestSDG =
        null;

    let strongestScore =
        -1;


    Object.keys(
        sdgTotals
    ).forEach(
        function (sdg) {

            const score =
                Math.round(
                    (
                        sdgTotals[sdg] /
                        (
                            sdgCounts[sdg] * 4
                        )
                    ) * 100
                );


            if (
                score < lowestScore
            ) {

                lowestScore =
                    score;

                lowestSDG =
                    Number(sdg);

            }


            if (
                score > strongestScore
            ) {

                strongestScore =
                    score;

                strongestSDG =
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
            "Try reducing unnecessary water use, such as turning taps off when water is not needed.",

        7:
            "Make switching off unused lights and electronic devices part of your daily routine.",

        11:
            "Keep your surroundings clean and choose sustainable travel options when practical.",

        12:
            "Before buying something new, ask whether you really need it. Reuse and recycle whenever possible.",

        13:
            "When practical, choose lower-emission travel and reduce unnecessary energy use.",

        15:
            "Spend time caring for plants, avoiding litter and protecting the natural spaces around you."

    };


    if (
        lowestSDG &&
        recommendations[lowestSDG]
    ) {

        recommendationElement.textContent =
            `Your AI Coach suggests focusing on SDG ${lowestSDG}. ${recommendations[lowestSDG]} One small action repeated consistently can make a difference.`;

    }


    const strongestElement =
        document.getElementById(
            "strongestArea"
        );


    const strongestScoreElement =
        document.getElementById(
            "strongestScore"
        );


    const focusElement =
        document.getElementById(
            "focusArea"
        );


    const focusScoreElement =
        document.getElementById(
            "focusScore"
        );


    const names = {

        3: "Good Health & Well-being",

        4: "Quality Education",

        6: "Clean Water & Sanitation",

        7: "Affordable & Clean Energy",

        11: "Sustainable Cities & Communities",

        12: "Responsible Consumption",

        13: "Climate Action",

        15: "Life on Land"

    };


    if (
        strongestElement &&
        strongestSDG
    ) {

        strongestElement.textContent =
            names[strongestSDG];

    }


    if (
        strongestScoreElement &&
        strongestSDG
    ) {

        strongestScoreElement.textContent =
            `Your strongest area is SDG ${strongestSDG} with a score of ${strongestScore}/100.`;

    }


    if (
        focusElement &&
        lowestSDG
    ) {

        focusElement.textContent =
            names[lowestSDG];

    }


    if (
        focusScoreElement &&
        lowestSDG
    ) {

        focusScoreElement.textContent =
            `Your focus area is SDG ${lowestSDG} with a score of ${lowestScore}/100.`;

    }

}


    if (
        !recommendationElement
    ) {
        return;
    }


    let lowestSDG =
        null;

    let lowestScore =
        101;


    let strongestSDG =
        null;

    let strongestScore =
        -1;


    Object.keys(
        sdgTotals
    ).forEach(
        function (sdg) {

            const score =
                Math.round(
                    (
                        sdgTotals[sdg] /
                        (
                            sdgCounts[sdg] * 4
                        )
                    ) * 100
                );


            if (
                score < lowestScore
            ) {

                lowestScore =
                    score;

                lowestSDG =
                    Number(sdg);

            }


            if (
                score > strongestScore
            ) {

                strongestScore =
                    score;

                strongestSDG =
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
            "Try reducing unnecessary water use, such as turning taps off when water is not needed.",

        7:
            "Make switching off unused lights and electronic devices part of your daily routine.",

        11:
            "Keep your surroundings clean and choose sustainable travel options when practical.",

        12:
            "Before buying something new, ask whether you really need it. Reuse and recycle whenever possible.",

        13:
            "When practical, choose lower-emission travel and reduce unnecessary energy use.",

        15:
            "Spend time caring for plants, avoiding litter and protecting the natural spaces around you."

    };


    if (
        lowestSDG &&
        recommendations[lowestSDG]
    ) {

        recommendationElement.textContent =
            `Your AI Coach suggests focusing on SDG ${lowestSDG}. ${recommendations[lowestSDG]} One small action repeated consistently can make a difference.`;

    }


    const strongestElement =
        document.getElementById(
            "strongestArea"
        );


    const strongestScoreElement =
        document.getElementById(
            "strongestScore"
        );


    const focusElement =
        document.getElementById(
            "focusArea"
        );


    const focusScoreElement =
        document.getElementById(
            "focusScore"
        );


    const names = {

        3: "Good Health & Well-being",

        4: "Quality Education",

        6: "Clean Water & Sanitation",

        7: "Affordable & Clean Energy",

        11: "Sustainable Cities & Communities",

        12: "Responsible Consumption",

        13: "Climate Action",

        15: "Life on Land"

    };


    if (
        strongestElement &&
        strongestSDG
    ) {

        strongestElement.textContent =
            names[strongestSDG];

    }


    if (
        strongestScoreElement &&
        strongestSDG
    ) {

        strongestScoreElement.textContent =
            `Your strongest area is SDG ${strongestSDG} with a score of ${strongestScore}/100.`;

    }


    if (
        focusElement &&
        lowestSDG
    ) {

        focusElement.textContent =
            names[lowestSDG];

    }


    if (
        focusScoreElement &&
        lowestSDG
    ) {

        focusScoreElement.textContent =
            `Your focus area is SDG ${lowestSDG} with a score of ${lowestScore}/100.`;

    }

}

// ==========================================
// WEEKLY DASHBOARD
// ==========================================

function loadWeeklyDashboard() {

    const user =
        getCurrentUser();


    let history = [];


    if (user) {

        const historyKey =
            `sdgScoreHistory_${user.email}`;


        history =
            JSON.parse(
                localStorage.getItem(
                    historyKey
                )
            ) || [];

    }


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


    if (countElement) {

        countElement.textContent =
            history.length;

    }


    let change =
        0;


    if (
        history.length >= 2
    ) {

        const previous =
            Number(
                history[
                    history.length - 2
                ].score
            );


        change =
            current - previous;

    }


    if (changeElement) {

        if (change > 0) {

            changeElement.textContent =
                `+${change}`;

        } else {

            changeElement.textContent =
                `${change}`;

        }

    }


    drawWeeklyChart(
        history
    );


    updatePerformanceAreas();

}
// ==========================================
// WEEKLY GRAPH
// ==========================================

function drawWeeklyChart(
    history
) {

    const canvas =
        document.getElementById(
            "weeklyChart"
        );


    const emptyMessage =
        document.getElementById(
            "chartEmptyMessage"
        );


    if (!canvas) {
        return;
    }


    if (
        history.length < 2
    ) {

        if (emptyMessage) {

            emptyMessage.style.display =
                "flex";

        }

        return;

    }


    if (emptyMessage) {

        emptyMessage.style.display =
            "none";

    }


    const ctx =
        canvas.getContext("2d");


    const width =
        canvas.width;


    const height =
        canvas.height;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    const padding =
        55;


    const graphWidth =
        width -
        padding -
        30;


    const graphHeight =
        height -
        padding -
        45;

// ==========================================
    // BACKGROUND
    // ==========================================

    ctx.fillStyle =
        "#ffffff";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    // ==========================================
    // GRID
    // ==========================================

    ctx.strokeStyle =
        "#e4eee8";

    ctx.lineWidth =
        1;


    for (
        let score = 0;
        score <= 100;
        score += 20
    ) {

        const y =
            height -
            padding -
            (
                score / 100
            ) *
            graphHeight;


        ctx.beginPath();

        ctx.moveTo(
            padding,
            y
        );

        ctx.lineTo(
            width - 25,
            y
        );

        ctx.stroke();


        ctx.fillStyle =
            "#65786e";

        ctx.font =
            "12px Arial";

        ctx.fillText(
            score,
            15,
            y + 4
        );

    }
// ==========================================
    // AXES
    // ==========================================

    ctx.strokeStyle =
        "#8aa297";

    ctx.lineWidth =
        1.5;


    ctx.beginPath();

    ctx.moveTo(
        padding,
        20
    );

    ctx.lineTo(
        padding,
        height - padding
    );

    ctx.lineTo(
        width - 25,
        height - padding
    );

    ctx.stroke();


    // ==========================================
    // POINTS
    // ==========================================

    const points =
        history.map(
            function (
                item,
                index
            ) {

                const x =
                    padding +
                    (
                        index /
                        Math.max(
                            history.length - 1,
                            1
                        )
                    ) *
                    graphWidth;


                const y =
                    (
                        height -
                        padding
                    ) -
                    (
                        Number(item.score) /
                        100
                    ) *
                    graphHeight;


                return {

                    x: x,

                    y: y,

                    score:
                        Number(item.score),

                    date:
                        item.date

                };

            }
        );
      
// ==========================================
    // LINE
    // ==========================================

    ctx.strokeStyle =
        "#198754";

    ctx.lineWidth =
        4;

    ctx.lineJoin =
        "round";

    ctx.lineCap =
        "round";


    ctx.beginPath();


    points.forEach(
        function (
            point,
            index
        ) {

            if (
                index === 0
            ) {

                ctx.moveTo(
                    point.x,
                    point.y
                );

            } else {

                ctx.lineTo(
                    point.x,
                    point.y
                );

            }

        }
    );


    ctx.stroke();

// ==========================================
    // POINTS + LABELS
    // ==========================================

    points.forEach(
        function (point) {

            ctx.beginPath();

            ctx.fillStyle =
                "#ffffff";

            ctx.arc(
                point.x,
                point.y,
                7,
                0,
                Math.PI * 2
            );

            ctx.fill();


            ctx.beginPath();

            ctx.fillStyle =
                "#198754";

            ctx.arc(
                point.x,
                point.y,
                5,
                0,
                Math.PI * 2
            );

            ctx.fill();


            ctx.fillStyle =
                "#173b2d";

            ctx.font =
                "bold 13px Arial";

            ctx.textAlign =
                "center";

            ctx.fillText(
                point.score,
                point.x,
                point.y - 13
            );


            ctx.fillStyle =
                "#71857b";

            ctx.font =
                "11px Arial";

            ctx.fillText(
                point.date,
                point.x,
                height - 22
            );

        }
    );


    ctx.textAlign =
        "start";

}
// ==========================================
// PERFORMANCE AREAS
// ==========================================

function updatePerformanceAreas() {

    const user =
        getCurrentUser();


    if (!user) {
        return;
    }


    const savedAnswers =
        JSON.parse(
            localStorage.getItem(
                `sdgAnswers_${user.email}`
            )
        );


    if (!savedAnswers) {
        return;
    }


    calculateSDGScores(
        savedAnswers
    );

}
// ==========================================
// SIGN UP
// ==========================================

function setupSignup() {

    const form =
        document.getElementById(
            "signupForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const email =
                document.getElementById(
                    "email"
                ).value.trim().toLowerCase();


            const password =
                document.getElementById(
                    "password"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            if (
                password !==
                confirmPassword
            ) {

                alert(
                    "Passwords do not match."
                );

                return;

            }


            if (
                password.length < 6
            ) {

                alert(
                    "Please use a password with at least 6 characters."
                );

                return;

            }


            const users =
                JSON.parse(
                    localStorage.getItem(
                        "sdgUsers"
                    )
                ) || [];


            const existingUser =
                users.find(
                    function (user) {

                        return user.email ===
                            email;

                    }
                );


            if (existingUser) {

                alert(
                    "An account with this email already exists."
                );

                return;

            }


            const newUser = {

                name: name,

                email: email,

                password: password

            };


            users.push(
                newUser
            );


            localStorage.setItem(
                "sdgUsers",
                JSON.stringify(users)
            );


            localStorage.setItem(
                "sdgUser",
                JSON.stringify({
                    name: name,
                    email: email
                })
            );


            alert(
                "Account created successfully! 🌱"
            );


            window.location.href =
                "assessment.html";

        }
    );

}
// ==========================================
// LOGIN
// ==========================================

function setupLogin() {

    const form =
        document.getElementById(
            "loginForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "email"
                ).value.trim().toLowerCase();


            const password =
                document.getElementById(
                    "password"
                ).value;


            const users =
                JSON.parse(
                    localStorage.getItem(
                        "sdgUsers"
                    )
                ) || [];


            const user =
                users.find(
                    function (item) {

                        return (
                            item.email === email &&
                            item.password === password
                        );

                    }
                );


            if (!user) {

                alert(
                    "Incorrect email or password."
                );

                return;

            }


            localStorage.setItem(
                "sdgUser",
                JSON.stringify({

                    name:
                        user.name,

                    email:
                        user.email

                })
            );


            alert(
                `Welcome back, ${user.name}! 🌱`
            );


            window.location.href =
                "dashboard.html";

        }
    );
}
// ==========================================
// LOGOUT
// ==========================================

function logoutUser() {

    localStorage.removeItem(
        "sdgUser"
    );


    window.location.href =
        "login.html";

}

                               
                    