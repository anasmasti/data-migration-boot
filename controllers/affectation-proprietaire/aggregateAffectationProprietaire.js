const initAffectationProprietaires = require("../../data/init/affectationproprietaire.json");
const inputAffectationProprietaires = require("../../data/input/affectationproprietaires.json");

let affectationProprietaires = inputAffectationProprietaires.map(
  (affectationProprietaire) => {
    return {
      id: affectationProprietaire.id,
      montant_avance_proprietaire:
        affectationProprietaire.montant_avance_proprietaire,
      tax_avance_proprietaire: affectationProprietaire.tax_avance_proprietaire,
      tax_par_periodicite: affectationProprietaire.tax_par_periodicite,
      caution_par_proprietaire:
        affectationProprietaire.caution_par_proprietaire,
      is_mandataire: affectationProprietaire.is_mandataire,
      has_mandataire: affectationProprietaire.has_mandataire,
      proprietaire: affectationProprietaire.proprietaire,
      contrat: affectationProprietaire.contrat,
      taux_impot: affectationProprietaire.taux_impot,
      retenue_source: affectationProprietaire.retenue_source,
      montant_apres_impot: affectationProprietaire.montant_apres_impot,
      montant_loyer: affectationProprietaire.montant_loyer,
      part_proprietaire: affectationProprietaire.part_proprietaire,
      declaration_option: affectationProprietaire.declaration_option,
      ...initAffectationProprietaires,
    };
  }
);

module.exports = affectationProprietaires;
