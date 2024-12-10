const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing tests can improve your typing speed and accuracy.",
    "Practice makes perfect when it comes to typing fast.",
    "JavaScript is a versatile programming language."
  ];
  
  const sentenceElement = document.getElementById("sentence");
  const inputArea = document.getElementById("input-area");
  const startButton = document.getElementById("start-button");
  const timeTakenElement = document.getElementById("time-taken");
  const wpmElement = document.getElementById("wpm");
  const accuracyElement = document.getElementById("accuracy");
  
  let startTime;
  let currentSentence = "";
  
  function startTest() {
    // Reset results
    timeTakenElement.textContent = "0";
    wpmElement.textContent = "0";
    accuracyElement.textContent = "0%";
  
    // Enable input area and clear previous input
    inputArea.disabled = false;
    inputArea.value = "";
  
    // Pick a random sentence
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    sentenceElement.textContent = currentSentence;
  
    // Start the timer
    startTime = new Date().getTime();
  
    // Focus on the input area
    inputArea.focus();
  }
  
  function calculateResults() {
    // Calculate time taken
    const endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000; // in seconds
    timeTakenElement.textContent = timeTaken.toFixed(2);
  
    // Calculate WPM
    const wordsTyped = inputArea.value.trim().split(/\s+/).length;
    const wpm = (wordsTyped / (timeTaken / 60)).toFixed(2);
    wpmElement.textContent = wpm;
  
    // Calculate accuracy
    const typedText = inputArea.value.trim();
    let correctChars = 0;
    for (let i = 0; i < Math.min(typedText.length, currentSentence.length); i++) {
      if (typedText[i] === currentSentence[i]) {
        correctChars++;
      }
    }
    const accuracy = ((correctChars / currentSentence.length) * 100).toFixed(2);
    accuracyElement.textContent = `${accuracy}%`;
  }
  
  startButton.addEventListener("click", () => {
    startTest();
    inputArea.addEventListener("input", () => {
      if (inputArea.value.trim() === currentSentence) {
        inputArea.disabled = true; // Disable input when the test is completed
        calculateResults();
      }
    });
  });
  