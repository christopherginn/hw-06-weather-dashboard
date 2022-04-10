console.log("hello")

var searchFormEl = document.querySelector("#search-form");
var weatherTodayCityEl = document.querySelector("#weather-today-city");
var weatherTodayWindEl = document.querySelector("#weather-today-wind");
var weatherTodayTempEl = document.querySelector("#weather-today-temp");
var weatherTodayHumidityEl = document.querySelector("#weather-today-humidty");
var weatherTodayUVEl = document.querySelector("#weather-today-uvindex");
var cityInput = document.querySelector("#city-search")

var baseUrl ="https://api.openweathermap.org/";
// var apiKey ="33ba12eb8456c85829294486c9bf64c1";
var apiKey = "54330efedf22e2ce54f6bbcee8ed5498";
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

            weatherTodayCityEl.textContent = city;
            weatherTodayTempEl.textContent = temp;
            weatherTodayWindEl.textContent = windSpeed;
            weatherTodayHumidityEl.textContent = humidity;
            weatherTodayUVEl.textContent = uviInd;

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


