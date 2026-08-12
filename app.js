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


// SAVE USER-SPECIFIC SCORE HISTORY

saveUserPerformance(
    overallScore,
    answers
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

    const user =
    JSON.parse(
        localStorage.getItem("sdgUser")
    );

let history = [];

if (user) {

    const historyKey =
        `sdgScoreHistory_${user.email}`;

    history =
        JSON.parse(
            localStorage.getItem(historyKey)
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
        history.length === 0
    ) {

        if (strongestElement) {

            strongestElement.textContent =
                "Complete an assessment";

        }


        if (focusElement) {

            focusElement.textContent =
                "Complete an assessment";

        }


        return;

    }


    const currentScore =
        Number(
            history[
                history.length - 1
            ].score
        );


    if (strongestElement) {

        if (
            currentScore >= 80
        ) {

            strongestElement.textContent =
                "Excellent sustainability habits 🌱";

        } else if (
            currentScore >= 60
        ) {

            strongestElement.textContent =
                "Good overall progress 🌿";

        } else {

            strongestElement.textContent =
                "You're building positive habits 💚";

        }

    }


    if (focusElement) {

        if (
            currentScore >= 80
        ) {

            focusElement.textContent =
                "Keep your strongest habits consistent";

        } else if (
            currentScore >= 60
        ) {

            focusElement.textContent =
                "Strengthen a few everyday habits";

        } else {

            focusElement.textContent =
                "Start with small, achievable changes";

        }

    }

}


//
// ==========================================
// AI SUSTAINABILITY COACH
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const tipButton =
            document.getElementById(
                "coachTipButton"
            );

        const planButton =
            document.getElementById(
                "coachPlanButton"
            );

        const responseBox =
            document.getElementById(
                "coachResponse"
            );


        if (
            !tipButton ||
            !planButton ||
            !responseBox
        ) {
            return;
        }


        // ------------------------------------------
        // GET USER'S LOWEST SDG
        // ------------------------------------------

        function getLowestSDG() {

            const savedAnswers =
                JSON.parse(
                    localStorage.getItem(
                        "sdgAnswers"
                    )
                );


            if (!savedAnswers) {
                return null;
            }


            const totals = {};

            const counts = {};


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


                    const option =
                        question.options[
                            answerIndex
                        ];


                    if (!option) {
                        return;
                    }


                    if (
                        totals[
                            question.sdg
                        ] === undefined
                    ) {

                        totals[
                            question.sdg
                        ] = 0;

                        counts[
                            question.sdg
                        ] = 0;

                    }


                    totals[
                        question.sdg
                    ] += option.score;


                    counts[
                        question.sdg
                    ]++;

                }
            );


            let lowestSDG = null;

            let lowestScore = 101;


            Object.keys(
                totals
            ).forEach(
                function (sdg) {

                    const score =
                        Math.round(
                            (
                                totals[sdg] /
                                (
                                    counts[sdg] *
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


            return {
                sdg: lowestSDG,
                score: lowestScore
            };

        }


        // ------------------------------------------
        // COACH INFORMATION
        // ------------------------------------------

        const coachData = {

            3: {
                name:
                    "Good Health & Well-being",

                tip:
                    "Try choosing one healthy habit you can repeat consistently, such as making time for movement or keeping a regular sleep routine.",

                plan:
                    "For your next few days, choose one simple health habit and practise it consistently. At the end of each day, check whether you completed it."
            },


            4: {
                name:
                    "Quality Education",

                tip:
                    "Set aside a little time to learn something new. It could be reading, practising a skill, or exploring a topic you enjoy.",

                plan:
                    "Choose one small topic to learn about this week. Spend a few minutes on it each day and write down one thing you learned."
            },


            6: {
                name:
                    "Clean Water & Sanitation",

                tip:
                    "Look for moments when water is running unnecessarily and switch it off when it is not needed.",

                plan:
                    "For the next few days, pay attention to your water use during everyday routines. Try to reduce one unnecessary use of water each day."
            },


            7: {
                name:
                    "Affordable & Clean Energy",

                tip:
                    "Make switching off unused lights and devices part of your everyday routine.",

                plan:
                    "Before leaving a room, quickly check whether lights or devices need to stay on. Make this small check a daily habit."
            },


            11: {
                name:
                    "Sustainable Cities & Communities",

                tip:
                    "Keeping shared spaces clean and choosing sustainable ways to travel when practical can support healthier communities.",

                plan:
                    "Choose one small action each day that improves your surroundings, such as avoiding litter or using a lower-impact travel option when practical."
            },


            12: {
                name:
                    "Responsible Consumption",

                tip:
                    "Before buying something, pause and ask yourself whether you really need it.",

                plan:
                    "For the next few days, pause before unnecessary purchases. Try reusing, repairing or recycling something before replacing it."
            },


            13: {
                name:
                    "Climate Action",

                tip:
                    "When practical, choose walking, cycling or public transport instead of a higher-emission travel option.",

                plan:
                    "Choose one practical journey where you can use a lower-emission option. Repeat the habit whenever it works for you."
            },


            15: {
                name:
                    "Life on Land",

                tip:
                    "Small actions such as caring for plants, avoiding litter and respecting natural spaces can help protect nature.",

                plan:
                    "Choose one simple nature-friendly action each day, such as caring for a plant or keeping outdoor spaces free of litter."
            }

        };


        // ------------------------------------------
        // SHOW RESPONSE
        // ------------------------------------------

        function showResponse(
            title,
            text
        ) {

            responseBox.style.display =
                "block";


            responseBox.innerHTML =
                `
                <strong>
                    ${title}
                </strong>

                <p style="margin-top:8px;">
                    ${text}
                </p>
                `;

        }


        // ------------------------------------------
        // TIP BUTTON
        // ------------------------------------------

        tipButton.addEventListener(
            "click",
            function () {

                const result =
                    getLowestSDG();


                if (
                    !result ||
                    !coachData[result.sdg]
                ) {

                    showResponse(
                        "🌱 Your Coach",
                        "Complete your assessment first and I'll create a personalized sustainability tip for you."
                    );

                    return;

                }


                const data =
                    coachData[
                        result.sdg
                    ];


                showResponse(
                    `🌱 Coach Tip — SDG ${result.sdg}`,
                    `${data.tip} Your current score for ${data.name} is ${result.score}/100.`
                );

            }
        );


        // ------------------------------------------
        // MINI PLAN BUTTON
        // ------------------------------------------

        planButton.addEventListener(
            "click",
            function () {

                const result =
                    getLowestSDG();


                if (
                    !result ||
                    !coachData[result.sdg]
                ) {

                    showResponse(
                        "🎯 Your Mini Plan",
                        "Complete your assessment first and I'll create a personalized mini plan for you."
                    );

                    return;

                }


                const data =
                    coachData[
                        result.sdg
                    ];


                showResponse(
                    `🎯 Your Mini Plan — SDG ${result.sdg}`,
                    data.plan
                );

            }
        );

    }
);
// ==========================================
// SDG LIFE COMPASS
// ACCOUNT + USER PERFORMANCE SYSTEM
// ==========================================


// ==========================================
// GET CURRENT USER
// ==========================================

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("sdgUser")
    );

}


