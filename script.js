// ==========================================
// 1. GENEL ARAYÜZ, MENÜ VE ETKİLEŞİM FONKSİYONLARI
// ==========================================

function showWelcome() {
    alert("Welcome to Miriy's Universe ✨");
}

// Hamburger Menü Aç/Kapat
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    if (navLinks) {
        navLinks.classList.toggle("active");
    }
}

// Easter Egg: Kedicik Efekti
window.meowEffect = function() {
    alert("Meow! 🐾 Welcome to my secret corner, fellow cat lover! (Cats & Soup vibes 🐱🥣)");
};

// Konfetili Beğeni Butonu (Appreciate Button)
window.triggerConfetti = function() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
    
    const likeCountEl = document.getElementById("like-count");
    if (likeCountEl) {
        let currentLikes = parseInt(likeCountEl.textContent);
        likeCountEl.textContent = currentLikes + 1;
    }
};

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function(e) {
        // Eğer harici bir sayfa değilse yumuşak kaydır
        const targetId = this.getAttribute("href");
        if (targetId.startsWith("#")) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
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
// 3. TEK JSON DOSYASINDAN VERİ ÇEKME & KDRAMA FİLTRELEME
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

function displayDramas(list) {
    const grid = document.getElementById("drama-grid");
    if (!grid) return;
    grid.innerHTML = "";

    list.forEach(drama => {
        const card = document.createElement("div");
        card.className = "card drama-card-item";
        card.style.padding = "15px";
        card.innerHTML = `
            <img src="${drama.afis}" alt="${drama.title}" style="width:100%; height:250px; object-fit:cover; border-radius: 10px; margin-bottom: 10px;">
            <h3 style="font-size: 1.1rem; margin-bottom:5px; color:#f5d0fe;">📺 ${drama.title}</h3>
            <p style="color: var(--pink); font-size:0.9rem; font-weight: bold;">📅 ${drama.year} | 🎬 ${drama.episodes} Eps</p>
            <p style="font-size: 0.8rem; color: var(--text-soft); margin-top:5px;">👥 ${drama.cast}</p>
        `;
        card.onclick = () => openDetailModal(drama);
        grid.appendChild(card);
    });
}

function openDetailModal(drama) {
    const modal = document.getElementById("detail-modal");
    const content = document.getElementById("detail-modal-content");
    
    if (!modal || !content) return;

    content.innerHTML = `
        <img src="${drama.afis}" alt="${drama.title}" style="width:100%; height:280px; object-fit:cover; border-radius: 15px; margin-bottom: 15px;">
        <h2 style="color: var(--pink); margin-bottom: 10px;">${drama.title}</h2>
        <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 10px;">Release Year: ${drama.year} | Episodes: ${drama.episodes}</p>
        <p style="color: var(--text-soft); margin-bottom: 15px;"><b>Cast:</b> ${drama.cast}</p>
        <p style="font-size: 0.95rem; line-height: 1.6; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px;">
            ✨ Selected masterpiece in Miriy's Universe drama archive.
        </p>
    `;
    modal.style.display = "flex";
}

window.closeDetailModal = function(e) {
    const modal = document.getElementById("detail-modal");
    if (modal && (e.target.id === "detail-modal" || e.target.classList.contains("close-lightbox"))) {
        modal.style.display = "none";
    }
};

window.filterAndSortDramas = function() {
    const input = document.getElementById("dramaSearch").value.toLowerCase();
    const filtered = kdramaArray.filter(drama => 
        drama.title.toLowerCase().includes(input) || drama.cast.toLowerCase().includes(input)
    );
    displayDramas(filtered);
};

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
// 4. GİTHUB REPO WİDGET & LAST.FM WİDGET
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

async function fetchNowPlaying() {
    const username = "YOUR_LASTFM_USERNAME"; 
    const apiKey = "2ef3d76e73a652613b53c7c777422f25"; 
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

    const trackNameEl = document.getElementById("track-name");
    const artistNameEl = document.getElementById("artist-name");
    const trackArtEl = document.getElementById("track-art");

    if (!trackNameEl) return;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("API error");

        const data = await response.json();
        const latestTrack = data.recenttracks.track[0];

        if (latestTrack) {
            trackNameEl.textContent = latestTrack.name;
            artistNameEl.textContent = latestTrack.artist["#text"];
            
            if (latestTrack.image && latestTrack.image[2]["#text"]) {
                trackArtEl.src = latestTrack.image[2]["#text"];
            }

            if (latestTrack["@attr"] && latestTrack["@attr"].nowplaying === "true") {
                artistNameEl.textContent = "▶️ Now Playing: " + latestTrack.artist["#text"];
            }
        }
    } catch (error) {
        trackNameEl.textContent = "Brand New";
        artistNameEl.textContent = "Xiumin (EXO)";
        trackArtEl.src = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=200";
    }
}


// ==========================================
// 5. SAYFA YÜKLENDİĞİNDE ÇALIŞACAKLAR
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    loadUniverseData();
    fetchGitHubRepos();
    fetchNowPlaying();
    setInterval(fetchNowPlaying, 30000);
});
