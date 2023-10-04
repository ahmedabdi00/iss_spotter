// index2.js
const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(flyOverTimes => {
    console.log('Next ISS Flyover Times:');
    for (const time of flyOverTimes) {
      const datetime = new Date(1000 * time.risetime);
      console.log(`- ${datetime} (Duration: ${time.duration} seconds)`);
    }
  })
  .catch(error => {
    console.error('It didn\'t work!', error);
  });