// ==========================================
// GET USER-SPECIFIC HISTORY KEY
// ==========================================

function getUserHistoryKey() {

    const user = getCurrentUser();

    if (!user) {
        return "sdgScoreHistory";
    }

    return `sdgScoreHistory_${user.email}`;

}


// ==========================================
// SIGN UP
// ==========================================

document.addEventListener(
    "submit",
    function (event) {

        if (
            event.target.id !== "signupForm"
        ) {
            return;
        }


        event.preventDefault();


        const nameInput =
            document.getElementById("name");

        const emailInput =
            document.getElementById("email");

        const passwordInput =
            document.getElementById("password");

        const confirmPasswordInput =
            document.getElementById(
                "confirmPassword"
            );


        if (
            !nameInput ||
            !emailInput ||
            !passwordInput ||
            !confirmPasswordInput
        ) {
            return;
        }


        const name =
            nameInput.value.trim();

        const email =
            emailInput.value
                .trim()
                .toLowerCase();

        const password =
            passwordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;


        if (
            password.length < 6
        ) {

            alert(
                "Password must be at least 6 characters."
            );

            return;
        }


        if (
            password !== confirmPassword
        ) {

            alert(
                "Passwords do not match."
            );

            return;
        }


        const existingUser =
            JSON.parse(
                localStorage.getItem(
                    "sdgUser"
                )
            );


        if (
            existingUser &&
            existingUser.email === email
        ) {

            alert(
                "An account with this email already exists."
            );

            return;
        }


        const user = {

            name: name,

            email: email,

            password: password

        };


        localStorage.setItem(
            "sdgUser",
            JSON.stringify(user)
        );


        // Log the new user in

        localStorage.setItem(
            "sdgLoggedIn",
            "true"
        );


        // Create an empty performance history
        // specifically for this user

        localStorage.setItem(
            `sdgScoreHistory_${email}`,
            JSON.stringify([])
        );


        // Clear old generic performance data
        // so it cannot accidentally appear
        // as this user's data

        localStorage.removeItem(
            "sdgScoreHistory"
        );


        localStorage.removeItem(
            "sdgAnswers"
        );


        localStorage.removeItem(
            "sdgOverallScore"
        );


        alert(
            `Welcome to SDG Life Compass, ${name}! 🌍`
        );


        window.location.href =
            "../index.html";

    }
);


