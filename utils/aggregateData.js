module.exports = function aggregateData(inputData, initData) {
  return inputData.map((inputDataItem) => {
    return { ...inputDataItem, ...initData };
  });
};
