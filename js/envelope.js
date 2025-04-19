const envelope = document.querySelector('.envelope-wrapper');
const heart = document.querySelector('.heart');

// toggle flap saat klik hati
heart.addEventListener('click', () => {
  envelope.classList.toggle('flap');
  console.log('Flap toggled:', envelope.classList.contains('flap'));
});



document.getElementsByClassName('heart')[0].addEventListener('click', () => {
    const audio = document.getElementById('bgm');
    audio.play().catch((error) => {
        console.log('Audio playback failed.', error);
    });
    audio.volume = 1.0; 
});

document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('bgm');
    const currentPage = window.location.pathname; 
    const desiredPage = "https://rhyneeai.github.io/letter-envelope/envelope.html"; 
    if (currentPage === desiredPage) {
        audio.play().catch((error) => {
            console.log('Audio playback failed. User interaction might be required.', error);
        });
        audio.volume = 1.0;
    } else {
        audio.volume = 0.0; 
    }
});

document.querySelector('.heart').addEventListener('click', function () {
    const heart = this;
    const envelope = document.querySelector('.envelope-wrapper');
    const computedTransform = window.getComputedStyle(heart).transform;

    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get('data');

    if (data) {
        try {
            const letterData = JSON.parse(decodeURIComponent(data));
            document.getElementById("dear").textContent = `Dear ${letterData.penerima}`;
            document.getElementById("letter-body").textContent = letterData.body;
            document.getElementById("sincerely").textContent = `Sincerely, ${letterData.pengirim}`;

            const typingEffect = document.querySelector('.typing-effect');
            const nameText = `    My Beloved, ${letterData.penerima} 💖`;

            typingEffect.textContent = nameText;

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            const computedStyle = window.getComputedStyle(typingEffect);
            const font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
            context.font = font;
            const textWidth = context.measureText(nameText).width;

            typingEffect.style.maxWidth = `${textWidth - 10}px`;
            typingEffect.style.animation = 'none'; 
            void typingEffect.offsetWidth; // restart animation
            typingEffect.style.animation = `typing 5s steps(${Math.ceil(textWidth / 10)}, end) forwards, blinkCursor 0.5s step-end infinite`;
        } catch (err) {
            console.error("Failed to parse data:", err);
            window.location.href = 'index.html';
        }
    } else {
        window.location.href = 'index.html';
    }


    const audio = document.getElementById('bgm');

    if (!computedTransform.includes('matrix')) {
        heart.style.animation = 'none';
        void heart.offsetWidth;
        heart.style.animation = 'heartOpen 1s ease-in-out forwards';
        envelope.style.overflow = 'visible';
        audio.play().catch((error) => {
            console.log('Audio playback failed. User interaction might be required.', error);
        });
    } else {
        heart.style.animation = 'none';
        void heart.offsetWidth;
        heart.style.animation = 'heartClose 1s ease-in-out forwards';

        setTimeout(() => {
            heart.style.animation = 'none';
            void heart.offsetWidth;
            heart.style.animation = 'smoothShake 0.9s linear infinite';
            envelope.style.overflow = 'visible';
        }, 1000);
    }
});




function redirectToDrive() {
    if (confirm("Kamu akan diarahkan ke folder Google Drive! Masukan no pesanan anda di drive ya! Apakah kamu ingin melanjutkan?")) {
        window.location.href = "https://drive.google.com/drive/folders/12Zyvb04BOdORpXw0A3VOiT5RMXjI0Svv?usp=drive_link";
    } else {
        console.log("Pengalihan dibatalkan oleh pengguna.");
    }
}