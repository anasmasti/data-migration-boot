const initProprietaire = require("../../data/init/proprietaire.json");
const inputProprietaire = require("../../data/input/proprietaires.json");
var ObjectID = require("bson").ObjectID;

var proprietaireObjectId = new ObjectID();

let proprietaires = inputProprietaire.map((proprietaire) => {
  return {
    _id: proprietaireObjectId,
    id: proprietaire.id,
    cin: proprietaire.cin,
    passport: proprietaire.passport,
    raison_social: proprietaire.raison_social,
    n_registre_commerce: proprietaire.n_registre_commerce,
    telephone: proprietaire.telephone,
    fax: proprietaire.fax,
    carte_sejour: proprietaire.carte_sejour,
    nom_prenom: proprietaire.nom_prenom,
    adresse: proprietaire.adresse,
    n_compte_bancaire: proprietaire.n_compte_bancaire,
    banque: proprietaire.banque,
    type_proprietaire: proprietaire.type_proprietaire,
    nom_agence_bancaire: proprietaire.nom_agence_bancaire,
    ...initProprietaire,
  };
});

module.exports = proprietaires;
