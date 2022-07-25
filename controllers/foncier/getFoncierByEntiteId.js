module.exports = function getFoncierByEntiteId(fonciersList = [], idEntite) {
  return fonciersList.find((foncier) => {
    return foncier.id == idEntite;
  });
};
