const moment = require("moment-timezone");

/**
 * Get the current or future time in Indian Standard Time (IST)
 * @param {number} [minutes=0] - Number of minutes to add to the current time (default is 0 for current time)
 * @returns {string} Time in IST formatted as 'YYYY-MM-DD HH:mm:ss'
 */
const getDynamicISTTime = (minutes = 0) => {
  return moment
    .tz("Asia/Kolkata")
    .add(minutes, "minutes")
    .format("YYYY-MM-DD HH:mm:ss");
};

module.exports = { getDynamicISTTime };
