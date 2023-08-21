/*
ethan (average-kirigiri-enjoyer)
SCS Boot Camp Module 6 Weekly Challenge - City Weather Dashboard
Created 2023/08/16
Last Edited 2023/08/21
*/

//openweathermap API key
APIKey = "2fae20ca26e4a9b0f2e2e5c58c74a9be";

//defining variables to hold data needed for weather app functionality
var latitude;
var longitude;
var searchedCity;
var searchSuccessful;
var historyStorage;

//gets references to HTML elements necessary for weather app functionality
var citySearchInput = $(".search-input");
var searchButton = $(".search-button");
var searchHistory = $(".search-history");
var weatherToday = $(".weather-today");
var fiveDayWeather = $(".weather-five-day").children();

//function to get weather data from the city the user searched for and display it to the page
async function getWeatherData(searchedCity)
{
	//defines URL to geocode city name searched by user into coordinates
	var geocodeURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + "&limit=1&appid=" + APIKey + "&units=metric";

	//retrieves coordinates of city the user searched for
	await fetch(geocodeURL)
	.then(function(response)
	{
		return response.json();
	})
	.then(function(data)
	{
		//if data for the city name input by the user could not be found, inform the user as such, and mark the search as a failure
		if (data[0] == undefined)
		{
			searchSuccessful = false;
			alert("Data for the city '" + searchedCity + "' could not be found; please try again.");
		}
		else //otherwise, mark the search as a success
		{
			searchSuccessful = true;
		}

		//retrieve coordinates of searched city
		latitude = data[0].lat;
		longitude = data[0].lon;
	});

	//if previous city search was not successful, eject from function
	if (!searchSuccessful)
	{
		return;
	}

	//defines URLs to retrieve weather data from searched city coordinates
	var todayWeatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&limit=1&appid=" + APIKey + "&units=metric";
	var fiveDayWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&limit=5&appid=" + APIKey + "&units=metric";

	//retrieves today's weather data from searched city coordinates and updates the page accordingly
	await fetch(todayWeatherURL)
	.then(function(response)
	{
		return response.json();
	})
	.then(function(data)
	{
		//update today's weather data with that of the searched city
		weatherToday.children(".city-name").text(searchedCity + " (" + dayjs().format("YYYY/MM/DD") + ")");
		weatherToday.children("img").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"); 
		weatherToday.children(".temperature").text("Temp: " + data.main.temp + "°C");
		weatherToday.children(".wind-speed").text("Wind: " + data.wind.speed + " KM / H");
		weatherToday.children(".humidity").text("Humidity: " + data.main.humidity + "%");
	});

	//retrieves next five days of weather data from searched city coordinates and updates the page accordingly
	await fetch(fiveDayWeatherURL)
	.then(function(response)
	{
		return response.json();
	})
	.then(function(data)
	{
		//update first day of five-day weather forecast with that of the searched city
		$(fiveDayWeather[0]).children("h3").text(dayjs().add(1, "d").format("YYYY/MM/DD"));
		$(fiveDayWeather[0]).children("img").attr("src", "https://openweathermap.org/img/w/" + data.list[1].weather[0].icon.slice(0, -1) + "d.png"); //slices last character off icon string & replaces it with "d" such that the daytime variation of each icon will always be displayed
		$(fiveDayWeather[0]).children(".temperature").text("Temp: " + data.list[1].main.temp + "°C");
		$(fiveDayWeather[0]).children(".wind-speed").text("Wind: " + data.list[1].wind.speed + " KM / H");
		$(fiveDayWeather[0]).children(".humidity").text("Humidity: " + data.list[1].main.humidity + "%");

		//update second day of five-day weather forecast with that of the searched city
		$(fiveDayWeather[1]).children("h3").text(dayjs().add(2, "d").format("YYYY/MM/DD"));
		$(fiveDayWeather[1]).children("img").attr("src", "https://openweathermap.org/img/w/" + data.list[2].weather[0].icon.slice(0, -1) + "d.png");
		$(fiveDayWeather[1]).children(".temperature").text("Temp: " + data.list[2].main.temp + "°C");
		$(fiveDayWeather[1]).children(".wind-speed").text("Wind: " + data.list[2].wind.speed + " KM / H");
		$(fiveDayWeather[1]).children(".humidity").text("Humidity: " + data.list[2].main.humidity + "%");

		//update third day of five-day weather forecast with that of the searched city
		$(fiveDayWeather[2]).children("h3").text(dayjs().add(3, "d").format("YYYY/MM/DD"));
		$(fiveDayWeather[2]).children("img").attr("src", "https://openweathermap.org/img/w/" + data.list[3].weather[0].icon.slice(0, -1) + "d.png");
		$(fiveDayWeather[2]).children(".temperature").text("Temp: " + data.list[3].main.temp + "°C");
		$(fiveDayWeather[2]).children(".wind-speed").text("Wind: " + data.list[3].wind.speed + " KM / H");
		$(fiveDayWeather[2]).children(".humidity").text("Humidity: " + data.list[3].main.humidity + "%");

		//update fourth day of five-day weather forecast with that of the searched city
		$(fiveDayWeather[3]).children("h3").text(dayjs().add(4, "d").format("YYYY/MM/DD"));
		$(fiveDayWeather[3]).children("img").attr("src", "https://openweathermap.org/img/w/" + data.list[4].weather[0].icon.slice(0, -1) + "d.png");
		$(fiveDayWeather[3]).children(".temperature").text("Temp: " + data.list[4].main.temp + "°C");
		$(fiveDayWeather[3]).children(".wind-speed").text("Wind: " + data.list[4].wind.speed + " KM / H");
		$(fiveDayWeather[3]).children(".humidity").text("Humidity: " + data.list[4].main.humidity + "%");

		//update fifth day of five-day weather forecast with that of the searched city
		$(fiveDayWeather[4]).children("h3").text(dayjs().add(5, "d").format("YYYY/MM/DD"));
		$(fiveDayWeather[4]).children("img").attr("src", "https://openweathermap.org/img/w/" + data.list[5].weather[0].icon.slice(0, -1) + "d.png");
		$(fiveDayWeather[4]).children(".temperature").text("Temp: " + data.list[5].main.temp + "°C");
		$(fiveDayWeather[4]).children(".wind-speed").text("Wind: " + data.list[5].wind.speed + " KM / H");
		$(fiveDayWeather[4]).children(".humidity").text("Humidity: " + data.list[5].main.humidity + "%");
	});
}

