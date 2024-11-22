const moment = require("moment-timezone");

/**
 * Compare the current time with the provided expiration time.
 * @param {string | function} exTime - The expiration time as a string (in 'YYYY-MM-DD HH:mm:ss' format) or a function returning a time.
 * @returns {string} 'goTo' if current time is greater than exTime, else 'notGoTo'.
 */
const checkTime = (exTime) => {
  // Get the current time in IST
  const currentTime = moment.tz("Asia/Kolkata");

  // If exTime is a function, call it to get the expiration time
  let expirationTime;
  if (typeof exTime === 'function') {
    expirationTime = exTime();
  } else {
    // Otherwise, assume exTime is a string and parse it
    expirationTime = moment.tz(exTime, "Asia/Kolkata");
  }

  // Compare current time with expiration time
  if (currentTime.isAfter(expirationTime)) {
    return true;
  } else {
    return false;
  }
};

module.exports = { checkTime};