import {
  species as speciesUtils,
  misc as miscUtils,
  WhereBuilder,
  likep, regexp, neq, eq, lt, gt, lte, gte, like,
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
      return regexp(key, value, { encodeUri: false });
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
  if (filterVal && filterVal.and) {
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
    return conjug(...valsOr);
  }
  return resolveByComparator(filter.comparator, key, filter.filterVal);
};

function losToTypeaheadSelected(data) {
  if (!data) {
    return [];
  }
  return [{
    id: data.id,
    label: speciesUtils.listOfSpeciesString(data),
  }];
}

function makeWhere(filters) {
  const whereItems = [];
  const keys = Object.keys(filters).filter((k) => !!filters[k]);
  // keys of filters are joined with 'and'
  for (const key of keys) {
    // array of filterVal are joined by 'or'
    const item = filterToWhereItem(filters[key], key);
    if (!miscUtils.isEmpty(item)) {
      whereItems.push(item);
    }
  }
  const andItems = and(...whereItems);

  const wb = new WhereBuilder();
  return wb.add(andItems).build();
}

function makeOrder(sortFields = 'id', sortOrder = 'ASC') {
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

// ------ data grid ------ //
const dataGridResolveOperator = (operator, key, value) => {
  switch (operator) {
    case 'contains':
      return likep(key, value);
    case 'startsWith':
      return like(key, `${value}%`);
    case 'endsWith':
      return like(key, `%${value}`);
    case 'equals':
    default:
      return eq(key, value);
  }
};

const dataGridResolveConjunction = (operator) => {
  switch (operator) {
    case 'or':
      return or;
    case 'and':
    default:
      return and;
  }
};

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

function dataGridFilterModelToWhere(filterModel) {
  const { items, linkOperator } = filterModel;
  const wb = new WhereBuilder();

  const whereItems = items
    .filter(({ value }) => !!value)
    .map(({ columnField, operatorValue, value }) => (
      dataGridResolveOperator(operatorValue, columnField, value)
    ));

  const conj = dataGridResolveConjunction(linkOperator);
  return wb.add(conj(...whereItems)).buildString();
}

export default {
  losToTypeaheadSelected,
  makeWhere,
  makeOrder,
  buildFilterOptionsFromKeys,
  dataGridSortModelMapper,
  dataGridFilterModelToWhere,
  // curateSearchFilters,
  // curateSortFields,
};
