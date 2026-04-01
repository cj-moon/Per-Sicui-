// ==========================================
// 1. LOADER & SETUP INIZIALE
// ==========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) loader.classList.add("loader-open");
        setTimeout(() => { 
            document.body.style.overflow = "auto"; 
        }, 1000);
    }, 2500); 
});

// ==========================================
// 2. LOGICA BOTTONI (Yes / No)
// ==========================================
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
let noCount = 0;

function moveNoButton() {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    
    noBtn.style.position = "fixed";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.zIndex = "100";
    
    noCount++;
    let size = 24 + (noCount * 5);
    if (size > 100) size = 100; 
    yesBtn.style.fontSize = `${size}px`;
    yesBtn.classList.add("pulsing-yes");
}

noBtn.onmouseover = moveNoButton;
noBtn.ontouchstart = (e) => { e.preventDefault(); moveNoButton(); };

yesBtn.onclick = function() {
    const title = document.getElementById("title");
    const mainGif = document.getElementById("mainGif");
    
    for (let i = 0; i < 30; i++) {
        createHeartExplosion();
    }

    document.getElementById("buttons").style.display = "none";
    document.getElementById("gifts-section").style.display = "flex";
    
    title.innerHTML = "chose ur path <3";
    mainGif.src = "https://i.pinimg.com/originals/6b/1e/b7/6b1eb75915c0359234e21b6557120279.gif";
};

function createHeartExplosion() {
    const heart = document.createElement('div');
    heart.className = 'heart-explosion';
    heart.innerHTML = '❤️'; 
    
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    
    heart.style.left = startX + 'px';
    heart.style.top = startY + 'px';
    heart.style.position = 'fixed';
    
    document.body.appendChild(heart);
    
    const destinationX = (Math.random() - 0.5) * 800;
    const destinationY = (Math.random() - 0.5) * 800;
    const rotation = Math.random() * 360;

    setTimeout(() => {
        heart.style.transform = `translate(${destinationX}px, ${destinationY}px) rotate(${rotation}deg) scale(0)`;
        heart.style.opacity = '0';
        heart.style.transition = 'all 1s ease-out';
    }, 10);

    setTimeout(() => { heart.remove(); }, 1000);
}

// ==========================================
// 3. GESTIONE REGALI & MUSICA (YouTube API)
// ==========================================
let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'lY2yjAdbvdQ',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': 'lY2yjAdbvdQ'
        }
    });
}

function openGift(type) {
    const overlay = document.getElementById("gift-overlay");
    const displayArea = document.getElementById("display-area");
    
    overlay.style.display = "flex";
    window.scrollTo(0,0);

    let content = "";

    if (type === 'letter') {
        content = `
        <div class="letter-container">
            <div class="flower-deco deco-top-left">🌸</div>
            <div class="flower-deco deco-bottom-right">🌸</div>
            <h2 class="letter-title">For my Haku</h2> 
            <div class="letter-body">
                <p>Alla ragazza che ho conosciuto a caso su un server discord, alla mia attuale migliore amica...</p>
                <p style="font-style: italic; border-left: 2px solid #dcbfa6; padding-left: 10px;">
                    "You’re like the moon to me—quietly constant, gently glowing even on my darkest nights..."
                </p>
                <p>Grazie di esserci sempre! ✨</p>
            </div>
            <p class="letter-footer">Con immenso affetto, Cj ❤️</p>
        </div>`;
    } 
    else if (type === 'video') {
        if (player && player.playVideo) {
            player.playVideo();
            player.setVolume(50);
        }
        content = `
            <div class="box-caramello">
                <h2 style="font-family:'Dancing Script'; color:white;">Musica per te... ✨</h2>
                <p style="color:white;">Senti questo dolce suono? <br> È la nostra colonna sonora.</p>
                <div style="font-size: 50px; margin: 20px 0;">🎵</div>
                <p style="font-size:12px; color:white; opacity:0.8;">(La musica continuerà in sottofondo)</p>
                <button onclick="if(player) player.pauseVideo()" class="back-btn" style="font-size:10px; padding:5px 10px;">Pausa</button>
            </div>`;
    } 
    else if (type === 'surprise') {
        content = `
            <div class="slot-machine">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/021/276/728/small/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png" class="slot-cat">
                <h2 style="font-family:'Dancing Script'; color:#8e5d3e; margin-bottom:15px; position:relative; z-index:2;">Lucky for Haku! ✨</h2>
                <div class="slots">
                    <div id="slot1" class="slot">❤️</div>
                    <div id="slot2" class="slot">🐱</div>
                    <div id="slot3" class="slot">🌸</div>
                </div>
                <div id="slotMessage" class="slot-message">Tira la leva!</div>
                <div class="lever-container" onclick="runSlot()">
                    <div class="lever-base"></div>
                    <div id="leverArm" class="lever-arm"><div class="lever-ball"></div></div>
                </div>
            </div>`;
    }
    displayArea.innerHTML = content;
}

