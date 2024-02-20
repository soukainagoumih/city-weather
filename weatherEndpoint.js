const http = require("http");
const url = require("url");
const cities = [
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
  { name: "Sydney", lat: -33.8651, lng: 151.2099 },
  { name: "Rome", lat: 41.9028, lng: 12.4964 },
  { name: "Cairo", lat: 30.0444, lng: 31.2357 },
  { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Rabat", lat: 34.0209, lng: -6.8416 },
];
async function temperature(city) {
  try {
    console.log(city);
    const cityCord = cities.find(
      (cityName) => cityName.name.toLowerCase() == city.toLowerCase()
    );

    console.log(cityCord);
    const { lat, lng } = cityCord;
    // console.log(lat + " " + lng);
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
    );

    // console.log(response)
    const data = await response.json();
    //   console.log(data)
      return data["current_weather"].temperature;
    
  } catch (err) {
    console.error(err.message);
  }
  // return data["current_weather"].temperature;
}
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (path === "/weather") {
    // Handle the '/users' endpoint
    const city = query.city;
      // console.log(city);
      if (city && city != undefined) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        //   res.end(`Weather information for ${city}`);
          temperature(city).then((result) => { res.end(`Weather information for ${city}: ${result}`);})
      } else {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end(`you need to insert the city name like this'http://localhost:3000/weather?city=NewYork'`);
    }
    
  } else {
    // Handle unknown endpoints
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
