const axios = require("axios").default;
const FormData = require("form-data");

module.exports = function postData(url, data = [], isFormData = false) {
  data.forEach((object) => {
    if (isFormData) {
      var formData = new FormData();
      formData.append("data", JSON.stringify(object));
    }

    axios.post(
      `http://192.168.1.4:8000/api/v1/${url}/CDGSP`,
      isFormData ? formData : object
    );
  });
};
