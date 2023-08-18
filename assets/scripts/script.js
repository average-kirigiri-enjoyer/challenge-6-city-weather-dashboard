/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 6 Weekly Challenge - City Weather Dashboard
Created 2023/08/16
Last Edited 2023/08/17
*/

//API key; 2f7d29e22fb4097f360e2ea2411af483

//five-day weather
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//geocoding
//http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

function getWeatherData()
{
    var geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=2f7d29e22fb4097f360e2ea2411af483";

    fetch(geocodeURL)
        .then(function(response)
        {
            console.log(response.status);
        })
        .then(function(data)
        {
            console.log(data.JSON());
        });
}