// ==========================================
// LOGIN
// ==========================================

document.addEventListener(
    "submit",
    function (event) {

        if (
            event.target.id !== "loginForm"
        ) {
            return;
        }


        event.preventDefault();


        const emailInput =
            event.target.querySelector(
                'input[type="email"]'
            );

        const passwordInput =
            event.target.querySelector(
                'input[type="password"]'
            );


        if (
            !emailInput ||
            !passwordInput
        ) {
            return;
        }


        const email =
            emailInput.value
                .trim()
                .toLowerCase();

        const password =
            passwordInput.value;


        const savedUser =
            JSON.parse(
                localStorage.getItem(
                    "sdgUser"
                )
            );


        if (!savedUser) {

            alert(
                "No account found. Please create an account first."
            );

            return;
        }


        if (
            email !== savedUser.email ||
            password !== savedUser.password
        ) {

            alert(
                "Incorrect email or password."
            );

            return;
        }


        // Mark user as logged in

        localStorage.setItem(
            "sdgLoggedIn",
            "true"
        );


        // Load this user's performance history

        const userHistoryKey =
            `sdgScoreHistory_${savedUser.email}`;


        if (
            !localStorage.getItem(
                userHistoryKey
            )
        ) {

            localStorage.setItem(
                userHistoryKey,
                JSON.stringify([])
            );

        }


        alert(
            `Welcome back, ${savedUser.name}! 🌱`
        );


        window.location.href =
            "../index.html";

    }
);


// ==========================================
// LOGOUT
// ==========================================

function logoutUser() {

    localStorage.removeItem(
        "sdgLoggedIn"
    );


    // Keep account + performance history saved

    window.location.href =
        "login.html";

}


// ==========================================
// SAVE CURRENT PERFORMANCE TO USER ACCOUNT
// ==========================================

function saveUserPerformance(
    score,
    answers
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
            localStorage.getItem(
                historyKey
            )
        ) || [];


    const today =
        new Date();


    const dateString =
        today
            .toISOString()
            .split("T")[0];


    history.push({

        date: dateString,

        score: score,

        answers: answers

    });


    localStorage.setItem(
        historyKey,
        JSON.stringify(history)
    );

}


// ==========================================
// KEEP USER-SPECIFIC HISTORY AVAILABLE TO
// THE EXISTING DASHBOARD
// ==========================================

function loadUserHistoryIntoDashboard() {

    const user =
        getCurrentUser();


    if (!user) {
        return [];
    }


    const historyKey =
        `sdgScoreHistory_${user.email}`;


    return JSON.parse(
        localStorage.getItem(
            historyKey
        )
    ) || [];

}
// ==========================================
// SAVE USER-SPECIFIC PERFORMANCE
// ==========================================

function saveUserPerformance(score, answers) {

    const user =
        JSON.parse(
            localStorage.getItem("sdgUser")
        );

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

        score: score,

        answers: answers

    });

    localStorage.setItem(
        historyKey,
        JSON.stringify(history)
    );
}
// ==========================================
// SIGN UP
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const signupForm =
        document.getElementById("signupForm");

    if (!signupForm) {
        return;
    }

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim().toLowerCase();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;
        }


        const user = {
            name: name,
            email: email,
            password: password
        };


        localStorage.setItem(
            "sdgUser",
            JSON.stringify(user)
        );


        alert("Account created successfully! 🎉");


        window.location.href =
            "login.html";

    });

});
// ==========================================
// LOGIN
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const loginForm =
        document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email =
            document
                .getElementById("email")
                .value
                .trim()
                .toLowerCase();

        const password =
            document
                .getElementById("password")
                .value;


        const savedUser =
            JSON.parse(
                localStorage.getItem("sdgUser")
            );


        // No account found

        if (!savedUser) {

            alert(
                "No account found. Please create an account first."
            );

            return;
        }


        // Check login details

        if (
            email !== savedUser.email ||
            password !== savedUser.password
        ) {

            alert(
                "Incorrect email or password."
            );

            return;
        }


        // Login successful

        localStorage.setItem(
            "sdgLoggedIn",
            "true"
        );


        alert(
            `Welcome back, ${savedUser.name}! 🌍`
        );


        window.location.href =
            "dashboard.html";

    });

});
// ==========================================
// LOGOUT
// ==========================================

function logoutUser() {

    localStorage.removeItem("sdgLoggedIn");

    window.location.href = "login.html";
}