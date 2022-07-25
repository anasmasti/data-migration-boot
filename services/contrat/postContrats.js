const postData = require("../../utils/postData");

module.exports = function postContrats(contrats, foncierId) {
  return postData(`contrat/ajouter/${foncierId}`, contrats);
};