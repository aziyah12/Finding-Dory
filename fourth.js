const questions = [
        { question: "Who was the first President of India?", answer: "Dr. Rajendra Prasad" },
      { question: "When did India gain independence?", answer: "1947" },
      { question: "Who was the first Prime Minister of India?", answer: "Jawaharlal Nehru" },
      { question: "Which Mughal emperor built the Taj Mahal?", answer: "Shah Jahan" },
      { question: "When did the Battle of Plassey occur?", answer: "1757" },
];

const canvas = document.getElementById('question-wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin-button');
const questionDisplay = document.getElementById('question-display');
const answerInput = document.getElementById('answer-input');
const submitAnswer = document.getElementById('submit-answer');
const resultMessage = document.getElementById('result-message');

const wheelRadius = canvas.width / 2;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let spinning = false;
let rotationAngle = 0;
let selectedIndex = -1;

// Draw the wheel
function drawWheel() {
    const numberOfQuestions = questions.length;
    const anglePerSegment = (2 * Math.PI) / numberOfQuestions;

    questions.forEach((item, index) => {
        const startAngle = index * anglePerSegment + rotationAngle;
        const endAngle = startAngle + anglePerSegment;

        // Draw segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, wheelRadius, startAngle, endAngle);
        ctx.fillStyle = index % 2 === 0 ? '#ffcc00' : '#ff9900';
        ctx.fill();
        ctx.stroke();

        // Draw text
        const textAngle = startAngle + anglePerSegment / 2;
        const textX = centerX + (wheelRadius / 2) * Math.cos(textAngle);
        const textY = centerY + (wheelRadius / 2) * Math.sin(textAngle);
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.question, textX, textY);
    });

    drawIndicator();
}

function drawIndicator() {
    const indicatorSize = 20; 
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - wheelRadius - 10);
    ctx.lineTo(centerX - indicatorSize / 2, centerY - wheelRadius - indicatorSize - 10); 
    ctx.lineTo(centerX + indicatorSize / 2, centerY - wheelRadius - indicatorSize - 10); 
    ctx.closePath();
    ctx.fillStyle = '#d32f2f'; 
    ctx.fill();
}

// Spin the wheel
function spinWheel() {
    if (spinning) return;

    spinning = true;
    const spinDuration = 3000; // 3 seconds
    const spinSpeed = Math.random() * 5 + 10; // Random speed

    const startTime = Date.now();

    function animate() {
        const elapsedTime = Date.now() - startTime;
        const easingFactor = Math.pow(1 - elapsedTime / spinDuration, 2); // Ease-out effect

        rotationAngle += spinSpeed * easingFactor;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWheel();

        if (elapsedTime < spinDuration) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            selectQuestion();
        }
    }

    animate();
}

// Select a question after spinning
function selectQuestion() {
    const anglePerSegment = (2 * Math.PI) / questions.length;
    const normalizedAngle = rotationAngle % (2 * Math.PI);
    const selectedSegment = Math.floor((2 * Math.PI - normalizedAngle) / anglePerSegment) % questions.length;

    selectedIndex = selectedSegment;
    questionDisplay.textContent = questions[selectedSegment].question;
    resultMessage.textContent = ''; // Clear previous result
    answerInput.value = ''; // Clear the input box
}

// Evaluate the answer
function evaluateAnswer() {
    const userAnswer = answerInput.value.trim();
    if (selectedIndex === -1) {
        resultMessage.textContent = 'Please spin the wheel first!';
        resultMessage.style.color = 'red';
        return;
    }

    const correctAnswer = questions[selectedIndex].answer;
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        resultMessage.textContent = 'Correct! 🎉';
        resultMessage.style.color = 'green';
    } else {
        resultMessage.textContent = `Incorrect! The correct answer is: ${correctAnswer}`;
        resultMessage.style.color = 'red';

    }
}

spinButton.addEventListener('click', spinWheel);
submitAnswer.addEventListener('click', evaluateAnswer);

// Initial draw
drawWheel();
 