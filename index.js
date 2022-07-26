const entites = require("./controllers/entite/aggregateEntites");
const saveEntites = require("./controllers/entite/saveEntites");
const fonciers = require("./controllers/foncier/aggregateFonciers");
const getFoncierByEntiteId = require("./controllers/foncier/getFoncierByEntiteId");
const saveFonciers = require("./controllers/foncier/saveFonciers");
const saveProprietaires = require("./controllers/proprietaire/saveProprietaires");
const postFonciers = require("./services/foncier/postFonciers");
const axios = require("axios").default;
const FormData = require("form-data");
const initFoncier = require("./data/init/foncier.json");
const contrats = require("./controllers/contrat/aggregateContrats");
const fillAffectationProprietairesPropList = require("./controllers/affectation-proprietaire/fillAffectationProprietairesPropList");
const fillMandataireList = require("./controllers/affectation-proprietaire/fillMandataireList");
const proprietaires = require("./controllers/proprietaire/aggregateProprietaires");
const affectationProprietaires = require("./controllers/affectation-proprietaire/aggregateAffectationProprietaires");
var ObjectID = require("bson").ObjectID;
const initAffectationProprietaires = require("./data/init/affectationproprietaire.json");
const getAffectationObjectIdById = require("./controllers/affectation-proprietaire/getAffectationObjectIdById");

// saveProprietaires();
// postFonciers()
// saveEntites()
// saveFonciers()

entites.forEach(async (entite) => {
  await axios
    .post(`http://192.168.1.4:8000/api/v1/lieu/ajouter/CDGSP`, entite)
    .then(async (res) => {
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

          await axios
            .post(
              `http://192.168.1.4:8000/api/v1/foncier/ajouter/CDGSP`,
              foncierFormData
            )
            .then(async (foncierId) => {
              contrats.forEach(async (contrat) => {
                let contratFormData = new FormData();
                contratFormData.append("data", JSON.stringify(contrat));

                if (contrat.id == foncier.contrat) {
                  await axios
                    .post(
                      `http://192.168.1.4:8000/api/v1/contrat/ajouter/${foncierId.data}/CDGSP`,
                      contratFormData
                    )
                    .then(async (contratItem) => {
                      await ["CDGSP", "DAJC"].forEach(async (role, index) => {
                        await axios.put(
                          `http://192.168.1.4:8000/api/v1/contrat/validation${
                            index + 1
                          }/${contratItem.data._id}/${role}`
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
                              if (
                                affectationProprietaire.proprietaire == prop.id
                              ) {
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
                                  taux_impot:
                                    affectationProprietaire.taux_impot,
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
                                affectationToSendList.push(
                                  affectationToSendItem
                                );
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
                            is_mandataire:
                              affectationToSendListItem.is_mandataire,
                            proprietaire:
                              affectationToSendListItem.proprietaire,
                            taux_impot: affectationToSendListItem.taux_impot,
                            retenue_source:
                              affectationToSendListItem.retenue_source,
                            montant_apres_impot:
                              affectationToSendListItem.montant_apres_impot,
                            montant_loyer:
                              affectationToSendListItem.montant_loyer,
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
                          await axios.post(
                            `http://192.168.1.4:8000/api/v1/affectation-proprietaire/ajouter/${contratItem.data._id}/CDGSP`,
                            affectationToSend
                          );
                        }
                      );
                    });
                }
              });
            });
        }
      });
    });
});
