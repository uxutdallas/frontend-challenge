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
  
  //Get the current time on a day
  function getCurrentTime(){
    var curDate = new Date();
    var hours = curDate.getHours();
    var minutes = curDate.getMinutes();
    var seconds = curDate.getSeconds();
    var time = "";
    //When combining the strings of hours, minutes, and seconds together, it can sometimes result into times like 2:6:3, which would be considered a later(greater) time than times such as 12:22:33
    //If the hour time is less than 10, add string 0 to time
    if(hours < 10)
      time += "0";
    //Add the current hour and colon to time
    time += hours + ":";
    //If the minute time is less than 10, add string 0 to time
    if(minutes < 10)
      time += "0";
    //Add the current minute and colon to time
      time += minutes + ":";
    //If the seconds number is less than 10, add string 0 to time
    if(seconds < 10)
      time += "0";
    //Add the current second and colon to time
      time += seconds;

    //Return time
    return time;
  }

  function show_weather(temp, status, name, country) {
    var name_el = document.getElementById('name');
    var country_el = document.getElementById('country');
    var temp_el = document.getElementById('temp');
    var img_el = document.getElementById('weather-img');
  
    name_el.innerHTML = name;
    country_el.innerHTML = country;
    temp_el.innerHTML = temp + '&#8457;';
    //Get the current time
    var time = getCurrentTime();
    
    //18:00:00 is 6:00:00 pm. Anytime after 6:00:00pm and before 6:00:00am is considered nighttime.
    //If the weather is clear DURING the night, a moon will be displayed.
    //Else, the image of the current weather status will be displayed
    if(status.toLowerCase() == 'clear' && (time > '18:00:00' || time < '06:00:00'))
      img_el.src = '/src/imgs/weather-icons/night.svg';
    else
      img_el.src = '/src/imgs/weather-icons/' + status.toLowerCase() + '.svg';
  
    removeLoader();
  }
  
  document.addEventListener('DOMContentLoaded', init);