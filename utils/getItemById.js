module.exports = function getItemById(itemsList = [], id) {
  return itemsList.find((item) => {
    return item.id == id;
  });
};
