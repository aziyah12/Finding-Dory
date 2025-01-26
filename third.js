// Extract query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const topic = urlParams.get("topic") || "Unknown Topic";
const flashcardCount = parseInt(urlParams.get("count"), 10);

// Predefined flashcard content
const flashcardData = {
    history: [
      { question: "Who was the first President of India?", answer: "Dr. Rajendra Prasad" },
      { question: "When did India gain independence?", answer: "1947" },
      { question: "Who was the first Prime Minister of India?", answer: "Jawaharlal Nehru" },
      { question: "Which Mughal emperor built the Taj Mahal?", answer: "Shah Jahan" },
      { question: "When did the Battle of Plassey occur?", answer: "1757" },
      { question: "Who was the founder of the Maurya Empire?", answer: "Chandragupta Maurya" },
      { question: "What was the capital of the Maurya Empire?", answer: "Pataliputra" },
      { question: "Which empire was known for its rock-cut caves and pillars?", answer: "Maurya Empire" },
      { question: "Who wrote Arthashastra?", answer: "Chanakya" },
      { question: "When was the Indian National Congress founded?", answer: "1885" },
      { question: "Who led the Salt March?", answer: "Mahatma Gandhi" },
      { question: "What is the period of the Gupta Empire known as?", answer: "Golden Age of India" }
    ],
    geography: [
      { question: "What is the capital of India?", answer: "New Delhi" },
      { question: "Which is the largest river in India?", answer: "Ganga" },
      { question: "Which is the highest mountain in India?", answer: "Kangchenjunga" },
      { question: "Which is the largest state in India by area?", answer: "Rajasthan" },
      { question: "Which is the smallest state in India by area?", answer: "Goa" },
      { question: "What is the southernmost point of India?", answer: "Indira Point" },
      { question: "Which desert is located in India?", answer: "Thar Desert" },
      { question: "Which plateau is known as the Deccan Plateau?", answer: "The one covering most of southern India" },
      { question: "Which is the longest dam in India?", answer: "Hirakud Dam" },
      { question: "Which state is known as the 'Land of Five Rivers'?", answer: "Punjab" },
      { question: "Which is the largest lake in India?", answer: "Vembanad Lake" },
      { question: "Which is the largest forest in India?", answer: "Sundarbans" }
    ],
    "freedom-fight": [
      { question: "Who led the Dandi March?", answer: "Mahatma Gandhi" },
      { question: "What was the Quit India Movement?", answer: "A movement for India's independence in 1942." },
      { question: "Who was known as the 'Iron Man of India'?", answer: "Sardar Vallabhbhai Patel" },
      { question: "Who gave the slogan 'Inquilab Zindabad'?", answer: "Bhagat Singh" },
      { question: "What was the Non-Cooperation Movement?", answer: "A movement to resist British rule non-violently." },
      { question: "Who wrote 'Vande Mataram'?", answer: "Bankim Chandra Chatterjee" },
      { question: "Who was the first Indian to hold a position in the British Parliament?", answer: "Dadabhai Naoroji" },
      { question: "When did the Jallianwala Bagh massacre occur?", answer: "1919" },
      { question: "What was the Simon Commission?", answer: "A group to review constitutional reforms in India." },
      { question: "Who gave the slogan 'Do or Die'?", answer: "Mahatma Gandhi" },
      { question: "Who founded the Azad Hind Fauj?", answer: "Subhas Chandra Bose" },
      { question: "What was the purpose of the Civil Disobedience Movement?", answer: "To break unjust laws." }
    ],
    constitution: [
      { question: "Who is known as the Father of the Indian Constitution?", answer: "Dr. B.R. Ambedkar" },
      { question: "How many articles are there in the Indian Constitution?", answer: "448" },
      { question: "When was the Constitution of India adopted?", answer: "26th November 1949" },
      { question: "When did the Indian Constitution come into effect?", answer: "26th January 1950" },
      { question: "What is the Preamble of the Constitution?", answer: "The introduction stating the guiding principles." },
      { question: "What is the Fundamental Duty of every citizen?", answer: "To uphold and protect the sovereignty of India." },
      { question: "How many schedules are there in the Constitution?", answer: "12" },
      { question: "What is the Right to Equality?", answer: "Equal treatment under the law." },
      { question: "What does Article 370 deal with?", answer: "Special status of Jammu & Kashmir." },
      { question: "What is a Directive Principle of State Policy?", answer: "Guidelines for creating social and economic policies." },
      { question: "Which amendment is known as the Mini-Constitution?", answer: "42nd Amendment" },
      { question: "What is the highest law in India?", answer: "The Constitution of India" }
    ],
    politics: [
      { question: "Who is the Prime Minister of India in 2025?", answer: "Narendra Modi" },
      { question: "Which party is currently ruling India?", answer: "BJP" },
      { question: "What is the Rajya Sabha?", answer: "The Upper House of Parliament." },
      { question: "What is the Lok Sabha?", answer: "The Lower House of Parliament." },
      { question: "Who is the President of India in 2025?", answer: "Droupadi Murmu" },
      { question: "What is the Election Commission of India?", answer: "An autonomous body to conduct elections." },
      { question: "Who is the Chief Election Commissioner in 2025?", answer: "Rajiv Kumar" },
      { question: "What is the term of a Member of Parliament in the Lok Sabha?", answer: "5 years" },
      { question: "Which Article provides the right to vote?", answer: "Article 326" },
      { question: "What is a coalition government?", answer: "A government formed by multiple parties." },
      { question: "Who appoints the Prime Minister of India?", answer: "The President of India" },
      { question: "What is a vote of no confidence?", answer: "A motion against the ruling government." }
    ]
};

