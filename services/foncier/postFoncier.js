const postData = require("../../utils/postData");

module.exports = async function postFoncier(url, foncier, matricule) {
 return await postData(`${url}foncier/ajouter/${matricule}`, foncier);
};
