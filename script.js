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

        var todayWeathUrl = `${startUrl}data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

        fetch(todayWeathUrl).then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var temp = data.current.temp
            var wind = data.current.wind_speed;
            var humid = data.current.humidity;
            var uv = data.current.uvi;

            var cityArray = city.split(" ");
            for (var i = 0; i < cityArray.length; i++) {
                cityArray[i] = cityArray[i].charAt(0).toUpperCase() + cityArray[i].slice(1);
            }
            var cityFormatted = cityArray.join(" ");

            todayWeatherCityDate.textContent = cityFormatted;
            todayTemp.textContent = temp +"\u00B0";
            todayWind.textContent = wind + " MPH";
            todayHumidity.textContent = humid + "%";
            todayUvind.textContent = uv;

        });
    });
};
run();