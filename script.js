// Karşılama Butonu
function showWelcome() {
    alert("Welcome to Miriy's Universe ✨");
}

// Menü linkleri için yumuşak kaydırma (Smooth Scroll)
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        
        // Eğer hedef bölüm sayfada varsa oraya kaydır
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Korece Günün Kelimesi
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

// Rastgele kelime seçimi
const randomWord = words[Math.floor(Math.random() * words.length)];

// HTML'deki elementleri bul ve metinleri değiştir
const wordElement = document.getElementById("koreanWord");
const meaningElement = document.getElementById("koreanMeaning");

if (wordElement && meaningElement) {
    wordElement.textContent = randomWord.korean;
    meaningElement.textContent = randomWord.meaning;
}
