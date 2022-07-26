const proprietaires = require("./aggregateProprietaires");
const getProprietaireById = require("./getProprietaireById");

module.exports = function getPropObjectIdById(id) {
  return getProprietaireById(proprietaires, id);
};
