const postData = require("../../utils/postData");

module.exports = function postEntites(entites) {
  return postData("lieu/ajouter", entites);
};
