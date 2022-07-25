const initProprietaire = require("../../data/init/proprietaire.json");
const inputProprietaire = require("../../data/input/proprietaires.json");
const aggregateData = require("../../utils/aggregateData");

let proprietaires = aggregateData(inputProprietaire, initProprietaire) 

module.exports = proprietaires;
