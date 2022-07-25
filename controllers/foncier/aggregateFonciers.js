const initFoncier = require("../../data/init/foncier.json");
const inputFoncier = require("../../data/input/fonciers.json");
const aggregateData = require("../../utils/aggregateData");

let fonciers = aggregateData(inputFoncier, initFoncier)

module.exports = fonciers;
