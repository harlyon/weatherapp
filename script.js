window.onload = function() {
	var yourLat = 0;
	var yourLon = 0;
	$.ajax({
        url: "http://ip-api.com/json",
        async: false,
        dataType: 'json',
    	success: function(json) {
				yourLat = json.lat;
				yourLon = json.lon;
    	}
    });
	var url = "http://api.openweathermap.org/data/2.5/weather?lat="+yourLat+"&lon="+yourLon+"&APPID=8e5842b4949d739ee76a7bd5d94aaea8";
	$.getJSON(url, function(json) {
		// Location
		$("h1").html(json.name+", "+json.sys.country);
		$("#loc").css("display", "none");
		// Temperature
		var tempC = Math.floor(json.main.temp - 273);
		var tempF = Math.floor((tempC * 1.8) + 32);
		$("#temp").html(tempF+" F");
		var fahrenheit = true;
		var celsius = false;
			$("#temp").click(function(){
				if (celsius === true) {
					$("#temp").html(tempF+" F");
					celsius = false;
					fahrenheit = true;
				} else if (fahrenheit === true) {
					$("#temp").html(tempC+" C");
					fahrenheit = false;
					celsius = true;
				}
			});
		// Weather
		$("#weather").html(json.weather[0].main);
		// Icon
		var icon = json.weather[0].icon;
		$("#icon").html("<img src=\"http://openweathermap.org/img/w/"+icon+".png\">");
	});
}
