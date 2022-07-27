const axios = require("axios").default;

module.exports = async function postData(url, data) {
  return await axios.post(url, data);
};
