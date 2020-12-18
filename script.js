$(document).ready(function(){

    $(document).ajaxError(function() {
        $(".temp").empty()
        $(".wind").empty()
        $(".humidity").empty()
        $(".icon").attr("src", "")
        $(".uv-index").empty()
        $(".forecast").empty()
        $(".city").html("<h3>" + "This place does not exist. Try again." + "</h3>").attr("style", "color: red;")
    })
    
    // This is our API key
    var APIKey = "166a433c57516f51dfab1f7edaed8413";




    // now must ensure that nothing happens if the city is not a city (don't add to history) 
    // and also come up with message "this is not a city"

var cities = []
    var uvCities = [
        //{berlin: {lat: "52.5244", lon: "13.4105"}}
      ]
      for (i=0; i < localStorage.length; i++) {
      cities.push(JSON.parse(localStorage.getItem(i)))}

      if (localStorage.length > 0) {
      renderHistory();
      queryCity();
      }

        $("#search").on("click", function(event) {
            event.preventDefault();
            console.dir(event)
        var city = $("#city-input").val().trim(); 
        $("#city-input").val("") 
        //city.attr("data-name", $("#city-input"))
       // city.charAt(0).toUpperCase()
        cities.push(city); 
        console.log(city);
        //console.log(cities);
        //.charAt(0).toUpperCase()

        queryCity();
        renderHistory();
        })



        function queryCity() {
            //$(".city").empty()


           // var city = $(this).attr("data-name")
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + cities[cities.length-1] + "&cnt=6&appid=" + APIKey;
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log((response))
            //if (response.message) {
                //alert("nope")
                //$(".city").html("<h2>" + "This place does not exist! Try again." + "</h2>").attr("style", "color: red;");
            //}
            //$(".display").empty()

    
            uvCities.push(response.city.coord)
            console.log(uvCities)
            var dateMain = new Date(response.list[0].dt * 1000).toDateString()
            //WILL NEED TO REFORMAT DATE DISPLAY
            $(".city").html("<h2>" + response.city.name + "</h2>" + "<h5>" + dateMain + "</h5>").attr("style", "color: black;");
            $(".wind").text("Wind Speed: " + response.list[0].speed);
            $(".humidity").text("Humidity: " + response.list[0].humidity + "%");
            $(".icon").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png")
            var tempF = (response.list[0].temp.day - 273.15) * 1.80 + 32;

            console.log(tempF)
            $(".temp").text("Temperature: " + tempF.toFixed(2) + "F");
            $(".forecast").empty()
            for ( i = 1; i < 6; i++) {
                console.log(response.list[i].humidity)
                var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png").addClass("image")

                var date = new Date(response.list[i].dt * 1000).toLocaleDateString("en-US")

                console.log(icon)
                var temp = (response.list[i].temp.day - 273.15) * 1.80 + 32;
                var forecast = $("<div>").html("<h6>" + date + "</h6>" + "<br>" + "<p>" + "Humidity: " + response.list[i].humidity + "%" + "<br>" + "Temp: " + temp.toFixed(2) + "F" + "</p>").addClass("list-group-item").addClass("forecast-days").append(icon)
                $(".forecast").append(forecast)

            }

            
            queryUV()
            
        
        })
    
    }


    function queryUV () {
        //uv index
    var queryURLindex = "http://api.openweathermap.org/data/2.5/uvi?lat=" + uvCities[uvCities.length-1].lat + "&lon=" + uvCities[uvCities.length-1].lon + "&appid=" + APIKey

    $.ajax({
        url: queryURLindex,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        //MUST fix CLASS SO BACKGROUND of numbers only CHANGES COLOR WITH IF STATEMENT
        $(".uv-index").html("UV Index: ")
        var index = response.value;

        var UVi = $("<span>").text(index)
        if (index < 3) {
            
            UVi.addClass("low")
            //UVi.attr("style", "background-color: green;")
        } else if (index > 2 && index < 6) {
            UVi.addClass("moderate")
        } else if (index > 5 && index < 8) {
            UVi.addClass("high")
        } else if (index > 7) {
            UVi.addClass("very-high")
        }
        $(".uv-index").append(UVi)

    })
   
}



function renderHistory() {
    $(".history").empty();
    var newSet = new Set(cities)
    console.log(newSet)
    var historyList = Array.from(newSet)
    console.log(historyList)

    console.log(uvCities)



for (i = 0; i < historyList.length; i++) {
    

    //localStorage.setItem("uv array", JSON.stringify(uvCities))
        var history = historyList[i]
        localStorage.setItem(i, JSON.stringify(historyList[i]))
        
        var newCity = document.createElement("button")
        newCity.textContent = JSON.parse(localStorage.getItem(i)).charAt(0).toUpperCase() + JSON.parse(localStorage.getItem(i)).slice(1)
        //newCity.textContent = historyList[i];
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

    //queryCity()
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
