const postEntites = require("../../services/entite/postEntites");
const entites = require("./aggregateEntites");

module.exports = function saveEntites() {
  return postEntites(entites);
};
