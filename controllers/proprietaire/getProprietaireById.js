module.exports = function getProprietaireById(proprietairesList = [], id) {
  proprietairesList.find((proprietaire) => {
    return proprietaire.id == id;
  });
};
