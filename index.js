const initProprietaire = require("./data/init/proprietaire.json");
const inputProprietaire = require("./data/input/proprietaire.json");

let proprietaire = {
  ...initProprietaire,
  ...inputProprietaire,
};
console.log(proprietaire);
