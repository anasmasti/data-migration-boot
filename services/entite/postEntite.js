const postData = require("../../utils/postData");

module.exports = async function postEntite(url, entite, matricule) {
 return await postData(`${url}lieu/ajouter/${matricule}`, entite);
};
