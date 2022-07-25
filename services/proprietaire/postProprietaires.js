const postData = require("../../utils/postData");

module.exports = function postProprietaires(proprietaires) {
  return postData("proprietaire/ajouter", proprietaires);
};
