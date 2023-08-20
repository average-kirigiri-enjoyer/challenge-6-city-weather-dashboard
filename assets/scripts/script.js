/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 6 Weekly Challenge - City Weather Dashboard
Created 2023/08/16
Last Edited 2023/08/19
*/

//openweathermap API key
APIKey = "2fae20ca26e4a9b0f2e2e5c58c74a9be";

//defining variables to hold data needed for weather app functionality
var latitude;
var longitude;

//today's weather
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

//five-day weather
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//geocoding
//http://api.openweathermap.org/geo/1.0/direct?q={CITY}&limit=1&appid={API key}

var searchedCity = "London";

async function getWeatherData()
{
	var geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + "&limit=1&appid=" + APIKey + "&units=metric";

	await fetch(geocodeURL)
		.then(function(response)
		{
			return response.json();
		})
		.then(function(data)
		{
			latitude = data[0].lat;
			longitude = data[0].lon;
		});

	var fiveDayWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&limit=1&appid=" + APIKey + "&units=metric";

	await fetch(fiveDayWeatherURL)
	.then(function(response)
	{
		return response.json();
	})
	.then(function(data)
	{
		//HEY ETHAN; THIS IS THE DATA FOR THE FIRST DAY (OF FIVE IN THE ARRAY)
		console.log("temp: " + data.list[0].main.temp + "°C");
		console.log("humidity: " + data.list[0].main.humidity + "%");
		console.log("weather: " + data.list[0].weather[0].main);
		console.log("weather description: " + data.list[0].weather[0].description);
		console.log("icon: " + data.list[0].weather[0].icon);
		console.log("wind: " + data.list[0].wind.speed + "KM / H");
	});

	//ICON LINK
	//http://openweathermap.org/img/w/10d.png
}