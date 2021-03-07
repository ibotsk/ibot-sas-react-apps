import config from 'config/config';
import { FILTER_TYPES } from 'react-bootstrap-table2-filter';

const { constants } = config;

const makeOwnershipRegexp = (value) => (
  `${constants.ownershipRegexp.start}${value}${constants.ownershipRegexp.end}`
);

export function listOfSpeciesFilterHandler(context, next) {
  const { filters } = context;

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

  context.filters = {
    ...filters,
    ...curatedFilters,
  };
  next();
}

export function ownershipFilterHandler(context, next) {
  const { filters, params: { ownerId } } = context;

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

  context.filters = {
    ...filters,
    ...curatedFilter,
  };
  next();
}

export function dateFilterHandler(context, next) {
  const { filters } = context;
  const dateFilters = {};

  const dateFilterKeys = Object.keys(filters).filter((k) => (
    filters[k].filterType === FILTER_TYPES.DATE
  ));

  // WARNING: equality on dateTime does not work without time
  // not even LIKE '%2021-01-24%' because backend assumes it is 00:00:00 of local time and transforms it to GTM '2021-01-23T23:00:00'
  dateFilterKeys.forEach((k) => {
    const { filterVal: { comparator, date } } = filters[k];
    let filt;
    if (comparator && date) {
      const d = new Date(date);
      if (d.getFullYear() >= 1000) {
        const iso = d.toISOString();
        filt = {
          ...filters[k],
          comparator,
          filterVal: iso.substr(0, iso.indexOf('T')), // date filter input has only date, so we get rid of time
        };
      }
    }

    dateFilters[k] = filt;
  });
  context.filters = {
    ...filters,
    ...dateFilters,
  };
  next();
}