//function to add a searched city to search history
function addCityToHistory(searchedCity)
{
	//creates new button element based on searched city, and adds it to search history list
	var citySearchEntry = $("<button>").text(searchedCity);
	citySearchEntry.prependTo(searchHistory);

	//if the search history exceeds twelve entries, remove the oldest entry
	if (searchHistory.children().length > 12)
	{
		searchHistory.children().last().remove();
	}

	//sets history storage to an empty array, and creates a new entry in history array for each city in the search history
	historyStorage = [];

	for (entry = 0; entry < searchHistory.children().length; entry++)
	{
		var searchEntry = $(searchHistory.children()[entry]).text();
		historyStorage.push(searchEntry);
	}

	//sends search history data to local storage
	localStorage.setItem("searchHistory", JSON.stringify(historyStorage));
}

//function to load and render search history data from local storage
function loadSearchHistory()
{
	//if there is no search history data in local storage, render Toronto's weather data as a placeholder, and eject from function
	if (!localStorage.getItem("searchHistory"))
	{
		getWeatherData("Toronto");
		return;
	}
	
	//retrieves search history data from local storage and displays weather data of previous search
	var storedSearchHistory = JSON.parse(localStorage.getItem("searchHistory"));
	getWeatherData(storedSearchHistory[0]);

	//creates a new search history entry for each item in the local storage array, and renders it to the page
	for (entry = 0; entry < storedSearchHistory.length; entry++)
	{
		var citySearchEntry = $("<button>").text(storedSearchHistory[entry]);
		citySearchEntry.appendTo(searchHistory);
	}
}

//waits until document is finished loading before the following code can run
$(document).ready(function() {

	//attempts to retrieve search history data
	loadSearchHistory();

	//attempts to render weather data of city in search history when user clicks on an entry
	searchHistory.on("click", function()
	{
		//checks if the user clicked between the search history entries, ejecting from the function if so
		if ($(event.target).text() === searchHistory.text())
		{
			return;
		}

		//retrieves weather data from clicked search history entry
		searchedCity = $(event.target).text();
		getWeatherData(searchedCity);
	});

	//attempts to update weather data when user clicks the search button
	searchButton.on("click", async function()
	{
		//retrieves text content of the city search box
		searchedCity = citySearchInput.val();

		//if the user did not input any text in the search box, prompts them to do so and ejects from function
		if (!searchedCity)
		{
			alert("Please input a city name to search for.");
			return;
		}

		//attempts to update weather data with that of the city the user searched for
		await getWeatherData(searchedCity);

		//if previous city search was not successful, eject from function
		if (!searchSuccessful)
		{
			return;
		}

		//add city to search history
		addCityToHistory(searchedCity);

		//empties search box
		citySearchInput.val("");
	});
});