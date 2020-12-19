Weather Dashboard App

This weather dashboard displays the meteorological conditions of any city in the world: temperature, wind speed, humidity, and UV index. It also gives a 5-day forecast with humidity and temperature. The user can search for a city so that the screen displays the information. The city is then added to the history of searched cities and rendered again when the page is reloaded. If the user searches for a city that does not exist or misspells the city name, an error message will show. If the user clicks the search button while the input field is empty, nothing will happen. Once the search button is clicked, the input field will be emptied. 
This app uses two separate APIs from OpenWeatherMap: the 16-day forecast API (with a count of 6) and the UV index API. The search button triggers the forecast API request, which stores the coordinates of the target city, and in turn triggers a UV index API request to obtain the UV information from those coordinates. 

What I learned and challenges I faced: I had to learn to use the unix date format (who came up with that anyway), I struggled with getting only the UV index to change background color (as opposed to the whole row), I learned how to use .ajaxError, I realized Chrome won't open anything that is not https, I learned how to use set to get rid of the duplicates in an array, I learned to piggy-back a bunch of functions to create divs in jQuery, I learned how to include the weather icons by using the URL in addition to the response.iconcode, I learned how to capitalize the first letter of a string without losing the rest of the letters (I cried a little), I strengthened my understanding of local storage and for-loops as well as the .addClass and .empty functions. 

Link: https: //lauraaupert.github.io/Weather_Dashboard/

Screenshot: ![image](https://user-images.githubusercontent.com/73617474/102698406-f906a300-420a-11eb-9265-4e21a6c577ac.png)

