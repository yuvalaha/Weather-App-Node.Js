const request = require('postman-request');

// Get Lat, Long and Location according to address
const geocode =  (address, callback) => {
    const maptilerAPIUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json?key=dsQoUbY44ryJ1GOX20JH&language=en`;
    request({url: maptilerAPIUrl, json: true}, (error, {body} ) => {

        // Connection error
        if(error)callback('Unable to connect to maptiler services.', undefined);
        
        // Bad Location error
        else if (body.features.length === 0)callback('Unable to find your location.', undefined);
        
        else{

            callback(undefined, 
                {
                    latitude: body.features[0].center[1],
                    longitude:  body.features[0].center[0],
                    location: body.features[0].place_name,
                }
            );
        };
    });
};

module.exports = geocode;