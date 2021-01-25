import {
  species as speciesUtils,
  WhereBuilder,
  likep, regexp, neq, eq, lt, gt, lte, gte,
  or, and,
} from '@ibot/utils';

/**
 * For resolving filter comparator. Supports LIKE and EQ.
 * Loopback mysql connector does not support case insensitive.
 * @param {*} comparator
 * @param {*} key
 * @param {*} value
 */
const resolveByComparator = (comparator, key, value) => {
  switch (comparator) {
    case '':
      return {};
    case 'LIKE':
      return likep(key, value);
    case 'REGEXP':
      return regexp(key, value);
    case 'NEQ':
    case '!=':
      return neq(key, value);
    case '<':
      return lt(key, value);
    case '<=':
      return lte(key, value);
    case '>':
      return gt(key, value);
    case '>=':
      return gte(key, value);
    case 'EQ':
    case '=':
    default:
      return eq(key, value);
  }
};

const filterToWhereItem = (filter, key) => {
  let conjug = or;
  let { filterVal } = filter;
  if (filterVal.and) {
    conjug = and;
    filterVal = filterVal.and;
  }

  if (Array.isArray(filterVal) && filterVal.length > 1) {
    const valsOr = [];
    for (const val of filterVal) {
      let itemKey = key; let
        value = val;
      if (val && typeof val !== 'string') {
        itemKey = val.field;
        value = val.value;
      }
      valsOr.push(resolveByComparator(filter.comparator, itemKey, value));
    }
    return conjug(valsOr);
  }
  return resolveByComparator(filter.comparator, key, filter.filterVal);
};

function losToTypeaheadSelected(data) {
  if (!data) {
    return undefined;
  }
  return [{
    id: data.id,
    label: speciesUtils.listOfSpeciesString(data),
  }];
}

function genusString(genus) {
  if (!genus) {
    return undefined;
  }
  const { name, authors } = genus;
  return [name, authors].filter((e) => e).map((e) => e.trim()).join(' ');
}

function makeWhere(filters) {
  const whereItems = [];
  const keys = Object.keys(filters).filter((k) => !!filters[k]);
  // keys of filters are joined with 'and'
  for (const key of keys) {
    // array of filterVal are joined by 'or'
    whereItems.push(filterToWhereItem(filters[key], key));
  }
  const andItems = and(...whereItems);

  const wb = new WhereBuilder();
  return wb.add(andItems).build();
}

function makeOrder(sortFields, sortOrder = 'ASC') {
  let soUpperCase = sortOrder.toUpperCase();
  if (soUpperCase !== 'ASC' && soUpperCase !== 'DESC') {
    soUpperCase = 'ASC';
  }
  if (Array.isArray(sortFields)) {
    return sortFields.map((f) => `${f} ${soUpperCase}`);
  }
  return [`${sortFields} ${soUpperCase}`];
}

function buildFilterOptionsFromKeys(keys) {
  const obj = {};
  Object.keys(keys).forEach((t) => {
    const { text, label } = keys[t];
    obj[t] = text || label;
    // obj[t] = t;
  });
  return obj;
}

/**
 * If filter key is in config.nomenclature.filter then modify that filter such as new
 * filterVal = [{ field, value }] where field is for every value from the config nad value is original filterVal.
 * @param {*} filters
 */
// const curateSearchFilters = filters => {
//     let curatedFilters = { ...filters };
//     const keys = Object.keys(filters);
//     for (const key of keys) { //listofspecies
//         const fields = config.nomenclature.filter[key]; // genus, species, ...
//         if (fields) {
//             const filterContent = curatedFilters[key]; // filterType, filterVal, caseSensitive, comparator
//             const filterVal = filterContent.filterVal;
//             if (typeof filterVal === "string") { // avoid redoing mapping on values that are already in { field, value }
//                 const newFilterValue = fields.map(f => ({ field: f, value: filterVal }));
//                 filterContent.filterVal = newFilterValue;
//                 curatedFilters[key] = filterContent;
//             }
//         }
//     }
//     return curatedFilters;
// }

// const curateSortFields = sortField => {
//     const fields = config.nomenclature.filter[sortField];
//     if (fields) {
//         return fields;
//     }
//     return sortField;
// }

export default {
  losToTypeaheadSelected,
  genusString,
  makeWhere,
  makeOrder,
  buildFilterOptionsFromKeys,
  // curateSearchFilters,
  // curateSortFields,
};
