const affectationProprietaires = require("./aggregateAffectationProprietaires");
const fillMandataireList = require("./fillMandataireList");

let fillAffectationProprietairesPropList = affectationProprietaires.map(
  (affectationProprietaire) => {
    return {
      proprietaire_list: fillMandataireList(
        affectationProprietaires,
        affectationProprietaire.id
      ),
      ...affectationProprietaire,
    };
  }
);
module.exports = fillAffectationProprietairesPropList;
