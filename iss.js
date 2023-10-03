// iss.js
const request = require('request');

const fetchMyIP = (callback) => {
  // Use a service like 'https://api64.ipify.org?format=json' to fetch your IP address
  const url = 'https://api64.ipify.org?format=json';

  request(url, (error, response, body) => {
    if (error) {
      // If there's an error, pass it to the callback
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      // If the response status code is not 200, it's an error, so pass it to the callback
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(new Error(msg), null);
      return;
    }

    try {
      // Parse the JSON response to extract the IP address
      const data = JSON.parse(body);
      const ip = data.ip;

      // Pass the IP address to the callback without an error
      callback(null, ip);
    } catch (parseError) {
      // If there's an error parsing the JSON response, pass it to the callback
      callback(parseError, null);
    }
  });
};

module.exports = { fetchMyIP };
