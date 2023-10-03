const request = require('request');

const fetchMyIP = (callback) => {
  const url = 'https://api64.ipify.org?format=json';

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(new Error(msg), null);
      return;
    }

    try {
      const data = JSON.parse(body);
      const ip = data.ip;
      callback(null, ip);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  // Use the ipvigilante service to fetch coordinates based on the IP address
  const url = `https://ipvigilante.com/${ip}`;

  request(url, (error, response, body) => {
    if (error) {
      // If there's an error during the request, pass it to the callback
      callback(error, null);
      return;
    }

    try {
      // Parse the JSON response
      const data = JSON.parse(body);
      if (data.status !== 'success') {
        // If the API returns an error message, pass it to the callback
        const errorMsg = `API Error: ${data.message}`;
        callback(new Error(errorMsg), null);
      } else {
        // Extract latitude and longitude from the data
        const latitude = data.data.latitude;
        const longitude = data.data.longitude;

        // Create an object with latitude and longitude and pass it to the callback
        const coordinates = { latitude, longitude };
        callback(null, coordinates);
      }
    } catch (parseError) {
      // If there's an error parsing the JSON response, pass it to the callback
      callback(parseError, null);
    }
  });
};


const fetchISSFlyOverTimes = function (coords, callback) {
  // Construct the URL with the provided coordinates
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    try {
      const passes = JSON.parse(body).response;
      callback(null, passes);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, flyOverTimes);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};