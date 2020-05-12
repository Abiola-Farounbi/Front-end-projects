class Weather {
    constructor(city, state) {
      this.apiKey = 'b1ab94cd8ae5304b920b2d9076084b52';
      this.city = city;
      this.state = state;
    }
  
    // Fetch weather from API
    async getWeather() {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&${this.state}&appid=${this.apiKey}&units=metric`);
  
      const responseData = await response.json();
  
      return responseData;
      
    }
  
    // Change weather location
    changeLocation(city, state) {
      this.city = city;
      this.state = state;
    }
  }