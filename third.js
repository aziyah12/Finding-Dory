// Timer Functionality
const modal = document.getElementById('modal');
const openModalButton = document.getElementById('openModalButton');
const closeModalButton = document.getElementsByClassName('close')[0];
const startButton = document.getElementById('startButton');
const countdownDisplay = document.getElementById('countdownDisplay');

openModalButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

startButton.addEventListener('click', () => {
    const timeInput = document.getElementById('timeInput').value;

    if (timeInput <= 0) {
        alert('Please enter a valid time.');
        return;
    }

    modal.style.display = 'none';
    openModalButton.style.display = 'none';

    let timeInSeconds = timeInput * 60;
    const intervalId = setInterval(() => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;

        countdownDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeInSeconds <= 0) {
            clearInterval(intervalId);
            countdownDisplay.textContent = "Time's up!";
            openModalButton.style.display = 'inline-block';
        } else {
            timeInSeconds--;
        }
    }, 1000);
});

// Flashcard Functionality
const flashcardsContainer = document.getElementById('flashcards-container');
const flashcards = [
    { question: "What is JavaScript?", answer: "A programming language for the web." },
    { question: "What is HTML?", answer: "The structure of a web page." },
    { question: "What is CSS?", answer: "The styling of a web page." },
    { question: "What is a function?", answer: "A block of code that performs a task." },
    { question: "What is a variable?", answer: "A container for storing data values." }
];

// Generate Flashcards
flashcards.forEach(({ question, answer }) => {
    const card = document.createElement('div');
    card.classList.add('flashcard');

    const inner = document.createElement('div');
    inner.classList.add('flashcard-inner');

    const front = document.createElement('div');
    front.classList.add('flashcard-front');
    front.textContent = question;

    const back = document.createElement('div');
    back.classList.add('flashcard-back');
    back.textContent = answer;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    // Add flip functionality
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    flashcardsContainer.appendChild(card);
});
