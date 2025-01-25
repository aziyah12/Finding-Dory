// OpenAI API Key (should be stored securely in the backend)
const OPENAI_API_KEY = "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";

// Function to fetch flashcards from OpenAI API
async function fetchFlashcards(topic, count) {
  const prompt = `Generate ${count} flashcards in JSON format for the topic "${topic}". Each flashcard should have a 'question' and 'answer'.`;

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    const flashcards = JSON.parse(data.choices[0].text.trim());
    return flashcards;
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    throw new Error("Failed to generate flashcards. Please try again.");
  } 
}

// Function to render flashcards on the screen
function renderFlashcards(flashcards) {
  const flashcardsContainer = document.getElementById("flashcards-container");
  flashcardsContainer.innerHTML = ""; // Clear previous flashcards

  flashcards.forEach((flashcard) => {
    const cardElement = document.createElement("div");
    cardElement.className = "flashcard";
    cardElement.innerHTML = `
      <p class="question"><strong>Q:</strong> ${flashcard.question}</p>
      <p class="answer hidden"><strong>A:</strong> ${flashcard.answer}</p>
      <button class="flip-button">Flip</button>
    `;
    flashcardsContainer.appendChild(cardElement);

    cardElement.querySelector(".flip-button").addEventListener("click", () => {
      cardElement.querySelector(".answer").classList.toggle("hidden");
    });
  });
}

// Handle form inputs for topic and count
document.querySelector(".container").addEventListener("input", async () => {
  const topic = document.querySelector(".topic").value.trim();
  const count = parseInt(document.querySelector(".topi").value, 10);

  if (!topic || isNaN(count) || count <= 0) {
    alert("Please enter a valid topic and a positive number of pearls.");
    return;
  }

  try {
    const flashcards = await fetchFlashcards(topic, count);
    renderFlashcards(flashcards);

    // Save flashcards to LocalStorage
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  } catch (error) {
    alert(error.message);
  }
});

// Load saved flashcards on page load
window.onload = () => {
  const storedFlashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
  if (storedFlashcards.length > 0) {
    renderFlashcards(storedFlashcards);
  }
};

// Handle "Yes" and "No" button clicks
document.querySelector(".yes-button").addEventListener("click", () => {
  window.location.href = "third.html";
});

document.querySelector(".no-button").addEventListener("click", () => {
  alert("Alright, let's stay here and study without a timer!");
});
