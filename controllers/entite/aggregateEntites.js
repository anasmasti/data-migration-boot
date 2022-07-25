const initEntite = require("../../data/init/entite.json");
const inputEntite = require("../../data/input/entites.json");
const aggregateData = require("../../utils/aggregateData");

let entites = aggregateData(inputEntite, initEntite);

module.exports = entites;
