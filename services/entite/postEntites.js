const postData = require("../../utils/postData");

module.exports = async function postEntites(entites) {
    return await postData("lieu/ajouter", entites);
};
