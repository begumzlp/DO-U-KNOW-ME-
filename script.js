function showWelcome() {
    alert("Welcome to Miriy's Universe ✨");
}

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", function(e) {

        e.preventDefault();

        const targetId = this.getAttribute("href");

        document.querySelector(targetId).scrollIntoView({
            behavior: "smooth"
        });

    });

});

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });

});

const words = [
    {
        korean: "사랑",
        meaning: "Love ❤️"
    },
    {
        korean: "행복",
        meaning: "Happiness 🌸"
    },
    {
        korean: "꿈",
        meaning: "Dream ✨"
    },
    {
        korean: "친구",
        meaning: "Friend 👭"
    },
    {
        korean: "희망",
        meaning: "Hope 🌙"
    }
];

const randomWord =
words[Math.floor(Math.random() * words.length)];

document.getElementById("koreanWord").textContent =
randomWord.korean;

document.getElementById("koreanMeaning").textContent =
randomWord.meaning;
