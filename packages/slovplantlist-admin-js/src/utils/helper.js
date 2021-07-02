function buildFilterOptionsFromKeys(keys) {
  return Object.keys(keys).map((k) => ({
    value: k,
    label: keys[k].label || keys[k].text,
  }));
}

/**
 *
 * @param {array} defaultOrder
 * @param {function} handler handler works on the given sortModel and must return another sortModel
 * @returns
 */
function dataGridSortModelMapper(
  defaultOrder = [{ field: 'id', sort: 'asc' }],
  handler = undefined,
) {
  return (sortModel) => {
    let o = defaultOrder;
    if (sortModel && sortModel.length > 0) {
      o = sortModel;
    }
    if (handler) {
      o = handler(sortModel);
    }
    return JSON.stringify(o.map(({ field, sort }) => `${field} ${sort}`));
  };
}

function dataGridSortModelHandler(name, newFields) {
  return (sortModel) => {
    if (Array.isArray(sortModel)) {
      const sortModelC = [...sortModel];
      const foundIndex = sortModelC.findIndex(({ field }) => field === name);
      if (foundIndex > -1) {
        const { sort } = sortModelC[foundIndex];
        if (!newFields) {
          sortModelC.splice(foundIndex, 1);
          return sortModelC;
        }
        if (Array.isArray(newFields)) {
          const newModels = newFields.map((f) => ({
            field: f,
            sort,
          }));
          sortModelC.splice(foundIndex, 1, ...newModels);
          return sortModelC;
        }
        sortModelC.splice(foundIndex, 1, { field: newFields, sort });
        return sortModelC;
      }
    }
    return sortModel;
  };
}

export default {
  buildFilterOptionsFromKeys,
  dataGridSortModelMapper,
  dataGridSortModelHandler,
};
