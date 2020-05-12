class Ui {
    constructor() {
      this.location = document.getElementById('w-location');
      this.desc = document.getElementById('w-desc');
      this.string = document.getElementById('w-string');
      this.details = document.getElementById('w-details');
     this.icon = document.getElementById('w-icon');
      this.humidity = document.getElementById('w-humidity');
      this.feelsLike = document.getElementById('w-feels-like');
    }
  
    paint(weather) {
      this.location.textContent = weather.name;
      this.desc.textContent = weather.weather[0].description;
       this.string.textContent = weather.main.temp;
      var iconcode=weather.weather[0].icon;
      var iconurl="http://openweathermap.org/img/wn/" + iconcode + ".png";
      this.icon.setAttribute('src', iconurl);
      this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}`;
       this.feelsLike.textContent = `Feels Like: ${weather.weather[0].main}`;
      
    }
  }