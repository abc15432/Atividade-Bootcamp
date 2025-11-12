// apps/web/script.js

// 1. CHAVE DE API (APENAS para o teste de Front-end)
// Esta chave deve estar entre aspas simples.
const OPENWEATHER_API_KEY = 'ecea9240a04439809fe96e40598e3b98'; 

// 2. ELEMENTOS DOM
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const resultsDiv = document.getElementById('results');

// 3. REGISTRO DE EVENTO
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

// 4. FUNÇÃO DE BUSCA DE CLIMA
async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt&appid=${OPENWEATHER_API_KEY}`;
    
    resultsDiv.innerHTML = '<p>Buscando...</p>';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== 200) {
            resultsDiv.innerHTML = `<p class="error-message">Cidade não encontrada: ${city}.</p>`;
            return;
        }

        displayWeather(data);

    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = '<p class="error-message">Erro ao se conectar à API. (Verifique sua conexão ou Firewall).</p>';
    }
}

// 5. FUNÇÃO DE EXIBIÇÃO DE CLIMA
function displayWeather(data) {
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const city = data.name;
    const country = data.sys.country;
    const icon = data.weather[0].icon;

    resultsDiv.innerHTML = `
        <h2>${city}, ${country}</h2>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Ícone do Clima">
        <p class="temp">${temp.toFixed(1)}°C</p>
        <p class="description">${description.charAt(0).toUpperCase() + description.slice(1)}</p>
        <p>Umidade: ${data.main.humidity}%</p>
    `;
}

// --- 6. REGISTRO DO SERVICE WORKER (CORREÇÃO CRÍTICA PARA O PWA) ---
// Este bloco registra o Service Worker para habilitar o PWA.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // O caminho "./service-worker.js" é crucial para que o navegador encontre o arquivo no mesmo diretório.
    navigator.serviceWorker.register('./service-worker.js') 
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration.scope);
      })
      .catch(error => {
        console.log('Falha no registro do Service Worker:', error);
      });
  });
}