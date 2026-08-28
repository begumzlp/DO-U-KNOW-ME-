// ==========================================
// 1. GENEL ARAYÜZ VE MENÜ FONKSİYONLARI
// ==========================================

function showWelcome() {
    alert("Welcome to Miriy's Universe ✨");
}

// Easter Egg: Kedicik Efekti (Global Scope)
window.meowEffect = function() {
    alert("Meow! 🐾 Welcome to my secret corner, fellow cat lover! (Cats & Soup vibes 🐱🥣)");
};

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
        alert("Photos for this trip will be uploaded soon! 📸");
    }
}


// ==========================================
// 3. TEK JSON DOSYASINDAN VERİ ÇEKME (data.json)
// ==========================================

let allWordsArray = [];
let kdramaArray = [];

async function loadUniverseData() {
    try {
        const response = await fetch("data.json");
        if (!response.ok) throw new Error("JSON file not found");
        
        const data = await response.json();
        
        if (data.allWords) {
            const allCategories = data.allWords;
            for (let category in allCategories) {
                allWordsArray = allWordsArray.concat(allCategories[category]);
            }
            newRandomWord();
        }

        if (data.kdramaData) {
            kdramaArray = data.kdramaData;
        }

    } catch (error) {
        console.error("Data could not be loaded: ", error);
        const wordEl = document.getElementById("koreanWord");
        if (wordEl) wordEl.textContent = "⚠️ Error: data.json missing";
    }
}

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
// KDrama Modalını Açma ve Kartları Listeleme
window.openKDramas = function() {
    const modal = document.getElementById("kdrama-modal");
    const grid = document.getElementById("drama-grid");
    
    if (!modal || !grid) return;

    grid.innerHTML = ""; 

    if (kdramaArray.length === 0) {
        grid.innerHTML = "<p style='color:white; grid-column: 1 / -1; text-align:center;'>Loading dramas...</p>";
    } else {
        displayDramas(kdramaArray);
    }
    
    modal.style.display = "flex"; 
};

window.closeKDrama = function(e) {
    const modal = document.getElementById("kdrama-modal");
    if (modal && (e.target.id === "kdrama-modal" || e.target.classList.contains("close-lightbox"))) {
        modal.style.display = "none";
    }
};

// Dizileri Ekrana Basma (Tıklama Özelliği Eklendi)
function displayDramas(list) {
    const grid = document.getElementById("drama-grid");
    if (!grid) return;
    grid.innerHTML = "";

    list.forEach((drama, index) => {
        const card = document.createElement("div");
        card.className = "card drama-card-item";
        card.style.padding = "15px";
        card.innerHTML = `
            <img src="${drama.afis}" alt="${drama.title}" style="width:100%; height:250px; object-fit:cover; border-radius: 10px; margin-bottom: 10px;">
            <h3 style="font-size: 1.1rem; margin-bottom:5px; color:#f5d0fe;">📺 ${drama.title}</h3>
            <p style="color: var(--pink); font-size:0.9rem; font-weight: bold;">📅 ${drama.year} | 🎬 ${drama.episodes} Eps</p>
            <p style="font-size: 0.8rem; color: var(--text-soft); margin-top:5px;">👥 ${drama.cast}</p>
        `;
        
        // Karta tıklandığında Rich Data Modal açılır
        card.onclick = () => openDetailModal(drama);
        grid.appendChild(card);
    });
}

// 🌟 Rich Data Modal (Detay Penceresi) Açma
function openDetailModal(drama) {
    const modal = document.getElementById("detail-modal");
    const content = document.getElementById("detail-modal-content");
    
    if (!modal || !content) return;

    content.innerHTML = `
        <img src="${drama.afis}" alt="${drama.title}">
        <h2 style="color: var(--pink); margin-bottom: 10px;">${drama.title}</h2>
        <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 10px;">Release Year: ${drama.year} | Episodes: ${drama.episodes}</p>
        <p style="color: var(--text-soft); margin-bottom: 15px;"><b>Cast:</b> ${drama.cast}</p>
        <p style="font-size: 0.95rem; line-height: 1.6; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px;">
            ✨ This is one of the selected masterpieces in Miriy's Universe drama archive. Enjoy the amazing storyline and unforgettable chemistry!
        </p>
    `;

    modal.style.display = "flex";
}

// Detay Modalını Kapatma
window.closeDetailModal = function(e) {
    const modal = document.getElementById("detail-modal");
    if (modal && (e.target.id === "detail-modal" || e.target.classList.contains("close-lightbox"))) {
        modal.style.display = "none";
    }
};

// Canlı Arama ve Filtreleme Fonksiyonu
window.filterAndSortDramas = function() {
    const input = document.getElementById("dramaSearch").value.toLowerCase();
    const filtered = kdramaArray.filter(drama => 
        drama.title.toLowerCase().includes(input) || drama.cast.toLowerCase().includes(input)
    );
    displayDramas(filtered);
};

// Sıralama Algoritmaları (YENİ)
window.sortDramas = function(criteria) {
    let sorted = [...kdramaArray];
    
    if (criteria === 'newest') {
        sorted.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    } else if (criteria === 'title') {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === 'episodes') {
        sorted.sort((a, b) => parseInt(b.episodes) - parseInt(a.episodes));
    }

    displayDramas(sorted);
};



// ==========================================
// 4. GİTHUB REPO WİDGET
// ==========================================

async function fetchGitHubRepos() {
    const repoContainer = document.getElementById("github-repos");
    if (!repoContainer) return;

    try {
        const response = await fetch("https://api.github.com/users/begumzlp/repos?sort=updated&per_page=6");
        if (!response.ok) throw new Error("GitHub API error");

        const repos = await response.json();
        repoContainer.innerHTML = "";

        repos.forEach(repo => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <h3>📁 ${repo.name}</h3>
                <p style="font-size: 0.9rem; margin: 10px 0; color: var(--text-soft);">${repo.description || "No description provided."}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                    <span style="font-size: 0.8rem; color: var(--pink);">⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</span>
                    <a href="${repo.html_url}" target="_blank" class="contact-link" style="font-size: 0.85rem;">View Code ➔</a>
                </div>
            `;
            repoContainer.appendChild(card);
        });
    } catch (error) {
        repoContainer.innerHTML = `
            <div class="card" style="text-align: center; width: 100%;">
                <h3>Could not load GitHub projects ⚠️</h3>
                <p style="color: var(--text-soft);">Please check your internet connection.</p>
            </div>
        `;
    }
}


// ==========================================
// 5. SAYFA YÜKLENDİĞİNDE ÇALIŞACAKLAR
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    loadUniverseData();
    fetchGitHubRepos();
});
