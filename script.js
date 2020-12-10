$(document).ready(function(){

    
    // This is our API key
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    // Here we are building the URL we need to query the database
    //var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&cnt=5&appid=" + APIKey;
   // var city = $("#city-input").val().trim();
      //request syntax
      var cities = []


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
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cities[0] + "&cnt=5&appid=" + APIKey;
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log((response))
            //$(".display").empty()

            //WILL NEED TO REFORMAT DATE DISPLAY
            $(".city").html("<h2>" + response.city.name + " (" + response.list[0].dt_txt + ")" + "</h2>");
            $(".wind").text("Wind Speed: " + response.list[0].wind.speed);
            $(".humidity").text("Humidity: " + response.list[0].main.humidity);
            var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
            console.log(tempF)
            $(".temp").text("Temperature: " + tempF.toFixed(2) + "F");
    
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
 
        
 $(document).on("click", ".history-city", queryCity);



})