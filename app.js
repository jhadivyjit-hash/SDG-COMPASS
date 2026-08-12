// ============================================
// SDG LIFE COMPASS
// Main JavaScript File
// ============================================

console.log("SDG Life Compass is running!");

document.addEventListener("DOMContentLoaded", function () {

    console.log("Website loaded successfully.");

    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (targetId === "#") {
                event.preventDefault();
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });
            }

        });

    });


    // Start Your Journey buttons
    const journeyButtons = document.querySelectorAll(".primary-btn");

    journeyButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const impactSection = document.querySelector("#impact");

            if (impactSection) {
                impactSection.scrollIntoView({
                    behavior: "smooth"
                });
            }

        });

    });

});