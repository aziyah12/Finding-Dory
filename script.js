const flashcardsContainer = document.getElementById("flashcards");
const generateForm = document.getElementById("generate-form");

const OPENAI_API_KEY = "your-openai-api-key"; // Replace with your OpenAI API key

// Function to fetch flashcards from OpenAI API
async function fetchFlashcards(topic) {
  const prompt = `Generate 5 flashcards in JSON format for the topic \"${topic}\". Each flashcard should have a 'question' and 'answer'.`;

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 300,
    }),
  });

  const data = await response.json();
  const generatedFlashcards = JSON.parse(data.choices[0].text.trim());
  return generatedFlashcards;
}

// Function to render flashcards
function renderFlashcards(flashcards) {
  flashcardsContainer.innerHTML = ""; // Clear previous flashcards
  flashcards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.className = "flashcard";
    cardElement.innerHTML = `
      <p class="question">${card.question}</p>
      <p class="answer hidden">${card.answer}</p>
      <button onclick="toggleAnswer(this)">Flip</button>
    `;
    flashcardsContainer.appendChild(cardElement);
  });
}

// Function to toggle answer visibility
function toggleAnswer(button) {
  const answer = button.previousElementSibling;
  answer.classList.toggle("hidden");
}

// Handle form submission
generateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const topic = document.getElementById("topic").value;

  if (!topic.trim()) {
    alert("Please enter a valid topic.");
    return;
  }

  try {
    // Fetch and render flashcards
    const flashcards = await fetchFlashcards(topic);
    renderFlashcards(flashcards);

    // Save to LocalStorage
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  } catch (error) {
    alert("An error occurred while generating flashcards. Please try again.");
    console.error(error);
  }
});

// Load saved flashcards from LocalStorage on page load
window.onload = () => {
  const storedFlashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
  if (storedFlashcards.length > 0) {
    renderFlashcards(storedFlashcards);
  }
};