// Background loop audio
const bgMusic = new Audio('assets/background.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.3;

// Sound effects
const correctSound = new Audio('assets/correct.mp3');
const wrongSound = new Audio('assets/wrong.mp3');
const scareSound = new Audio('assets/scare.mp3');
const testSound = new Audio('assets/test.mp3');
const winSound = new Audio('assets/win.mp3');
const loseSound = new Audio('assets/lose.mp3');

function initAudio() {
    bgMusic.play().catch(error => {
        console.log("Autoplay prevented.");
    });
}

function playSFX(type) {
    if (type === 'correct') {
        correctSound.currentTime = 0;
        correctSound.play();
    } else if (type === 'wrong') {
        wrongSound.currentTime = 0;
        wrongSound.play();
    } else if (type === 'scare') {
        scareSound.currentTime = 0;
        scareSound.play();
    } else if (type === 'test') {
        testSound.currentTime = 0;
        testSound.play();
    } else if (type === 'win') {
        winSound.currentTime = 0;
        winSound.play();
    } else if (type === 'lose') {
        loseSound.currentTime = 0;
        loseSound.play();
    }
}