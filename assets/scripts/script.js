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

//gets references to HTML elements necessary for weather app functionality
var citySearchInput = $(".search-input");
var searchButton = $(".search-button");
var searchHistory = $(".search-history");
var weatherToday = $(".weather-today");
var fiveDayWeather = $(".weather-five-day").children();

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

	//retrieves today's weather data from searched city coordinates and updates the page accordingly
	await fetch(todayWeatherURL)
	.then(function(response)
	{
		return response.json();
	})
	.then(function(data)
	{
		//update's todays weather data with that of the searched city
		weatherToday.children(".city-name").text(searchedCity + " (" + dayjs().format("YYYY/MM/DD") + ")");
		weatherToday.children("img").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
		weatherToday.children(".temperature").text("Temp: " + data.main.temp + "°C");
		weatherToday.children(".wind-speed").text("Wind: " + data.wind.speed + " KM / H");
		weatherToday.children(".humidity").text("Humidity: " + data.main.humidity + "%");
	});

	//GET CHILD ELEMENTS OF A CERTAIN DAY BY CLASS
	//$(fiveDayWeather[0]).children(".temperature").text();

	//retrieves next five days of weather data from searched city coordinates and updates the page accordingly
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