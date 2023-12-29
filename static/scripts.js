document.addEventListener("DOMContentLoaded", function () {
  function setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
  }

  // Function to toggle between light and dark themes
  function toggleTheme() {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-light");
    } else {
      setTheme("theme-dark");
    }
  }

  // Check for previously set theme and apply it
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
  } else {
    setTheme("theme-light");
  }

  const matrixContainer = document.querySelector(".matrix-container");

  function createMatrix() {
    const columns = Math.floor(window.innerWidth / 10); // Number of columns based on window width
    const codeStreams = [];

    for (let i = 0; i < columns; i++) {
      const codeStream = document.createElement("div");
      codeStream.classList.add("matrix-text");
      codeStream.innerText = getRandomChar();
      codeStream.style.left = i * 10 + "px"; // Position each column
      codeStream.style.top = Math.floor(Math.random() * -1000) + "px"; // Randomize starting position
      codeStreams.push(codeStream);
      matrixContainer.appendChild(codeStream);
    }

    animateMatrix(codeStreams);
  }

  function animateMatrix(codeStreams) {
    const speed = 50; // Adjust the speed of falling text

    setInterval(() => {
      for (let i = 0; i < codeStreams.length; i++) {
        const codeStream = codeStreams[i];
        let top = parseInt(codeStream.style.top);

        if (top >= window.innerHeight) {
          codeStream.style.top = Math.floor(Math.random() * -1000) + "px"; // Reset position when text reaches the bottom
        } else {
          codeStream.style.top = top + 5 + "px"; // Increment the position to simulate falling text
        }
      }
    }, speed);
  }

  function getRandomChar() {
    const charSet = "❄️⛄";
    return charSet[Math.floor(Math.random() * charSet.length)];
  }

  createMatrix();
});
