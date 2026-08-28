// ==========================================
// 1. GENEL ARAYÜZ VE MENÜ FONKSİYONLARI
// ==========================================

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
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Yukarı Çık Butonu (Back to Top)
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

// Tema Değiştirici (Dark / Pink Mode)
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

// Lightbox (Galeri Fotoğraf Büyütme)
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

// CV Açılır Ekran (Modal)
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

// Gezi Albümleri Bulut Linkleri
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
// 3. JSON VERİ ÇEKME FONKSİYONLARI (Kelime & Dizi)
// ==========================================

let allWordsArray = [];

// A. data.json'dan Kelimeleri Çekme
async function loadUniverseData() {
    try {
        const response = await fetch("data.json");
        if (!response.ok) throw new Error("JSON dosyası bulunamadı");
        
        const data = await response.json();
        
        if (data.allWords) {
            const allCategories = data.allWords;
            for (let category in allCategories) {
                allWordsArray = allWordsArray.concat(allCategories[category]);
            }
            newRandomWord(); // İlk kelimeyi yükle
        }
    } catch (error) {
        console.error("Veri çekilemedi: ", error);
        const wordEl = document.getElementById("koreanWord");
        if (wordEl) wordEl.textContent = "⚠️ Hata: data.json eksik";
    }
}

// Global (Her yerden ulaşılabilir) Rastgele Kelime Fonksiyonu
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

// B. dramas.json'dan Dizi Çekme
async function fetchKDramas() {
    const dramaContainer = document.getElementById("kdrama-list");
    if (!dramaContainer) return;

    try {
        const response = await fetch("dramas.json");
        if (!response.ok) throw new Error("Veri çekilemedi");
        
        const dramas = await response.json();
        dramaContainer.innerHTML = ""; 

        dramas.forEach(drama => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <h3>📺 ${drama.title}</h3>
                <p>⭐ ${drama.rating}/10</p>
                <p style="font-size: 0.9rem; margin-top: 10px; color: var(--text-soft);">${drama.review}</p>
            `;
            dramaContainer.appendChild(card);
        });

    } catch (error) {
        dramaContainer.innerHTML = `
            <div class="card" style="text-align:center; width:100%;">
                <h3>Dosya Bulunamadı ⚠️</h3>
                <p>Lütfen ana klasöre dramas.json dosyasını eklediğinden emin ol.</p>
            </div>
        `;
    }
}

// ==========================================
// 4. SAYFA YÜKLENDİĞİNDE ÇALIŞACAKLAR
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    loadUniverseData();
    fetchKDramas();
});
