document.addEventListener('DOMContentLoaded',()=>{
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityNameDisplay = document.getElementById('city-name');
    const temparatureDisplay = document.getElementById('temperature');
    const descriptionDisplay = document.getElementById('description');
    const  errorMeassage = document.getElementById('error-message');
    

const API_KEY ="8f51b35f3eba958622111cf5f6148150";

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            getWeatherBtn.click();
        }
    });


    getWeatherBtn.addEventListener('click', async ()=>{
        const city = cityInput.value.trim();
        if(!city) return ;
    
        //it may throw some error
        //server/database is always in another continent

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);

        } catch (error) {
            showError();
        }

    })

    async function fetchWeatherData(city){
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE",response);

        if(!response.ok){
            throw new Error("City Not Found")
        }

        const data = await response.json();
        return data;
    }
    function displayWeatherData(data) {
         console.log(data);
        const {name , main , weather } = data;
        cityNameDisplay.textContent = name;
        temparatureDisplay.textContent = `Temperature: ${main.temp}`;
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
       

        //unlock the display
        weatherInfo.classList.remove('hidden')
        errorMeassage.classList.add('hidden');
        
        
    }

    function showError(){
        weatherInfo.classList.add('hidden');
        errorMeassage.classList.remove('hidden');
    }


})