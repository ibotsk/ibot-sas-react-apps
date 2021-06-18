function buildFilterOptionsFromKeys(keys) {
  return Object.keys(keys).map((k) => ({
    value: k,
    label: keys[k].label || keys[k].text,
  }));
}

function dataGridSortModelMapper(
  defaultOrder = [{ field: 'id', sort: 'asc' }],
) {
  return (sortModel) => {
    let o = defaultOrder;
    if (sortModel && sortModel.length > 0) {
      o = sortModel;
    }
    return JSON.stringify(o.map(({ field, sort }) => `${field} ${sort}`));
  };
}

export default {
  buildFilterOptionsFromKeys,
  dataGridSortModelMapper,
};
