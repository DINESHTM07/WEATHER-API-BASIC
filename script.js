const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const clearBtn = document.querySelector("#clear-btn");
const result = document.querySelector("#result");

const copyBtn = document.createElement("button");
copyBtn.textContent = "Copy Results";
copyBtn.style.fontSize = "clamp(0.95rem, 2vw, 1.05rem)";
copyBtn.style.fontWeight = "bold";
copyBtn.style.padding = "clamp(10px, 2vw, 14px)";
copyBtn.style.color = "black";
copyBtn.style.width = "100%";
copyBtn.style.height = "50px";
copyBtn.style.borderRadius = "8px";
copyBtn.style.background = "linear-gradient(90deg, #74ebd5 0%, #ACB6E5 100%)";
copyBtn.style.cursor = "pointer";
document.querySelector(".container").appendChild(copyBtn);

cityInput.addEventListener("input", () => {
  // Capitalize first letter only
  cityInput.value = cityInput.value.charAt(0).toUpperCase() + cityInput.value.slice(1);
});

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    result.textContent = "Loading...";
    
    const apiKey = "b46bf727ebea062892f1ff7fc39fc1c3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      const weather = data.weather[0].description;
      const temp = Math.round(data.main.temp);
      const feels = Math.round(data.main.feels_like);
      const humidity = data.main.humidity;
      const wind = data.wind.speed;
      result.innerHTML = `
        <strong>${data.name}, ${data.sys.country}</strong><br>
        Weather: ${weather}<br>
        Temperature: ${temp}°C (Feels like ${feels}°C)<br>
        Humidity: ${humidity}%<br>
        Wind: ${wind} m/s
      `;
    } catch (err) {
      result.textContent = "❌ City not found. Please try again.";
    }
  } else {
    result.textContent = "Please enter your City";
  }
});

clearBtn.addEventListener("click", () => {
  result.textContent = "";
  cityInput.value = "";
  copyBtn.textContent = "copy and view result";
});

copyBtn.addEventListener("click", () => {
  const text = result.textContent || result.innerText;
  if (cityInput.value.trim() !== "" && text) {
    navigator.clipboard.writeText(text);
    copyBtn.textContent = `Copied weather for ${cityInput.value}`;
    alert("✅ Weather info copied to clipboard!");
  } else {
    copyBtn.textContent = "copy and view result";
    alert("⚠️ Nothing to copy!");
  }
});
