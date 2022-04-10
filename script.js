console.log("hello")

var searchFormEl = document.querySelector("#search-form");
var weatherTodayCityEl = document.querySelector("#weather-today-city");
var weatherTodayWindEl = document.querySelector("#weather-today-wind");
var weatherTodayTempEl = document.querySelector("#weather-today-temp");
var weatherTodayHumidityEl = document.querySelector("#weather-today-humidty");
var weatherTodayUVEl = document.querySelector("#weather-today-uvindex");
var cityInput = document.querySelector("#city-search")
var forecastEL = document.querySelector("#forecast-container");

var baseUrl ="https://api.openweathermap.org/";
// var apiKey ="33ba12eb8456c85829294486c9bf64c1";
var apiKey = "54330efedf22e2ce54f6bbcee8ed5498";
function populate5day(data) {
    data.forEach(function (day, index){
        if(index === 0 || index > 5) {
            return;
        }
        // var day =;
        var temp = day.temp.day;
        var windSpeed = day.wind_speed;
        var humidity = day.humidity;
        var icon = day.weather[0].icon;

        var div = document.createElement('div');
        div.classList = "card-weather text-light bg-dark col-md-2 p-3 me-2";
        div.innerHTML = `
        <h4>Date</h4>
        <img src=https://openweathermap.org/img/wn/${icon}.png />
        <dl>
            <dt>Temp:</dt>
            <dd>${temp}</dd>
            <dt>Wind:</dt>
            <dd>${windSpeed} MPH</dd>
            <dt>Humdity</dt>
            <dd>${humdity}%</dd>
        </dl>
        `;
        forecastEL.appendChild(div);
    });
};

function getCityTodayWeather(city){
    var url = `${baseUrl}geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    fetch(url).then(function(response){
        return response.json();
    })
    .then(function (data){
        console.log(city);
        var cityObject = data[0];
        var lat = cityObject.lat;
        var lon = cityObject.lon;

        var currentWeatherUrl = `${baseUrl}data/2.5/oncall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        fetch(currentWeatherUrl)
        .then (function (response){
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var current = data.current;
            var temp = current.temp;
            var windSpeed = current.wind_speed;
            var humidity = current.humidity;
            var uviInd = current.uvi;
            var icon = current.weather[0].icon;

            weatherTodayCityEl.textContent = city;
            weatherTodayTempEl.textContent = temp;
            weatherTodayWindEl.textContent = windSpeed;
            weatherTodayHumidityEl.textContent = humidity;
            weatherTodayUVEl.textContent = uviInd;

            populate5day(data.daily);

        });
    });
}

function addEventListeners(){
    searchFormEl.addEventListener("submit", function (event){
        event.preventDefault();
        var city = cityInput.value;
        getCityTodayWeather(city);
    })
}

function init() {
    addEventListeners()
};

init();


