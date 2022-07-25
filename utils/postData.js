const axios = require("axios").default;

module.exports = function postData(url, data = []) {
  data.forEach((object) => {
    axios
      .post(`http://192.168.1.4:8000/api/v1/${url}/CDGSP`, object)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};
