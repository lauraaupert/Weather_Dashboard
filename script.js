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
        $("#city-input").val("")
        //city.attr("data-name", $("#city-input"))
        cities.push(city);
        console.log(city);
        console.log(cities);

        queryCity();
        renderHistory();
        })

        function queryCity() {
            $(".city").empty()


           // var city = $(this).attr("data-name")
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + cities[cities.length-1] + "&cnt=6&appid=" + APIKey;
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log((response))
            //$(".display").empty()
            uvCities.push(response.city.coord)

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
                var date = new Date(response.list[i].dt * 1000).toDateString()

                console.log(date)
                //var forecast = document.createElement("div")
                //forecast.textContent = "Humidity: " + response.list[i].main.humidity
                var temp = (response.list[i].temp.day - 273.15) * 1.80 + 32;
                var forecast = $("<div>").html(date + "<br>" + "Humidity: " + response.list[i].humidity + "%" + "<br>" + "Temp: " + temp.toFixed(2) + "F").addClass("list-group-item").addClass("forecast-days")
                $(".forecast").append(forecast)
            }
            queryUV()
        })
    }

    function queryUV () {
        //uv index
    var queryURLindex = "http://api.openweathermap.org/data/2.5/uvi?lat=" + uvCities[cities.length-1].lat + "&lon=" + uvCities[cities.length-1].lon + "&appid=" + APIKey

    $.ajax({
        url: queryURLindex,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        //MUST fix CLASS SO BACKGROUND of numbers only CHANGES COLOR WITH IF STATEMENT
        var UV = $(".uv-index")
        UV.text("UV Index: ")
        var index = UV.append(" " + response.value).addClass("list-group-item");
        if (response.value < 3) {
            index.attr("style", "background-color: green;")
        } else if (response.value > 2 && response.value < 6) {
            index.addClass("moderate")
        } else if (response.value > 5 && response.value < 8) {
            index.addClass("high")
        } else if (response.value > 7) {
            index.addClass("very-high")
        }

    })
   
}
//for (i = 0; i < uvCities.length; i++) {
  //  uvCities[i].attr("id", i)
   // }
    //console.log(uvCities)


function renderHistory() {
    $(".history").empty();
    var newSet = new Set(cities)
    console.log(newSet)
    var historyList = Array.from(newSet)
    console.log(historyList)
for (i = 0; i < historyList.length; i++) {
    
        var history = historyList[i]
        
        var newCity = document.createElement("button")
        newCity.textContent = history;
        newCity.setAttribute("data-name", i);
        newCity.classList.add("list-group-item")
        newCity.classList.add("history-city")
        
        console.log(cities)
        console.log(uvCities)
            $(".history").prepend(newCity);
        console.log($("data-name"))
        if($.inArray(history, cities)) {
            console.log($.inArray)
    }
    console.log(newCity)


 }
}
 
        
 $(document).on("click", ".history-city", function (event) {
    var city = $(this).html();
    console.log(city)
    cities.push(city)
   // var history = cities.filter(function(value){ 
        //return value = !city;
        //history.push(city)
    //});
    console.log(cities)
    console.log(history)
  queryCity();
 })



})
//next steps: local storage, icons, uv index background color, capitalize first letter of cities in history
//must take care of double values in the array Line 125 only partly solves the problem because the url takes length-1 but it pushes only if it doesn't exist
