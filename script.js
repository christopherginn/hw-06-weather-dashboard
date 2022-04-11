var searchForm = document.getElementById("search-form");

var todayWeatherCityDate = document.getElementById("today-city");
var todayTemp = document.getElementById("today-temp");
var todayWind = document.getElementById("today-wind");
var todayHumidity = document.getElementById("today-humidity");
var todayUvind = document.getElementById("today-uvIndex");
var searchCityInput = document.getElementById("search-city");

var startUrl = "http://api.openweathermap.org/";
var apiKey = "33ba12eb8456c85829294486c9bf64c1";

function run() {
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        var city = searchCityInput.value;


        fetchCityWeather(city);
    });
}

function fetchCityWeather(city) {
    var url = `${startUrl}geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    fetch(url).then(function(response){
        return response.json();
    })
    .then(function(data){
        // console.log(data)
        var lat = data[0].lat;
        var lon = data[0].lon;

        var todayWeathUrl = `${startUrl}data/2.5/onecall?lat=${lat}&lon=${lon}&&appid=${apiKey}`;

        fetch(todayWeathUrl).then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
        });
    });
};
run();