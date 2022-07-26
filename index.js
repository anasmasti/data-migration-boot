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
const getPropObjectIdById = require("./controllers/proprietaire/getPropObjectIdById");
var ObjectID = require("bson").ObjectID;
const initAffectationProprietaires = require("./data/init/affectationproprietaire.json");

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
                      await fillAffectationProprietairesPropList.forEach(
                        async (
                          affectationProprietaire,
                          affectationProprietaireIndex
                        ) => {
                          if (contrat.id == affectationProprietaire.contrat) {
                            var affectationProprietaireObjectId =
                              new ObjectID();

                            proprietaires.forEach(async (prop) => {
                              if (
                                affectationProprietaire.proprietaire == prop.id
                              ) {
                                let affectationToSend = {
                                  _id: affectationProprietaireObjectId,
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
                                  has_mandataire:
                                    affectationProprietaire.has_mandataire,
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
                                    affectationProprietaire.proprietaire_list.map(
                                      (propIdItem) => {
                                        return getPropObjectIdById(
                                          propIdItem
                                        ) != undefined
                                          ? getPropObjectIdById(propIdItem)
                                          : null;
                                      }
                                    ),
                                  ...initAffectationProprietaires,
                                };
                                await axios.post(
                                  `http://192.168.1.4:8000/api/v1/affectation-proprietaire/ajouter/${contratItem.data._id}/CDGSP`,
                                  affectationToSend
                                );
                              }
                            });
                          }
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
