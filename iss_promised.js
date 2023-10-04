// iss_promised.js
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(ip => {
      const ipAddress = JSON.parse(ip).ip;
      return fetchCoordsByIP(ipAddress);
    })
    .then(body => {
      const { latitude, longitude } = JSON.parse(body).data;
      return fetchISSFlyOverTimes({ latitude, longitude });
    })
    .then(body => {
      const flyOverTimes = JSON.parse(body).response;
      return flyOverTimes;
    })
    .catch(error => {
      throw error; // Re-throw the error to be caught by the calling code
    });
};
