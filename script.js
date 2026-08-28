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
    if (lightbox && lightboxImg) {
        lightbox.style.display = "flex";
        lightboxImg.src = src;
    }
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.style.display = "none";
    }
}

// --- CV Açılır Ekran (Modal) ---
function openCV() {
    const cvModal = document.getElementById("cv-modal");
    if (cvModal) {
        cvModal.style.display = "flex";
    }
}

function closeCV(e) {
    const cvModal = document.getElementById("cv-modal");
    if (cvModal) {
        // Sadece siyah arka plana veya çarpı işaretine tıklandığında kapat
        if (e.target.id === "cv-modal" || e.target.classList.contains("close-lightbox")) {
            cvModal.style.display = "none";
        }
    }
}

// --- Gezi Albümleri Bulut Linkleri ---
// Buraya Google Photos, Drive veya Yandex Disk'ten aldığın "Bağlantıyı Paylaş" linklerini yapıştır.
const travelAlbums = {
    makedonya: "", // Örn: "https://photos.app.goo.gl/..."
    sirbistan: "",
    karadag: "",
    bosna: "",
    kosova: "",
    arnavutluk: "",
    antalya: "", 
    aydin: "",
    karabuk: "",
    bartin: "",
    istanbul: "",
    balikesir: "",
    zonguldak: ""
};

// Albümü Açan Fonksiyon
function openAlbum(countryId) {
    const albumLink = travelAlbums[countryId];
    
    if (albumLink && albumLink !== "") {
        // Link varsa yeni sekmede albümü aç
        window.open(albumLink, '_blank');
    } else {
        // Link yoksa uyarı ver
        alert("Bu gezinin fotoğrafları çok yakında yüklenecek! 📸");
    }
}

// --- Tema Değiştirici (Dark / Pink Mode) ---
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

if (themeToggle) { // Hata almamak için element kontrolü
    // Kayıtlı temayı kontrol et
    if (localStorage.getItem("theme") === "pink") {
        body.classList.add("pink-theme");
        themeToggle.textContent = "🌌";
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("pink-theme");
        
        if (body.classList.contains("pink-theme")) {
            localStorage.setItem("theme", "pink");
            themeToggle.textContent = "🌌"; 
        } else {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "🌸"; 
        }
    });
}

// --- Yukarı Çık Butonu (Back to Top) ---
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) { // Hata almamak için element kontrolü
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
}
