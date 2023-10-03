const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// Fetch the user's IP address
fetchMyIP((error, ip) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // Print the fetched IP address
  console.log('Fetched IP:', ip);

  // Use the fetched IP address to fetch coordinates
  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      return console.log("It didn't work!", error);
    }
    // Print the fetched coordinates
    console.log('Fetched Coordinates:', data);

    // Use the fetched coordinates to fetch ISS flyover times
    fetchISSFlyOverTimes(data, (error, passTimes) => {
      if (error) {
        return console.log("It didn't work!", error);
      }

      // Loop through the passTimes array and format the output
      for (const pass of passTimes) {
        const datetime = new Date(1000 * pass.risetime);
        const duration = pass.duration;
        console.log(`Next pass at ${datetime} for ${duration} seconds!`);
      }
    });
  });
});
