module.exports = function fillMandataireList(
  affectationProprietaireList,
  affectationId
) {
  let mandataireList = [];
  for (let index = 0; index < affectationProprietaireList.length; index++) {
    if (
      affectationProprietaireList.length - 1 >= index + 1 &&
      affectationId == affectationProprietaireList[index + 1].has_mandataire
    ) {
      mandataireList.push(affectationProprietaireList[index + 1].id);
    }
  }
  return mandataireList;
};
