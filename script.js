$(document).ready(function(){

var APIKey = "166a433c57516f51dfab1f7edaed8413";
var cities = []
var uvCities = []
      
for (i=0; i < localStorage.length; i++) {
    cities.push(JSON.parse(localStorage.getItem(i)))
}

if (localStorage.length > 0) {
    renderHistory();
    queryCity();
}

$("#search").on("click", function(event) {
    event.preventDefault();
    var city = $("#city-input").val().trim(); 
    if (city) {
        cities.push(city.charAt(0).toUpperCase() + city.slice(1)); 
    }

    $("#city-input").val("");

    queryCity();
    renderHistory();
})

function queryCity() {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + cities[cities.length-1] + "&cnt=6&appid=" + APIKey;
    
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        uvCities.push(response.city.coord);
        var dateMain = new Date(response.list[0].dt * 1000).toDateString();
        var tempF = (response.list[0].temp.day - 273.15) * 1.80 + 32;
            $(".city").html("<h2>" + response.city.name + "</h2>" + "<h5>" + dateMain + "</h5>").attr("style", "color: black;");
            $(".wind").text("Wind Speed: " + response.list[0].speed + " mph");
            $(".humidity").text("Humidity: " + response.list[0].humidity + "%");
            $(".icon").attr("src", "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");
            $(".temp").text("Temperature: " + tempF.toFixed(2) + " F");

            $(".forecast").empty()
            for ( i = 1; i < 6; i++) {
                var icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png").addClass("image");
                var date = new Date(response.list[i].dt * 1000).toLocaleDateString("en-US");
                var temp = (response.list[i].temp.day - 273.15) * 1.80 + 32;
                var forecast = $("<div>").html("<h6>" + date + "</h6>" + "<br>" + "<p>" + "Humidity: " + response.list[i].humidity + "%" + "<br>" + "Temp: " + temp.toFixed(2) + " F" + "</p>").addClass("list-group-item").addClass("forecast-days").append(icon);
                $(".forecast").append(forecast);
        }
    queryUV();
    })
}

function queryUV () {
    var queryURLindex = "https://api.openweathermap.org/data/2.5/uvi?lat=" + uvCities[uvCities.length-1].lat + "&lon=" + uvCities[uvCities.length-1].lon + "&appid=" + APIKey;

    $.ajax({
        url: queryURLindex,
        method: "GET"
    }).then(function(response) {
        $(".uv-index").html("UV Index: ");

        var index = response.value;
        var UVi = $("<span>").text(index);

        if (index < 3) {
            UVi.addClass("low")
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
    var newSet = new Set(cities);
    var historyList = Array.from(newSet);

    for (i = 0; i < historyList.length; i++) {
        var history = historyList[i];
        localStorage.setItem(i, JSON.stringify(historyList[i]));
        var newCity = document.createElement("button");
        newCity.textContent = JSON.parse(localStorage.getItem(i));
        newCity.classList.add("list-group-item")
        newCity.classList.add("history-city")
        
        $(".history").prepend(newCity);

    }
}
 
$(document).on("click", ".history-city", function (event) {
    var city = $(this).html();
    cities.push(city)
    
    queryCity();
})

$(document).ajaxError(function() {
    $(".temp").empty()
    $(".wind").empty()
    $(".humidity").empty()
    $(".icon").attr("src", "")
    $(".uv-index").empty()
    $(".forecast").empty()
    $(".city").html("<h3>" + "This place does not exist. Try again." + "</h3>").attr("style", "color: red;")
})

})
