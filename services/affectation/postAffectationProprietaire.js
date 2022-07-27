const postData = require("../../utils/postData");

module.exports = async function postAffectationProprietaire(
  url,
  contratId,
  affectationProprietaire,
  matricule
) {
  return await postData(
    `${url}affectation-proprietaire/ajouter/${contratId + "/" + matricule}`,
    affectationProprietaire
  );
};
