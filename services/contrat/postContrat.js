const postData = require("../../utils/postData");

module.exports = async function postContrat(
  url,
  foncierId,
  contrat,
  matricule
) {
  return await postData(
    `${url}contrat/ajouter/${foncierId + "/" + matricule}`,
    contrat
  );
};
