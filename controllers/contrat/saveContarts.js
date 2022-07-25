const postContrats = require("../../services/contrat/postContrats");
const contrats = require("./aggregateContrats");

module.exports = function saveContrats() {

  return postContrats(contrats);
};