// Display the topic name dynamically
const topicNameElement = document.getElementById("topic-name");
if (topicNameElement) {
  topicNameElement.textContent = topic;
}

// Function to generate flashcards dynamically
function generateFlashcards(topic, numFlashcards) {
  const flashcardsContainer = document.getElementById("flashcards-container");
  flashcardsContainer.innerHTML = "";

  const topicData = flashcardData[topic.toLowerCase()];
  if (!topicData || topicData.length < numFlashcards) {
    alert("Invalid topic or insufficient flashcards for the selected topic.");
    return;
  }

  topicData.slice(0, numFlashcards).forEach((flashcard, index) => {
    const card = document.createElement("div");
    card.className = "flashcard";
    card.innerHTML = `
      <div class="flashcard-inner">
        <div class="flashcard-front">Q${index + 1}: ${flashcard.question}</div>
        <div class="flashcard-back">${flashcard.answer}</div>
      </div>
    `;
    flashcardsContainer.appendChild(card);
  });
}

// Timer logic
const timerInput = document.getElementById("timer-input");
const startTimerBtn = document.getElementById("start-timer-btn");
const timerDisplay = document.getElementById("timer");

startTimerBtn.addEventListener("click", () => {
  const time = parseInt(timerInput.value, 10);
  if (isNaN(time) || time <= 0) {
    alert("Please enter a valid time in seconds.");
    return;
  }

  startTimerBtn.style.display = "none";
  timerInput.style.display = "none";

  let timeLeft = time;
  timerDisplay.textContent = timeLeft;

  const countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      alert("Time's up!");
    }
  }, 1000);
});

// Generate flashcards on page load
if (!isNaN(flashcardCount) && flashcardCount >= 3 && flashcardCount <= 12) {
  generateFlashcards(topic, flashcardCount);
}

document.getElementById("quiz-button").addEventListener("click", () => {
    window.location.href = "fourth.html";
  });
/*
// Example function to handle topic selection
function selectTopic(topic) {
    // Save the selected topic to localStorage
    localStorage.setItem('selectedTopic', topic);

    // Redirect to fourth.html
    window.location.href = 'fourth.html';
}

// Example usage
document.getElementById('quizButton').addEventListener('click', () => {
    const selectedTopic = document.getElementById('topicSelector').value; // Assuming you have a dropdown with ID topicSelector
    selectTopic(selectedTopic);
});
*/

// Function to save the selected topic and redirect to the quiz page
document.getElementById('quizButton').addEventListener('click', () => {
    const selectedTopic = document.getElementById('topicSelector').value;

    // Save the selected topic to localStorage
    localStorage.setItem('selectedTopic', selectedTopic);

    // Redirect to fourth.html
    window.location.href = 'fourth.html';
});

