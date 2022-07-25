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


// saveProprietaires();
// postFonciers()
// saveEntites()
// saveFonciers()

entites.forEach(async (entite) => {
  //   saveEntites()
  await axios
    .post(`http://192.168.1.4:8000/api/v1/lieu/ajouter/CDGSP`, entite)
    .then(async (res) => {
     await fonciers.forEach(async (foncier) => {
        if (entite.id == foncier.lieu) {
          let selectedFoncier = await getFoncierByEntiteId(fonciers,entite.id);
          
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
            ...initFoncier
          };
         
            let formData = new FormData();
            formData.append("data", JSON.stringify(foncierToSend));
         
      
         await axios.post(
            `http://192.168.1.4:8000/api/v1/foncier/ajouter/CDGSP`,
            formData 
          );
        }
      });
    });
});
