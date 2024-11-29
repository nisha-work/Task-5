const apiKey = '01fa0663ac2c2ef8f4b996dbc9919cfc';

async function fetchWeather(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
        if (!response.ok) throw new Error("Location not found");
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById("weatherDisplay").innerText = error.message;
    }
}

async function fetchWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                document.getElementById("weatherDisplay").innerText = error.message;
            }
        }, () => {
            document.getElementById("weatherDisplay").innerText = "Unable to retrieve location.";
        });
    } else {
        document.getElementById("weatherDisplay").innerText = "Geolocation not supported by this browser.";
    }
}

function fetchWeatherByLocation() {
    const location = document.getElementById("locationInput").value;
    if (location) {
        fetchWeather(location);
    } else {
        document.getElementById("weatherDisplay").innerText = "Please enter a location.";
    }
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    document.getElementById("weatherDisplay").innerHTML = `
        <h2>${name}</h2>
        <p>${weather[0].description}</p>
        <p>Temperature: ${main.temp}°C</p>
        <p>Feels like: ${main.feels_like}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind speed: ${wind.speed} m/s</p>
    `;
}