window.addEventListener('load', () => {

    let longitud;
    let latitud;

    let ubicacion = $('#nombre_ubicacion');
    let temperatura = $('#temperatura');
    let humedad = $('#humedad');
    let icono = $('#icono');
    let velocidad_viento = $('#velocidad_viento');

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(posicion => {
            longitud = posicion.coords.longitude;
            latitud = posicion.coords.latitude;

            var direccion = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitud + '&lon=' + longitud + '&appid=9cac82336b510b71ad8adb4dab5847c3';

            console.log(direccion);

            $.ajax({
                type: "GET",
                async: false,
                dataType: 'json',
                url: direccion,
                success: function (datos) {

                    ubicacion.html(datos.name);

                    temperatura.html((datos.main.temp - 273.15).toFixed(2) + " ºC");

                    humedad.html("Humedad: " + datos.main.humidity + " %");

                    velocidad_viento.html("Viento: " + (datos.wind.speed * 3.6).toFixed(0) + " km/h");

                    switch (datos.weather[0].main) {
                        case 'Clear':
                            icono.attr('src', 'amcharts_weather_icons_1.0.0/animated/day.svg');
                            break;
                        case 'Rain':
                            icono.attr('src', 'amcharts_weather_icons_1.0.0/animated/rainy-7.svg');
                            break;
                        case 'Snow':
                            icono.attr('src', 'amcharts_weather_icons_1.0.0/animated/snowy-6.svg');
                            break;
                        case 'Thunderstorm':
                            icono.attr('src', 'amcharts_weather_icons_1.0.0/animated/thunder.svg');
                            break;
                        case 'Drizzle':
                            icono.attr('src', 'amcharts_weather_icons_1.0.0/animated/rainy-2.svg');
                            break;
                        case 'Atmosphere':
                            icono.attr('src', 'amcharts_weather_icons_1.0.0/animated/weather.svg');
                            break;
                        case 'Clouds':
                            icono.attr('src', 'amcharts_weather_icons_1.0.0/animated/cloudy-day-1.svg');
                            break;
                    }
                }
            });

        })
    }
})