function closeGift() {
    const overlay = document.getElementById("gift-overlay");
    overlay.style.opacity = "0";
    setTimeout(() => {
        overlay.style.display = "none";
        overlay.style.opacity = "1";
    }, 300);
}

// ==========================================
// 4. ELEMENTI CADENTI & CLICK
// ==========================================
function createFallingItem() {
    const el = document.createElement("div");
    el.classList.add("falling-item");
    el.style.left = Math.random() * 95 + "vw";
    const size = 20 + Math.random() * 25;
    el.style.width = size + "px"; el.style.height = size + "px";
    const icons = ['https://cdn-icons-png.flaticon.com/512/2107/2107845.png', 'https://cdn-icons-png.flaticon.com/512/616/616430.png'];
    el.style.backgroundImage = `url('${icons[Math.floor(Math.random() * icons.length)]}')`;
    el.style.animationDuration = (3 + Math.random() * 3) + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 6000);
}
setInterval(createFallingItem, 600);

document.addEventListener('click', function(e) {
    if (e.target.closest('.lever-container') || e.target.closest('button') || e.target.closest('.gift-box')) return;
    const compliments = ["u r cute", "someone special ;)", "smile! ✨", "haku <3", "adorable", "sei preziosa", "meow? 🐾", "u r so cute!", "my safe place duh", "my lil star<3"];
    const textEl = document.createElement('div');
    textEl.className = 'click-text';
    textEl.innerText = compliments[Math.floor(Math.random() * compliments.length)];
    textEl.style.left = (e.clientX - 40) + 'px';
    textEl.style.top = (e.clientY - 20) + 'px';
    document.body.appendChild(textEl);
    setTimeout(() => textEl.remove(), 1500);
});

// ==========================================
// 5. LOGICA SLOT MACHINE & ESPLOSIONE
// ==========================================
let attempts = 0; 
let isSpinning = false;

function runSlot() {
    if (isSpinning) return;
    
    const symbols = ["❤️", "🐱", "🌸", "✨", "🍭", "💎"];
    const slotElements = [document.getElementById("slot1"), document.getElementById("slot2"), document.getElementById("slot3")];
    const arm = document.getElementById("leverArm");
    const msg = document.getElementById("slotMessage");
    const cat = document.querySelector('.slot-cat');
    
    isSpinning = true;
    attempts++; 
    
    arm.classList.add("pulled");
    if(cat) {
        cat.style.transform = "translateX(-50%) scale(1.1)";
        setTimeout(() => cat.style.transform = "translateX(-50%) scale(1)", 200);
    }
    setTimeout(() => arm.classList.remove("pulled"), 500);

    msg.innerText = "Vediamo...";
    slotElements.forEach(el => el.classList.add("spinning"));

    setTimeout(() => {
        let results = [];
        let forceWin = (attempts > 5 && Math.random() > 0.5) || attempts > 8;

        if (forceWin) {
            const winSym = symbols[Math.floor(Math.random() * symbols.length)];
            results = [winSym, winSym, winSym];
        } else {
            results = slotElements.map(() => symbols[Math.floor(Math.random() * symbols.length)]);
        }

        slotElements.forEach((el, i) => {
            el.classList.remove("spinning");
            el.innerText = results[i];
        });

        if (results[0] === results[1] && results[1] === results[2]) {
            msg.innerHTML = "<span style='color:#d44d5c; font-size: 1.2rem;'>JACKPOT! 🏆</span><br>Match MVP!";
            const rect = document.querySelector('.slot-machine').getBoundingClientRect();
            launchExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2);
            for(let i=0; i<40; i++) setTimeout(createFallingItem, i * 80);
            attempts = 0; 
        } else {
            msg.innerText = "Ntnt riprova che sei la migliore!";
        }
        isSpinning = false;
    }, 1500);
}

function launchExplosion(x, y) {
    const compliments = ["SEI UNICA!", "TI ADORO!", "LOVE U", "PERFETTA ✨", "MY QUEEN 👑", "STUPENDA", "JACKPOT! ❤️", "✨✨✨"];
    const colors = ["#ffffff", "#ffcc00", "#ff88aa", "#8e5d3e"];

    for (let i = 0; i < 25; i++) {
        const el = document.createElement('div');
        el.className = 'explosion-item';
        el.innerText = compliments[Math.floor(Math.random() * compliments.length)];
        el.style.color = colors[Math.floor(Math.random() * colors.length)];
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.style.position = 'fixed';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 200 + Math.random() * 300;
        el.style.setProperty('--x', Math.cos(angle) * distance + 'px');
        el.style.setProperty('--y', Math.sin(angle) * distance + 'px');
        el.style.setProperty('--r', (Math.random() * 360) + 'deg');

        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2000);
    }
}