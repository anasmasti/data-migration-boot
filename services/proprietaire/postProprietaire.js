const postData = require("../../utils/postData");

module.exports = async function postProprietaire(url, proprietaire, matricule) {
 return await postData(`${url}proprietaire/ajouter/${matricule}`, proprietaire);
};
