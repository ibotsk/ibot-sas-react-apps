import config from 'config/config';
import { FILTER_TYPES } from 'react-bootstrap-table2-filter';

const { constants } = config;

const makeOwnershipRegexp = (value) => (
  `${constants.ownershipRegexp.start}${value}${constants.ownershipRegexp.end}`
);

const handleListOfSpeciesFilter = (filters) => {
  const listOfSpeciesKey = config.constants.listOfSpeciesColumn;
  const fields = config.nomenclature.filter[listOfSpeciesKey];
  const curatedFilters = {};

  const filterContent = filters[listOfSpeciesKey]; // filterType, filterVal, caseSensitive, comparator
  if (fields && filterContent) {
    const { filterVal } = filterContent;
    if (typeof filterVal === 'string') { // avoid redoing mapping on values that are already in { field, value }
      const newFilterValue = fields.map((f) => (
        { field: f, value: filterVal }
      ));
      filterContent.filterVal = newFilterValue;
      curatedFilters[listOfSpeciesKey] = filterContent;
    }
  }
  return curatedFilters;
};

const handleOwnershipFilter = (filters, ownerId) => {
  const ownershipKey = config.constants.ownership;
  const ownershipMapping = config.mappings.ownership;
  const filterContent = filters[ownershipKey];
  const regexp = makeOwnershipRegexp(ownerId);

  const curatedFilter = {};
  if (filterContent) {
    const { filterVal } = filterContent;
    let newValue = ''; let
      comparator = '';
    switch (filterVal) {
      case ownershipMapping.mine.key:
        comparator = 'REGEXP';
        newValue = regexp;
        break;
      case ownershipMapping.others.key:
        comparator = 'NEQ';
        newValue = { and: [null, '', `${ownerId}`] };
        break;
      case ownershipMapping.unassigned.key:
        comparator = '=';
        newValue = [null, ''];
        break;
      case ownershipMapping.notmine.key:
        comparator = 'NEQ';
        newValue = `${ownerId}`;
        break;
      default:
        break;
    }
    curatedFilter[ownershipKey] = {
      ...filterContent,
      filterVal: newValue,
      comparator,
    };
  }
  return curatedFilter;
};

const handleDateFilter = (filters) => {
  const dateFilters = {};

  const dateFilterKeys = Object.keys(filters).filter((k) => (
    filters[k].filterType === FILTER_TYPES.DATE
  ));
  dateFilterKeys.forEach((k) => {
    const { filterVal: { comparator, date } } = filters[k];
    let filt;
    if (comparator && date) {
      filt = {
        ...filters[k],
        comparator,
        filterVal: new Date(date).toISOString(),
      };
    }

    dateFilters[k] = filt;
  });
  return dateFilters;
};

// ---- PUBLIC ---- //

/**
 * If filter key is in config.nomenclature.filter then modify that filter such as new
 * filterVal = [{ field, value }] where field is for every value from the config nad value is original filterVal.
 * @param {*} filters
 */
function handleSpecialSearchFilters(filters, { ownerId } = {}) {
  // const keys = Object.keys(curatedFilters);
  // for (const key of keys) { //listofspecies
  //     const fields = config.nomenclature.filter[key]; // genus, species, ...
  //     if (fields) {
  //         const filterContent = curatedFilters[key]; // filterType, filterVal, caseSensitive, comparator
  //         const filterVal = filterContent.filterVal;
  //         if (typeof filterVal === "string") { // avoid redoing mapping on values that are already in { field, value }
  //             const newFilterValue = fields.map(f => ({ field: f, value: filterVal }));
  //             filterContent.filterVal = newFilterValue;
  //             curatedFilters[key] = filterContent;
  //         }
  //     }
  // }
  const listOfSpeciesFilter = handleListOfSpeciesFilter(filters);
  const ownershipFilter = handleOwnershipFilter(filters, ownerId);
  const dateFilters = handleDateFilter(filters);

  return {
    ...filters,
    ...listOfSpeciesFilter,
    ...ownershipFilter,
    ...dateFilters,
  };
}

function curateSortFields(sortField) {
  const fields = config.nomenclature.filter[sortField];
  if (fields) {
    return fields;
  }
  return sortField;
}

export default {
  handleSpecialSearchFilters,
  curateSortFields,
};
