const entites = require("./controllers/entite/aggregateEntites");
const fonciers = require("./controllers/foncier/aggregateFonciers");
const getFoncierByEntiteId = require("./controllers/foncier/getFoncierByEntiteId");
const FormData = require("form-data");
const initFoncier = require("./data/init/foncier.json");
const contrats = require("./controllers/contrat/aggregateContrats");
const fillAffectationProprietairesPropList = require("./controllers/affectation-proprietaire/fillAffectationProprietairesPropList");
const proprietaires = require("./controllers/proprietaire/aggregateProprietaires");
var ObjectID = require("bson").ObjectID;
const initAffectationProprietaires = require("./data/init/affectationproprietaire.json");
const getAffectationObjectIdById = require("./controllers/affectation-proprietaire/getAffectationObjectIdById");
const dotenv = require("dotenv");
const postEntite = require("./services/entite/postEntite");
const postFoncier = require("./services/foncier/postFoncier");
const postContrat = require("./services/contrat/postContrat");
const validateContrat = require("./services/contrat/validateContrat");
const postAffectationProprietaire = require("./services/affectation/postAffectationProprietaire");

dotenv.config();
const apiUrl = process.env.API_URL;

entites.forEach(async (entite) => {
  await postEntite(apiUrl, entite, "CDGSP").then(async (res) => {
    await fonciers.forEach(async (foncier) => {
      if (entite.id == foncier.lieu) {
        let selectedFoncier = await getFoncierByEntiteId(fonciers, entite.id);

        let foncierToSend = {
          adresse: selectedFoncier.adresse,
          ville: selectedFoncier.ville,
          latitude: selectedFoncier.latitude,
          longitude: selectedFoncier.longitude,
          desc_lieu_entrer: selectedFoncier.desc_lieu_entrer,
          superficie: selectedFoncier.superficie,
          etage: selectedFoncier.etage,
          lieu: res.data._id,
          type_lieu: selectedFoncier.type_lieu,
          ...initFoncier,
        };

        let foncierFormData = new FormData();
        foncierFormData.append("data", JSON.stringify(foncierToSend));
        await postFoncier(apiUrl, foncierFormData, "CDGSP").then(
          async (foncierId) => {
            contrats.forEach(async (contrat) => {
              let contratFormData = new FormData();
              contratFormData.append("data", JSON.stringify(contrat));
              if (contrat.id == foncier.contrat) {
                await postContrat(
                  apiUrl,
                  foncierId.data,
                  contratFormData,
                  "CDGSP"
                ).then(async (contratItem) => {
                  await ["CDGSP", "DAJC"].forEach(async (matricule, index) => {
                    await validateContrat(
                      apiUrl,
                      index,
                      contratItem.data._id,
                      matricule
                    );
                  });
                  let affectationToSendList = [];
                  await fillAffectationProprietairesPropList.forEach(
                    async (
                      affectationProprietaire,
                      affectationProprietaireIndex
                    ) => {
                      if (contrat.id == affectationProprietaire.contrat) {
                        proprietaires.forEach(async (prop) => {
                          if (affectationProprietaire.proprietaire == prop.id) {
                            var affectationProprietaireObjectId =
                              new ObjectID();
                            let affectationToSendItem = {
                              _id: affectationProprietaireObjectId,
                              id: affectationProprietaire.id,
                              montant_avance_proprietaire:
                                affectationProprietaire.montant_avance_proprietaire,
                              tax_avance_proprietaire:
                                affectationProprietaire.tax_avance_proprietaire,
                              tax_par_periodicite:
                                affectationProprietaire.tax_par_periodicite,
                              caution_par_proprietaire:
                                affectationProprietaire.caution_par_proprietaire,
                              is_mandataire:
                                affectationProprietaire.is_mandataire,
                              proprietaire: prop._id,
                              taux_impot: affectationProprietaire.taux_impot,
                              retenue_source:
                                affectationProprietaire.retenue_source,
                              montant_apres_impot:
                                affectationProprietaire.montant_apres_impot,
                              montant_loyer:
                                affectationProprietaire.montant_loyer,
                              part_proprietaire:
                                affectationProprietaire.part_proprietaire,
                              declaration_option:
                                affectationProprietaire.declaration_option,
                              proprietaire_list:
                                affectationProprietaire.proprietaire_list,
                              ...initAffectationProprietaires,
                            };
                            affectationToSendList.push(affectationToSendItem);
                          }
                        });
                      }
                    }
                  );

                  affectationToSendList.forEach(
                    async (affectationToSendListItem) => {
                      let affectationToSend = {
                        _id: affectationToSendListItem._id,
                        montant_avance_proprietaire:
                          affectationToSendListItem.montant_avance_proprietaire,
                        tax_avance_proprietaire:
                          affectationToSendListItem.tax_avance_proprietaire,
                        tax_par_periodicite:
                          affectationToSendListItem.tax_par_periodicite,
                        caution_par_proprietaire:
                          affectationToSendListItem.caution_par_proprietaire,
                        is_mandataire: affectationToSendListItem.is_mandataire,
                        proprietaire: affectationToSendListItem.proprietaire,
                        taux_impot: affectationToSendListItem.taux_impot,
                        retenue_source:
                          affectationToSendListItem.retenue_source,
                        montant_apres_impot:
                          affectationToSendListItem.montant_apres_impot,
                        montant_loyer: affectationToSendListItem.montant_loyer,
                        part_proprietaire:
                          affectationToSendListItem.part_proprietaire,
                        declaration_option:
                          affectationToSendListItem.declaration_option,
                        proprietaire_list:
                          affectationToSendListItem.proprietaire_list.map(
                            (propIdItem) => {
                              return getAffectationObjectIdById(
                                affectationToSendList,
                                propIdItem
                              ) != undefined
                                ? getAffectationObjectIdById(
                                    affectationToSendList,
                                    propIdItem
                                  )
                                : null;
                            }
                          ),
                      };
                      await postAffectationProprietaire(
                        apiUrl,
                        contratItem.data._id,
                        affectationToSend,
                        "CDGSP"
                      );
                    }
                  );
                });
              }
            });
          }
        );
      }
    });
  });
});
