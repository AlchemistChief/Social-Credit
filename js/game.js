// Game State
const winningScore = 150;
let currentScore = 25;
let currentQuestionIndex = 0;
let isJumpscareActive = false;

// DOM Elements
const landingPage = document.getElementById('landing-page');
const quizPage = document.getElementById('quiz-page');
const scoreContainer = document.getElementById('score-container');
const scoreValue = document.getElementById('score-value');
const startBtn = document.getElementById('start-btn');
const audioTestBtn = document.getElementById('audio-test-btn');

const questionText = document.getElementById('question-text');
const questionPinyin = document.getElementById('question-pinyin');
const leftChoice = document.getElementById('left-choice');
const rightChoice = document.getElementById('right-choice');
const leftImg = document.getElementById('left-img');
const rightImg = document.getElementById('right-img');

const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackScoreImg = document.getElementById('feedback-score-img');
const continueBtn = document.getElementById('continue-btn');

// End Screen Elements
const endPage = document.getElementById('end-page');
const endTitle = document.getElementById('end-title');
const endEnglishCaption = document.getElementById('end-english-caption');
const endScoreText = document.getElementById('end-score-text');
const endMessage = document.getElementById('end-message');
const restartBtn = document.getElementById('restart-btn');

// Start Game
startBtn.addEventListener('click', () => {
    if (typeof initAudio === 'function') initAudio();
    landingPage.classList.add('hidden');
    quizPage.classList.remove('hidden');
    scoreContainer.classList.remove('hidden');
    updateScoreDisplay();
    loadQuestion();
});

// Audio Test
audioTestBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (typeof playSFX === 'function') playSFX('test');
});

function loadQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        showEndScreen();
        return;
    }

    const currentData = quizQuestions[currentQuestionIndex];
    questionText.textContent = currentData.question;
    questionPinyin.textContent = currentData.pinyin;
    leftImg.src = `assets/choices/${currentData.leftImg}`;
    rightImg.src = `assets/choices/${currentData.rightImg}`;
}

function handleChoice(chosenSide) {
    const currentData = quizQuestions[currentQuestionIndex];
    let showImageSrc = "";

    const randomImageNumber = availableImagePool[Math.floor(Math.random() * availableImagePool.length)];

    //check Correct Answer
    if (chosenSide === currentData.correctChoice) {
        currentScore += 25;
        showImageSrc = `assets/score/plus_${randomImageNumber}.webp`;
        if (typeof playSFX === 'function') playSFX('correct');

        isJumpscareActive = false;
        feedbackScoreImg.src = showImageSrc;
        feedbackOverlay.classList.remove('hidden');

    } else {
        currentScore -= 25;
        showImageSrc = `assets/score/minus_${randomImageNumber}.webp`;
        if (typeof playSFX === 'function') playSFX('wrong');

        //trigger jumpscare if below 0 and wrong
        if (currentScore < 0) {
            isJumpscareActive = true;
            triggerJumpscare();
        } else {
            isJumpscareActive = false;
            feedbackScoreImg.src = showImageSrc;
            feedbackOverlay.classList.remove('hidden');
        }
    }

    updateScoreDisplay();
}

function triggerJumpscare() {
    if (typeof playSFX === 'function') playSFX('scare');
    feedbackScoreImg.src = "assets/scare.webp";
    feedbackOverlay.classList.remove('hidden');
}

function updateScoreDisplay() {
    scoreValue.textContent = currentScore;
}

// Show final propaganda result screen based on score
function showEndScreen() {
    if (currentScore < 100) {
        const jumpscareOverlay = document.getElementById('jumpscare-overlay');

        // 1. Mute everything
        bgMusic.muted = true;

        jumpscareOverlay.classList.remove('hidden');

        // 2. Play the specific jumpscare sound
        if (typeof playSFX === 'function') playSFX('jumpscare');

        // 3. Wait 2 seconds (2000ms)
        setTimeout(() => {
            jumpscareOverlay.classList.add('hidden');

            bgMusic.muted = false;
            renderEndScreen();
        }, 7000);
    } else {
        renderEndScreen();
    }
}

function renderEndScreen() {
    quizPage.classList.add('hidden');
    scoreContainer.classList.add('hidden');
    endPage.classList.remove('hidden');

    endScoreText.textContent = `您的最终社会信用评分为: ${currentScore} 分`;

    if (currentScore >= winningScore) {
        endTitle.textContent = "光荣至极！";
        endEnglishCaption.textContent = "You Won";
        endEnglishCaption.style.color = "#00cc00";
        endMessage.innerHTML = "🎉 伟大胜利！你是社会的模范支柱！";
        if (typeof playSFX === 'function') playSFX('win');
    } else {
        endTitle.textContent = "深刻反省！";
        endEnglishCaption.textContent = "You Lost";
        endEnglishCaption.style.color = "#cc0000";
        endMessage.innerHTML = "⚠️ 极其危险！你的思想觉悟仍需彻底洗礼！";
        if (typeof playSFX === 'function') playSFX('lose');
    }
}

// Event Listeners for choices
leftChoice.addEventListener('click', () => handleChoice('left'));
rightChoice.addEventListener('click', () => handleChoice('right'));

// Continue button logic
continueBtn.addEventListener('click', () => {
    feedbackOverlay.classList.add('hidden');

    currentQuestionIndex++;
    isJumpscareActive = false;

    loadQuestion();
});

// Restart button logic
restartBtn.addEventListener('click', () => {
    endPage.classList.add('hidden');
    quizPage.classList.remove('hidden');
    scoreContainer.classList.remove('hidden');
    currentScore = 25;
    currentQuestionIndex = 0;
    updateScoreDisplay();
    loadQuestion();
});