/*

This is a little script to build in AJAX, handled in JQUERY,
A weather app. Data are obtained from http://api.openweathermap.org
icons are free licensed by Erik Flowers "weather icons"

*/

// Rain : le temps est pluvieux, on choisira donc l'icone "wi wi-day-rain"
// Clouds : le temps est nuageux, on choisira donc l'icone "wi wi-day-cloudy"
// Clear : le ciel est clair, on choisira donc l'icone "wi wi-day-sunny"
// Snow : il neige, on choisira donc l'icone "wi wi-day-snow"
// Mist : brouillard, on choisira donc l'icone "wi wi-day-fog"
// Drizzle : petite pluie, on choisira donc l'icone "wi wi-day-sleet"


/*This a dictionary-like object with class icon name matching weather provided by openweathermap*/
var icons ={

	"Rain" : "wi wi-day-rain",
	"Clouds" : "wi wi-day-cloudy",
	"Clear" : "wi wi-day-sunny",
	"Snow" : "wi wi-day-snow",
	"Mist" : "wi wi-day-fog",
	"Drizzle" : "wi wi-day-sleet"

}


function afficheData(data)
{
	// this function is called once the data is successfully collected from the service.
	// it adds the corresponding class to change the icon and integrate the right temperature
	var weather = data.weather[0].main;
	var temp = Math.round(data.main.temp);
	var city = data.name;
	
	$('#temps i').removeClass().addClass(icons[weather]);
	$('#temperature .degres').html(temp);
	$('#ville-trouvee').html("à " + city + ", ");
	$('#temperature').fadeIn(300);
}


// this script is called once the DOM is loaded
$(function()
{
	// behavior when the form is sent via the submit button
	$('#weather-query').on('submit', function(e){
		var msg = $('#msg');
		msg.html("");
		var field = $('#ville');
		field.removeClass("red-border"); // The red-border class is removed on click
		e.preventDefault(); // prevent the default behavior (we stay on the page)

		if (field.val().trim() == "") // If the field is empty or filled with blank characters
		{
			field.addClass('red-border').val(""); // we color the border in red
			
		}
		else
		{ //otherwise
			var ville = field.val().trim(); //we collect the city
		// we prepare the right url to get the data
			var url = "http://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&units=metric";

		// we send the request and collect the data
			$.getJSON(url, afficheData).fail(function(){
				// in case of error
				msg.html("Désolé, cette ville est inconnue !");


			});
		

		}


	});

	


});