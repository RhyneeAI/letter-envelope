const envelope = document.querySelector('.envelope-wrapper');
envelope.addEventListener('click', () => {
  envelope.classList.toggle('flap');
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
    const desiredPage = "/desired-page.html"; 
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

    const typingEffect = document.querySelector('.typing-effect');
    const nameText = `    Sincerely, Walawe 💖`;


    typingEffect.textContent = nameText;
    typingEffect.style.animation = 'none'; 
    void typingEffect.offsetWidth; 
    typingEffect.style.animation = 'typing 4s steps(24, end) forwards, blinkCursor 0.5s step-end infinite';
    console.log(typingEffect.textContent.split(''));


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








