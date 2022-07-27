const axios = require("axios").default;

module.exports = async function validateContrat(
  url,
  index,
  contratId,
  matricule
) {
  return await axios.put(
    `${url}contrat/validation${index + 1}/${contratId}/${matricule}`
  );
};
