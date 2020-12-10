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

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cities[0] + "&cnt=5&appid=" + APIKey;
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log((response))
            //$(".display").empty()

            $(".city").html("<h2>" + response.name + "</h2>");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            console.log(tempF)
            $(".temp").text("Temperature: " + tempF.toFixed(2) + "F");
    
        })
    }

function renderHistory() {
    $(".history").empty();
    for (i = 0; i < cities.length; i++) {
        var history = cities[i]
        
        var newCity = document.createElement("li")
        newCity.textContent = history;
        newCity.setAttribute("data-index", i);
        newCity.classList.add("list-group-item")

        $(".history").prepend(newCity);
    }


/*
    $.each(cities, function(i, value) {
        console.log(value)

        var newCity = $("<li/>",
        {
          text: value
        }
         
         //myButton.text(value).append("#buttons-view")
        
      )
      $(".history").append(newCity)
    })
    */

 }
        

        //use the todo list activity to append

        //use the same kind of event listener from the working.movie.app 
        //to set the search history cities click request

})