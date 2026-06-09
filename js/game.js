// Game State
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
    initAudio();
    landingPage.classList.add('hidden');
    quizPage.classList.remove('hidden');
    scoreContainer.classList.remove('hidden');
    updateScoreDisplay();
    loadQuestion();
});

// Audio Test
audioTestBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    playSFX('test');
});

function loadQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        showEndScreen();
        return;
    }

    const currentData = quizQuestions[currentQuestionIndex];
    questionText.textContent = currentData.question;
    leftImg.src = `assets/choices/${currentData.leftImg}`;
    rightImg.src = `assets/choices/${currentData.rightImg}`;
}

function handleChoice(chosenSide) {
    const currentData = quizQuestions[currentQuestionIndex];
    let showImageSrc = "";

    const randomImageNumber = availableImagePool[Math.floor(Math.random() * availableImagePool.length)];

    if (chosenSide === currentData.correctChoice) {
        currentScore += 25;
        showImageSrc = `assets/score/plus_${randomImageNumber}.webp`;
        playSFX('correct');
    } else {
        currentScore -= 25;
        showImageSrc = `assets/score/minus_${randomImageNumber}.webp`;
        playSFX('wrong');
    }

    updateScoreDisplay();

    if (currentScore < 0) {
        isJumpscareActive = true;
        triggerJumpscare();
    } else {
        isJumpscareActive = false;
        feedbackScoreImg.src = showImageSrc;
        feedbackOverlay.classList.remove('hidden');
    }
}

function triggerJumpscare() {
    playSFX('scare');
    feedbackScoreImg.src = "assets/scare.webp";
    feedbackOverlay.classList.remove('hidden');
}

function updateScoreDisplay() {
    scoreValue.textContent = currentScore;
}

// Show final propaganda result screen based on score
function showEndScreen() {
    quizPage.classList.add('hidden');
    scoreContainer.classList.add('hidden');
    endPage.classList.remove('hidden');

    endScoreText.textContent = `您的最终社会信用评分为: ${currentScore} 分`;

    // 200 or more points required to win
    if (currentScore >= 200) {
        endTitle.textContent = "光荣至极！";

        // Green English caption for winning
        endEnglishCaption.textContent = "You Won";
        endEnglishCaption.style.color = "#00cc00";

        endMessage.innerHTML = "🎉 伟大胜利！你是社会的模范支柱！<br>国家因你的崇高选择而自豪，继续保持光荣的步伐！";
        playSFX('win');
    } else {
        endTitle.textContent = "深刻反省！";

        // Red English caption for losing
        endEnglishCaption.textContent = "You Lost";
        endEnglishCaption.style.color = "#cc0000";

        endMessage.innerHTML = "⚠️ 极其危险！你的思想觉悟仍需彻底洗礼！<br>劳动带来觉醒，立刻重新测试并提升你的社会贡献！";
        playSFX('lose');
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