const initContrat = require("../../data/init/contrat.json");
const inputContrat = require("../../data/input/contrats.json");
const aggregateData = require("../../utils/aggregateData");

let contrats = aggregateData(inputContrat, initContrat)

module.exports = contrats;
