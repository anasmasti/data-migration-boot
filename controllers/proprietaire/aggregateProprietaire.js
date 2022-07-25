const initProprietaire = require("../../data/init/proprietaire.json");
const inputProprietaire = require("../../data/input/proprietaires.json");

let proprietaires = inputProprietaire.map((proprietaire) => {
  return { ...proprietaire, ...initProprietaire };
});

module.exports = proprietaires;
