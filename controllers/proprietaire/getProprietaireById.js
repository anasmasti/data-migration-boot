module.exports = function getProprietaireById(proprietairesList = [], id) {
 return proprietairesList.find((proprietaire) => {
    return proprietaire.id == id;
  });
};
