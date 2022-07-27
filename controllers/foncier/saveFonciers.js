const postFonciers = require("../../services/foncier/postFoncier");

module.exports = function saveFonciers(foncier) {
  return postFonciers(foncier);
};
