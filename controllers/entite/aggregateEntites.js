const initEntite = require("../../data/init/entite.json");
const inputEntite = require("../../data/input/entites.json");
const ObjectID = require("bson").ObjectID;

let entites = inputEntite.map((entite) => {
  var entiteObjectId = new ObjectID();
  return {
    _id: entiteObjectId,
    id: entite.id,
    attached_DR: entite.attached_DR,
    attached_SUP: entite.attached_SUP,
    code_lieu: entite.code_lieu,
    intitule_lieu: entite.intitule_lieu,
    code_localite: entite.code_localite,
    telephone: entite.telephone,
    fax: entite.fax,
    type_lieu: entite.type_lieu,
    centre_cout_siege: entite.centre_cout_siege,
    categorie_pointVente: entite.categorie_pointVente,
    ...initEntite,
  };
});

module.exports = entites;
