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
// --- Yerel JSON Dosyasından Dizi Verilerini Çekme ---
async function fetchKDramas() {
    const dramaContainer = document.getElementById("kdrama-list");
    if (!dramaContainer) return;

    try {
        // Aynı klasördeki dramas.json dosyasını okur
        const response = await fetch("dramas.json");
        
        if (!response.ok) {
            throw new Error("Veri çekilemedi");
        }
        
        const dramas = await response.json();
        dramaContainer.innerHTML = ""; // Yükleniyor yazısını temizle

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

document.addEventListener("DOMContentLoaded", fetchKDramas);

let allWordsArray = [];

// data.json dosyasından tüm verileri çekme
async function loadUniverseData() {
    try {
        const response = await fetch("data.json");
        if (!response.ok) throw new Error("JSON dosyası bulunamadı");
        
        const data = await response.json();
        
        // JSON içindeki tüm kategorileri tek bir listede birleştir
        const allCategories = data.allWords;
        for (let category in allCategories) {
            allWordsArray = allWordsArray.concat(allCategories[category]);
        }
        
        // Veriler yüklenir yüklenmez ilk kelimeyi ekrana getir
        newRandomWord();

        // NOT: İleride kdramaData, kpopData vs. için olan kodları da bu bloğa ekleyeceğiz!

    } catch (error) {
        console.error("Veri çekilemedi: ", error);
        document.getElementById("koreanWord").textContent = "⚠️ Hata";
        document.getElementById("koreanMeaning").textContent = "data.json dosyası bulunamadı!";
    }
}

// Rastgele kelime seçip HTML'e yazdırma fonksiyonu
function newRandomWord() {
    if (allWordsArray.length === 0) return;
    
    // Yüzlerce kelimenin içinden rastgele birini seç
    const randomWord = allWordsArray[Math.floor(Math.random() * allWordsArray.length)];
    
    // HTML'deki yerlerine yerleştir
    document.getElementById("koreanWord").textContent = randomWord.korece;
    document.getElementById("koreanPronunciation").textContent = "[" + randomWord.okunus + "]";
    document.getElementById("koreanMeaning").textContent = randomWord.turkce;
    
    document.getElementById("koreanExample").textContent = randomWord.ornek;
    document.getElementById("koreanExamplePronunciation").textContent = "[" + randomWord.ornekOkunus + "]";
    document.getElementById("koreanExampleTr").textContent = randomWord.ornekTr;
}

// Sayfa açıldığında verileri yükle
document.addEventListener("DOMContentLoaded", loadUniverseData);
