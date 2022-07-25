const postFonciers = require("../../services/foncier/postFonciers");


module.exports = function saveFonciers(foncier) {
  return postFonciers(foncier);
};
