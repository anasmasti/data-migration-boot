const initProprietaire = require("./data/init/proprietaires.json");
const inputProprietaire = require("./data/input/proprietaires.json");

let proprietaire = {
  ...initProprietaire,
  ...inputProprietaire,
};
console.log(proprietaire);
