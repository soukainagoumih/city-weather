const fs = require('fs').promises;

  async function readCityWeatherFile(){
    const a = await fs.readFile("input.txt","utf-8")
    const data = JSON.parse(a);
    return data;
  }
  function selectRandomCity(cities) {
    const randomIndex = Math.floor(Math.random() * cities.length);
    let cityName = cities[randomIndex];
    return cityName;
  }

  

async function fetchData(){
    try{
    const read = await readCityWeatherFile()
    const city = selectRandomCity(read);
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`);
    const data = await response.json();
    console.log('City Name : ', city.name);
    console.log('Temperature : ', data.current_weather.temperature);
    let b = city.name + " :"+data.current_weather.temperature.toString()
    await fs.writeFile(`${city.name}.txt`,b )
}catch(error){
    console.log('Error',error.message);
}
}
fetchData()

