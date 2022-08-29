const entites = require("./aggregateEntites");

const findEntiteObjectIDByCodeLieu = (codeLieu) => {
  return entites.find((entite) => codeLieu === entite.code_lieu);
};

module.exports = findEntiteObjectIDByCodeLieu;
