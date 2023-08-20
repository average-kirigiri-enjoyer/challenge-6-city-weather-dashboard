/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 6 Weekly Challenge - City Weather Dashboard
Created 2023/08/16
Last Edited 2023/08/19
*/

APIKey = "2fae20ca26e4a9b0f2e2e5c58c74a9be";

//five-day weather
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//geocoding
//http://api.openweathermap.org/geo/1.0/direct?q={CITY}&limit=1&appid={API key}

var searchedCity = "London";

function getWeatherData()
{
    var geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + "&limit=1&appid=" + APIKey;

    fetch(geocodeURL)
        .then(function(response)
        {
            return response.json();
        })
        .then(function(data)
        {
            var latitude = data[0].lat;
            var longitude = data[0].lon;
        });
}