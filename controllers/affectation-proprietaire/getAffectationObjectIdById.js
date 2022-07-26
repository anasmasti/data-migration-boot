const getItemById = require("../../utils/getItemById");

module.exports = function getAffectationObjectIdById(affectationProprietaires, id) {
  return getItemById(affectationProprietaires, id);
};
