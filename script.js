document.querySelector(".start-button").addEventListener("click", () => {
  const topicDropdown = document.querySelector(".topic-dropdown");
  const flashcardCountInput = document.querySelector(".flashcard-count");

  const topic = topicDropdown.value;
  const flashcardCount = parseInt(flashcardCountInput.value, 10);

  // Validate the topic selection
  if (!topic) {
      alert("Please select a topic.");
      return;
  }

  // Validate the flashcard count
  if (isNaN(flashcardCount) || flashcardCount < 3 || flashcardCount > 12) {
      alert("Please choose a number of flashcards between 3 and 12.");
      return;
  }

  // Redirect to the third page (third.html) with query parameters for topic and flashcard count
  const redirectUrl = `third.html?topic=${topic}&count=${flashcardCount}`;
  console.log("Redirecting to:", redirectUrl); // Optional: Check in the console

  window.location.href = redirectUrl; // Trigger redirect to third.html
});