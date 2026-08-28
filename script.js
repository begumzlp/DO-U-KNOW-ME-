// ==========================================
// 1. GENEL ARAYÜZ VE MENÜ FONKSİYONLARI
// ==========================================

function showWelcome() {
    alert("Welcome to Miriy's Universe ✨");
}

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    });
});

const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) { 
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

if (themeToggle) { 
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

// ==========================================
// 2. MODAL VE AÇILIR PENCERELER
// ==========================================

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
    if (lightbox) lightbox.style.display = "none";
}

function openCV() {
    const cvModal = document.getElementById("cv-modal");
    if (cvModal) cvModal.style.display = "flex";
}

function closeCV(e) {
    const cvModal = document.getElementById("cv-modal");
    if (cvModal) {
        if (e.target.id === "cv-modal" || e.target.classList.contains("close-lightbox")) {
            cvModal.style.display = "none";
        }
    }
}

const travelAlbums = {
    makedonya: "", 
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

function openAlbum(countryId) {
    const albumLink = travelAlbums[countryId];
    if (albumLink && albumLink !== "") {
        window.open(albumLink, '_blank');
    } else {
        alert("Bu gezinin fotoğrafları çok yakında yüklenecek! 📸");
    }
}
// ==========================================
// JSON'DAN VERİ ÇEKME VE LİSTELEME
// ==========================================

let allWordsArray = [];
let kdramaArray = []; // Dizileri hafızada tutacağımız liste

async function loadUniverseData() {
    try {
        const response = await fetch("data.json");
        if (!response.ok) throw new Error("JSON dosyası bulunamadı");
        
        const data = await response.json();
        
        // 1. Kelimeleri Yükle
        if (data.allWords) {
            const allCategories = data.allWords;
            for (let category in allCategories) {
                allWordsArray = allWordsArray.concat(allCategories[category]);
            }
            if (typeof newRandomWord === "function") newRandomWord();
        }

        // 2. Dizileri Sadece Hafızaya Al (Ekrana basma)
        if (data.kdramaData) {
            kdramaArray = data.kdramaData;
        }

    } catch (error) {
        console.error("Veri çekilemedi: ", error);
        const wordEl = document.getElementById("koreanWord");
        if (wordEl) wordEl.textContent = "⚠️ Hata: data.json bulunamadı";
    }
}

// 🇰🇷 KDrama Kütüphanesini Açan Fonksiyon
window.openKDramas = function() {
    const modal = document.getElementById("kdrama-modal");
    const container = document.getElementById("kdrama-content");
    
    if (!modal || !container) return;

    container.innerHTML = ""; // İçini temizle

    if (kdramaArray.length === 0) {
        container.innerHTML = "<p style='color:white; grid-column: 1 / -1; text-align:center;'>Diziler yükleniyor veya bulunamadı...</p>";
    } else {
        // Hafızadaki dizileri kartlara dönüştür
        kdramaArray.forEach(drama => {
            const card = document.createElement("div");
            card.className = "card";
            card.style.padding = "15px";
            card.innerHTML = `
                <img src="${drama.afis}" alt="${drama.title}" style="width:100%; height:250px; object-fit:cover; border-radius: 10px; margin-bottom: 10px;">
                <h3 style="font-size: 1.1rem; margin-bottom:5px; color:#f5d0fe;">📺 ${drama.title}</h3>
                <p style="color: var(--pink); font-size:0.9rem; font-weight: bold;">📅 ${drama.year} | 🎬 ${drama.episodes} Blm</p>
                <p style="font-size: 0.8rem; color: var(--text-soft); margin-top:5px;">👥 ${drama.cast}</p>
            `;
            container.appendChild(card);
        });
    }
    
    modal.style.display = "flex"; // Pencereyi görünür yap
};

// ❌ KDrama Kütüphanesini Kapatan Fonksiyon
window.closeKDrama = function(e) {
    const modal = document.getElementById("kdrama-modal");
    if (modal && (e.target.id === "kdrama-modal" || e.target.classList.contains("close-lightbox"))) {
        modal.style.display = "none";
    }
};

// Sayfa yüklendiğinde verileri çek
document.addEventListener("DOMContentLoaded", () => {
    loadUniverseData();
});


// Rastgele Kelime Fonksiyonu
window.newRandomWord = function() {
    if (allWordsArray.length === 0) return;
    
    const randomWord = allWordsArray[Math.floor(Math.random() * allWordsArray.length)];
    
    const wordEl = document.getElementById("koreanWord");
    const pronEl = document.getElementById("koreanPronunciation");
    const meanEl = document.getElementById("koreanMeaning");
    const exEl = document.getElementById("koreanExample");
    const exPronEl = document.getElementById("koreanExamplePronunciation");
    const exTrEl = document.getElementById("koreanExampleTr");

    if (wordEl) wordEl.textContent = randomWord.korece;
    if (pronEl) pronEl.textContent = "[" + randomWord.okunus + "]";
    if (meanEl) meanEl.textContent = randomWord.turkce;
    
    if (exEl) exEl.textContent = randomWord.ornek;
    if (exPronEl) exPronEl.textContent = "[" + randomWord.ornekOkunus + "]";
    if (exTrEl) exTrEl.textContent = randomWord.ornekTr;
};

// KDrama Render Fonksiyonu
function renderKDramas(dramas) {
    const dramaContainer = document.getElementById("kdrama-list");
    if (!dramaContainer) return;

    dramaContainer.innerHTML = ""; 

    dramas.forEach(drama => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${drama.afis}" alt="${drama.title}" style="width:100%; height:320px; object-fit:cover; border-radius: 15px; margin-bottom: 15px;">
            <h3>📺 ${drama.title}</h3>
            <p style="color: var(--pink); font-weight: bold; margin-bottom: 5px;">📅 ${drama.year} | 🎬 ${drama.episodes} Bölüm</p>
            <p style="font-size: 0.9rem; color: var(--text-soft);">👥 <b>Oyuncular:</b> ${drama.cast}</p>
        `;
        dramaContainer.appendChild(card);
    });
}

// ==========================================
// 4. SAYFA YÜKLENDİĞİNDE ÇALIŞACAKLAR
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    loadUniverseData();
});
