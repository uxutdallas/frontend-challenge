function init() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    alert('Geolocation is not supported by this browser.');
    return null;
  }
}

function removeLoader() {
  var loader = document.getElementById('loader');
  var loader_parent = loader.parentNode;
  var weather_block = document.getElementById('weather-block');

  loader_parent.removeChild(loader);
  weather_block.classList.remove('hide');
}

function getWeather(position) {
  var api_url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&' + 'appid=115d8a247511801926c11f972fb5d5b0';
  console.log(api_url);

  var request = new XMLHttpRequest();
  request.open('POST', api_url);

  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj_res = JSON.parse(this.response);
      console.log(obj_res);
      console.log();
      show_weather(k_to_f(obj_res.main.temp), obj_res.weather[0].main, obj_res.name, obj_res.sys.country);
    }
  }

  request.send();
}

function k_to_f(k_unit) {
  var f_unit = (k_unit - 273.15) * 9/5 + 32;

  return Math.round(f_unit);
}

function show_weather(temp, status, name, country) {
  var name_el = document.getElementById('name');
  var country_el = document.getElementById('country');
  var temp_el = document.getElementById('temp');
  var img_el = document.getElementById('weather-img');

  name_el.innerHTML = name;
  country_el.innerHTML = country;
  temp_el.innerHTML = temp + '&#8457;';
  img_el.src = '/src/imgs/weather-icons/' + status.toLowerCase() + '.svg';

  removeLoader();
}

document.addEventListener('DOMContentLoaded', init);