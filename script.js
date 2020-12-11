$(document).ready(function(){

    
    // This is our API key
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    // Here we are building the URL we need to query the database
    //var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&cnt=5&appid=" + APIKey;
   // var city = $("#city-input").val().trim();
      //request syntax

      //airpollution url request
//http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}


var cities = []
    var uvCities = [
        //{berlin: {lat: "52.5244", lon: "13.4105"}}
      ]


        $("#search").on("click", function(event) {
            event.preventDefault();
            console.dir(event)
        var city = $("#city-input").val().trim();
        cities.push(city);
        console.log(city);
        console.log(cities);

        queryCity();
        renderHistory();
        })

        function queryCity() {
            $(".city").empty()


           // var city = $(this).attr("data-name")
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + cities[0] + "&cnt=6&appid=" + APIKey;
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log((response))
            //$(".display").empty()
            uvCities.push(response.city.coord)
            console.log(uvCities)

            //WILL NEED TO REFORMAT DATE DISPLAY
            $(".city").html("<h2>" + response.city.name + "</h2>");
            $(".wind").text("Wind Speed: " + response.list[0].speed);
            $(".humidity").text("Humidity: " + response.list[0].humidity + "%");
            var tempF = (response.list[0].temp.day - 273.15) * 1.80 + 32;
            console.log(tempF)
            $(".temp").text("Temperature: " + tempF.toFixed(2) + "F");
            $(".forecast").empty()
            for ( i = 1; i < 6; i++) {
                console.log(response.list[i].humidity)
                //var forecast = document.createElement("div")
                //forecast.textContent = "Humidity: " + response.list[i].main.humidity
                var temp = (response.list[i].temp.day - 273.15) * 1.80 + 32;
                var forecast = $("<div>").html(response.list[i].dt_txt + "<br>" + "Humidity: " + response.list[i].humidity + "%" + "<br>" + "Temp: " + temp.toFixed(2) + "F").addClass("list-group-item").addClass("forecast-days")
                $(".forecast").append(forecast)
            }
            queryUV()
        })
    }

    function queryUV () {
        //uv index
    var queryURLindex = "http://api.openweathermap.org/data/2.5/uvi?lat=" + uvCities[0].lat + "&lon=" + uvCities[0].lon + "&appid=" + APIKey

    $.ajax({
        url: queryURLindex,
        method: "GET"
    }).then(function(response) {
        console.log(response)
    })
}

function renderHistory() {
    $(".history").empty();
    for (i = 0; i < cities.length; i++) {
        var history = cities[i]
        
        var newCity = document.createElement("button")
        newCity.textContent = history;
        newCity.setAttribute("data-name", i);
        newCity.classList.add("list-group-item")
        newCity.classList.add("history-city")

        $(".history").prepend(newCity);
        console.log($("dataset"))
    }


 }
 
        
 $(document).on("click", ".history-city", function (event) {
    var city = $(this).attr("data-name");
  queryCity();
 })



})