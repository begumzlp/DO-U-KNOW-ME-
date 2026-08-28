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
// --- Lightbox (Galeri Fotoğraf Büyütme) ---
function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightbox.style.display = "flex";
    lightboxImg.src = src;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// --- Tema Değiştirici (Dark / Pink Mode) ---
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Kayıtlı temayı kontrol et
if (localStorage.getItem("theme") === "pink") {
    body.classList.add("pink-theme");
    themeToggle.textContent = "🌌";
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("pink-theme");
    
    if (body.classList.contains("pink-theme")) {
        localStorage.setItem("theme", "pink");
        themeToggle.textContent = "🌌"; // Karanlık temaya dön simgesi
    } else {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "🌸"; // Pembe temaya dön simgesi
    }
});

// --- Yukarı Çık Butonu (Back to Top) ---
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add("visible");
    } else {
        backToTopBtn.classList.remove("visible");
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
