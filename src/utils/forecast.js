const request = require('postman-request');

// Get Weather data using weatherstack API
const forecast = (latitude, longitude , callback) => {

    const weatherstackAPIUrl = `https://api.weatherstack.com/current?access_key=a7a59661b6db0707ccc4a81ffaf137a7&query=${latitude},${longitude}`;
    request({url:weatherstackAPIUrl, json: true}, (error, { body }) => {
        if (error)callback('Unable to connect to weather stack services.', undefined);
        else if (body.error)callback('Unable to to find your location.', undefined);
        else {
            const temperature  = body.current.temperature;
            const precipitation  = body.current.precip;
            const weatherDescriptions  = body.current.weather_descriptions;
            callback(undefined, `${weatherDescriptions}, It is currently ${temperature} degrees celsius out. There is a ${precipitation}% chance of rain.`);
        }

    })
}

module.exports = forecast;
