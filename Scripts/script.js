//listeners

$(document).ready(function () {
    const myKey = '795b80183c991e3213eaa31272472ea7'
$('#searchButton').click(function () {
    console.log("search button pressed");
  var userInput = $('#city').val();
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=${myKey}`;




  $.ajax({
    url: queryURL,
    type: 'GET',
  }).then(function (response) {
    console.log(response);
    response.name;
    response.main.temp;
    response.main.humidity;
    response.wind.speed;

    $('#cityName').text(
      response.name + ' (' + new Date().toLocaleDateString() + ')'
    );

    $('#cityName').append(
      `<img src="http://openweathermap.org/img/wn/${response.weather[0].icon}.png">`
    );

    $('#currentTemp')
      .text(`Temperature: ${response.main.temp}` + 'º F')
      .addClass('currentWeather');

    $('#humidity')
      .text(`Humidity: ${response.main.humidity}` + '%')
      .addClass('currentWeather');

    $('#windSpeed')
      .text(`Windspeed: ${response.wind.speed}` + 'mph')
      .addClass('currentWeather');

    removePreviousForcast();
    getForcast(userInput);
  });
});


//functions
function removePreviousForcast(){
    $('.divClasses').remove();
}

function getForcast(input) {
  var fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${input}&units=imperial&appid=${myKey}`;


  

  $.ajax({
    url: fiveDayQueryURL,
    type: 'GET',
  }).then(function (response) {

    $('#forecast')
      .html('<h4 class="">5-Day Forecast:</h4>')
      

    console.log(response);

    for (var i = 0; i < response.list.length; i++) {
      var hour = response.list[i];

      if (hour.dt_txt.indexOf('00:00:00') != -1) {
        var date = new Date(hour.dt_txt).toLocaleDateString();
        hour.main.temp;

        hour.main.humidity;
        var DIV = $('<div>');

        var image = $('<img>');

        image.attr(
          'src',
          `http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`
        );
        DIV.addClass('divClasses justify-content-left');

        DIV.append(`<h3>${date}</h3>`);

        DIV.append(image);

        DIV.append(
          `<p>Temperture <br>  ${
            hour.main.temp + 'º F'
          } </p><p>Humidity <br> ${hour.main.humidity + '%'}</p>`
        );

        $('#forecast').append(DIV);
      }
    }
  });
}
});
