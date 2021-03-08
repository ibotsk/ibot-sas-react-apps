import config from 'config/config';

function curateSortFields(sortField) {
  const fields = config.nomenclature.filter[sortField];
  if (fields) {
    return fields;
  }
  return sortField;
}

export default {
  curateSortFields,
};
