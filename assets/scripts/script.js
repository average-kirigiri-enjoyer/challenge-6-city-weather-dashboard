/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 6 Weekly Challenge - City Weather Dashboard
Created 2023/08/16
Last Edited 2023/08/20
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

//function to get weather data from the city the user searched for and display it to the page
async function getWeatherData()
{
	//defines URL to geocode city name searched by user into coordinates
	var geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + "&limit=1&appid=" + APIKey + "&units=metric";

	//retrieves coordinates of city the user searched for
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

	//defines URLs to retrieve weather data from searched city coordinates
	var todayWeatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&limit=1&appid=" + APIKey + "&units=metric";
	var fiveDayWeatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&limit=1&appid=" + APIKey + "&units=metric";

	//retrieves today's weather data from searched city coordinates
	await fetch(todayWeatherURL)
	.then(function(response)
	{
		return response.json();
	})
	.then(function(data)
	{
		console.log("TODAY'S WEATHER IN: " + searchedCity);
		console.log("temp: " + data.main.temp + "°C");
		console.log("humidity: " + data.main.humidity + "%");
		console.log("weather: " + data.weather[0].main);
		console.log("weather description: " + data.weather[0].description);
		console.log("icon: " + data.weather[0].icon);
		console.log("wind: " + data.wind.speed + "KM / H");
	});

	//retrieves next five days of weather data from searched city coordinates
	await fetch(fiveDayWeatherURL)
	.then(function(response)
	{
		return response.json();
	})
	.then(function(data)
	{
		console.log("TOMORROW'S WEATHER IN: " + searchedCity);
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