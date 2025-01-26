// Retrieve topic and flashcard count from sessionStorage
const topic = sessionStorage.getItem('selectedTopic');
const count = parseInt(sessionStorage.getItem('flashcardCount'), 10);

// Function to fetch flashcards from Gemini API
async function fetchFlashcardsFromGemini(topic, count) {
    const GEMINI_API_KEY = "AIzaSyAqIXev4dTVNFrzxeezT99iwDN6pl6635w";  // Replace with your actual key
    const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const requestBody = {
        prompt: `Generate ${count} flashcards for the topic "${topic}". Each flashcard should contain a question and answer.`,
        temperature: 0.7
    };

    try {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        console.log(data);  // Log the response data to inspect its structure

        if (data && data.predictions) {
            renderFlashcards(data.predictions);
        } else {
            alert("Error generating flashcards.");
        }
    } catch (error) {
        console.error("Error fetching flashcards:", error);
        alert("Failed to fetch flashcards.");
    }
}

// Function to render flashcards on the screen
function renderFlashcards(flashcards) {
    const flashcardsContainer = document.getElementById('flashcards-container');
    flashcardsContainer.innerHTML = "";  // Clear previous flashcards if any

    flashcards.forEach(flashcard => {
        console.log(flashcard);  // Log each flashcard to inspect its structure

        const card = document.createElement('div');
        card.classList.add('flashcard');

        const inner = document.createElement('div');
        inner.classList.add('flashcard-inner');

        const front = document.createElement('div');
        front.classList.add('flashcard-front');
        front.textContent = flashcard.question || "No question found";  // Add a fallback

        const back = document.createElement('div');
        back.classList.add('flashcard-back');
        back.textContent = flashcard.answer || "No answer found";  // Add a fallback

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);

        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        flashcardsContainer.appendChild(card);
    });
}

console.log(topic, count);
// Fetch and render the flashcards on page load
if (topic && count > 0) {
    fetchFlashcardsFromGemini(topic, count);
} else {
    alert("Topic or flashcard count not found.");
}
