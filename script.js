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
