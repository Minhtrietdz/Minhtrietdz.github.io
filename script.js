// --- CONFIGURATION (CẤU HÌNH) ---
const letterContent = `
Chào Bé Yêu của anh, 🌹

Giáng Sinh này, điều tuyệt vời nhất với anh chính là có em bên cạnh. Giữa mùa đông lạnh giá, em chính là hơi ấm dịu dàng nhất của anh. Cảm ơn em vì đã mang đến cho anh những ngày thật ấm áp. Mong rằng chúng ta sẽ cùng nhau đi qua thật nhiều mùa Noel nữa. Chỉ cần có em bên cạnh, Noel nào cũng trở nên ngọt ngào hơn. Chúc cục dàng giáng sinh an lành, mãi cuti và luôn mang theo nụ cười trên môi suốt những tháng ngày sau nữa nhé!
Yêu em nhiều lắm! ❤️

Merry Christmas, my Princess! 🎄🎁






Trang web này được tạo riêng để chúc cho tình yêu của HN & HN —
mong rằng hai bạn sẽ luôn đồng hành cùng nhau thật lâu. ❤️
—— A small page, built with love, for HN & HN.😻
`
;

// --- 1. LOADING SCREEN ---
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 1000);
    }, 2000); // Giả vờ load 2 giây để tạo sự hồi hộp
});

// --- 2. MUSIC CONTROL ---
const bgMusic = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-music');
    } else {
        bgMusic.play();
        musicIcon.classList.remove('fa-music');
        musicIcon.classList.add('fa-pause');
    }
    isPlaying = !isPlaying;
}

// --- 3. SNOW EFFECT (Advanced) ---
const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");
let width, height;
const flakes = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.onresize = resize;
resize();

class Flake {
    constructor() {
        this.init();
    }
    init() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height; // Bắt đầu từ trên cao khung hình
        this.r = Math.random() * 3 + 1; // Kích thước
        this.speed = Math.random() * 1.5 + 0.5;
        this.sway = Math.random() * 0.1 - 0.05; // Độ lắc lư
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    update() {
        this.y += this.speed;
        this.x += Math.sin(this.y * 0.01) * 0.5; // Lắc lư theo hình sin
        
        if (this.y > height) this.init(); // Reset khi chạm đáy
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 150; i++) flakes.push(new Flake());

function animateSnow() {
    ctx.clearRect(0, 0, width, height);
    flakes.forEach(flake => {
        flake.update();
        flake.draw();
    });
    requestAnimationFrame(animateSnow);
}
animateSnow();

// --- 4. MODAL & LOGIC ---
const modal = document.getElementById('modal');
const gallery = document.getElementById('gallery-content');
const letter = document.getElementById('letter-content');
const typeText = document.getElementById('typewriter');

function openGift() {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    if (!isPlaying) toggleMusic();
}


function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');

    setTimeout(() => {
        gallery.classList.remove('hidden');
        letter.classList.add('hidden');
        typeText.innerHTML = '';
    }, 500);
}


function showLetter() {
    gallery.classList.add('hidden');
    letter.classList.remove('hidden');
    typeWriterEffect(letterContent, typeText);
}

function typeWriterEffect(text, element) {
    let i = 0;
    element.innerHTML = "";
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
            i++;
            setTimeout(type, 40); // Tốc độ gõ
            // Auto scroll
            document.querySelector('.glass-card').scrollTop = document.querySelector('.glass-card').scrollHeight;
        }
    }
    type();
}