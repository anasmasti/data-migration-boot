const postProprietaires = require("../../services/proprietaire/postProprietaires");
const proprietaires = require("./aggregateProprietaires");

module.exports = function saveProprietaires() {
  return postProprietaires(proprietaires);
};
