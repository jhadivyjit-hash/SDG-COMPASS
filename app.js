
// ==========================================
// RESULTS PAGE
// CALCULATE INDIVIDUAL SDG SCORES
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const overallScoreElement =
        document.getElementById("overallScore");

    // Only run this code on results.html
    if (!overallScoreElement) {
        return;
    }

    const savedAnswers =
        JSON.parse(localStorage.getItem("sdgAnswers"));

    const savedOverallScore =
        localStorage.getItem("sdgOverallScore");

    if (!savedAnswers) {
        overallScoreElement.textContent = "--";
        return;
    }

    // Show overall score
    const overallScore =
        Number(savedOverallScore);

    overallScoreElement.textContent =
        overallScore;

    updateScoreMessage(overallScore);

    calculateSDGScores(savedAnswers);

});


// ==========================================
// SCORE MESSAGE
// ==========================================

function updateScoreMessage(score) {

    const message =
        document.getElementById("scoreMessage");

    const description =
        document.getElementById("scoreDescription");

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
            "Every sustainable habit begins with one action. Use the suggestions below to start improving.";

    }

}


// ==========================================
// INDIVIDUAL SDG SCORES
// ==========================================

function calculateSDGScores(savedAnswers) {

    const sdgTotals = {};

    const sdgCounts = {};


    // Collect scores for every SDG
    savedAnswers.forEach(function (answerIndex, questionIndex) {

        if (answerIndex === null) {
            return;
        }

        const question =
            questions[questionIndex];

        const score =
            question.options[answerIndex].score;


        if (!sdgTotals[question.sdg]) {
            sdgTotals[question.sdg] = 0;
            sdgCounts[question.sdg] = 0;
        }


        sdgTotals[question.sdg] += score;

        sdgCounts[question.sdg]++;

    });


    // Convert each SDG score to percentage
    Object.keys(sdgTotals).forEach(function (sdg) {

        const percentage =
            Math.round(
                (sdgTotals[sdg] /
                    (sdgCounts[sdg] * 4)) * 100
            );

        displaySDGScore(
            sdg,
            percentage
        );

    });


    // Generate recommendation
    generateRecommendation(sdgTotals, sdgCounts);

}


// ==========================================
// DISPLAY SDG SCORE
// ==========================================

function displaySDGScore(sdg, score) {

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


    if (!recommendationElement) {
        return;
    }


    let lowestSDG = null;

    let lowestScore = 101;


    Object.keys(sdgTotals).forEach(function (sdg) {

        const score =
            Math.round(
                (sdgTotals[sdg] /
                    (sdgCounts[sdg] * 4)) * 100
            );


        if (score < lowestScore) {

            lowestScore = score;

            lowestSDG = Number(sdg);

        }

    });


    const recommendations = {

        3:
            "Try building a consistent routine around physical activity, rest and healthy daily habits.",

        4:
            "Set aside a little time each day for learning, reading or developing a useful skill.",

        6:
            "Try reducing unnecessary water use, such as keeping taps off while they are not needed.",

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


    if (lowestSDG && recommendations[lowestSDG]) {

        recommendationElement.textContent =
            `Your current area with the most room for improvement is SDG ${lowestSDG}. ${recommendations[lowestSDG]}`;

    }

}