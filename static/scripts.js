function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
  toggleThemeIcon();
}

// Function to toggle between light and dark themes
function toggleTheme() {
  if (localStorage.getItem("theme") === "theme-light") {
    setTheme("theme-dark");
  } else {
    setTheme("theme-light");
  }
}

function toggleThemeIcon() {
  const button = document.querySelector(".theme-toggler");
  const sun = "bi bi-brightness-high-fill";
  const moon = "bi bi-moon-fill";
  let icon = "";

  if (localStorage.getItem("theme") === "theme-dark") {
    icon = `<i class="${sun}"></i>`;
  } else {
    icon = `<i class="${moon}"></i>`;
  }

  button.innerHTML = icon;
}

// function that create the snow flakes
let snowflakes = [];

function createSnowflakes() {
  const matrixContainer = document.querySelector(".matrix-container");
  const columns = Math.floor(window.innerWidth / 10);
  const windowHeight = window.innerHeight; // Get window height

  // Clear existing snowflakes before recreating them
  matrixContainer.innerHTML = "";
  snowflakes = [];

  for (let i = 0; i < columns; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("matrix-text");
    snowflake.innerText = getRandomSnowflake();
    snowflake.style.left = i * 10 + "px";
    snowflake.style.top = Math.floor(Math.random() * windowHeight) + "px"; // Adjust starting position
    snowflakes.push(snowflake);
    matrixContainer.appendChild(snowflake);
  }

  animateSnowflakes();
}

function animateSnowflakes() {
  const speed = 50;
  setInterval(() => {
    snowflakes.forEach((snowflake) => {
      let top = parseInt(snowflake.style.top);
      if (top >= window.innerHeight) {
        snowflake.style.top =
          Math.floor(Math.random() * window.innerHeight) + "px";
      } else {
        snowflake.style.top = top + 5 + "px";
      }
    });
  }, speed);
}

function handleScroll() {
  const scrollPosition = window.scrollY;
  const matrixContainer = document.querySelector(".matrix-container");

  if (scrollPosition > window.innerHeight && !snowflakesCreated) {
    createSnowflakes();
    snowflakes.forEach((snowflake) => {
      matrixContainer.appendChild(snowflake);
    });
    animateSnowflakes();
  }
}

function getRandomSnowflake() {
  const snowflakeSet = "❄️.*";
  return snowflakeSet[Math.floor(Math.random() * snowflakeSet.length)];
}

// function for checking the season and show the matrix
function seasonalMatrix() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  // Check if it's winter (assuming winter is December, January, February)
  if (currentMonth >= 12 || currentMonth <= 2) {
    createSnowflakes();
  }
}

// function to out the greeting based on time
function setGreetingTime() {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const timeDiv = document.getElementById("time-greet");
  var now = "";
  if (currentHour >= 5 && currentHour < 12) {
    now = "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    now = "Good afternoon";
  } else {
    now = "Good evening";
  }
  timeDiv.innerHTML = now;
}

async function train() {
  const csrftoken = getCookie("csrftoken");
  const response = await fetch("/chatbot/train-chatbot/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({}),
  });

  if (response.ok) {
    const data = await response.json();
    alert(data.message); // Show success message
  } else {
    alert("Failed to train chatbot");
  }
}

function chatter() {
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatBody = document.getElementById("chat-body");

  chatForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const userInput = chatInput.value.trim();
    if (!userInput) return;

    const requestData = {
      input_text: userInput,
    };

    try {
      const csrftoken = getCookie("csrftoken"); // Function to retrieve CSRF token

      const response = await fetch("/chatbot/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify(requestData), // Ensure the request body contains the input_text
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        const botResponse = responseData.response_text;

        const botMessage = document.createElement("div");
        const userMessage = document.createElement("div");

        botMessage.textContent = botResponse;
        userMessage.textContent = userInput;

        botMessage.classList.add("chatters", "chat-bot");
        userMessage.classList.add("chatters", "chat-user");

        chatBody.appendChild(userMessage);
        chatBody.appendChild(botMessage);

        chatInput.value = "";
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
}

// Function to retrieve CSRF token
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
  } else {
    setTheme("theme-light");
  }
  try {
    setGreetingTime();
  } catch (error) {
    console.log(error);
  }
  seasonalMatrix();
  chatter();

  // function for navbar bg change via scrolling
  document.addEventListener("scroll", handleScroll);
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});
