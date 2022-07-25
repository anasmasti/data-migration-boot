const postData = require("../../utils/postData");

module.exports = function postFonciers(fonciers) {
  return postData("foncier/ajouter", fonciers, true);
};
