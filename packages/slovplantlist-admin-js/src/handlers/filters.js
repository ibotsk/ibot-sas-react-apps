import config from 'config/config';
import { FILTER_TYPES, Comparator } from 'react-bootstrap-table2-filter';

const { constants } = config;

const makeOwnershipRegexp = (value) => (
  `${constants.ownershipRegexp.start}${value}${constants.ownershipRegexp.end}`
);

export function listOfSpeciesFilterHandler(filterContent) {
  const listOfSpeciesKey = constants.listOfSpeciesColumn;
  const fields = config.nomenclature.filter[listOfSpeciesKey];
  let newContent;

  if (fields && filterContent) {
    const { filterVal } = filterContent;
    if (typeof filterVal === 'string') { // avoid redoing mapping on values that are already in { field, value }
      const newFilterValue = fields.map((f) => (
        { field: f, value: filterVal }
      ));
      newContent = {
        ...filterContent,
        filterVal: newFilterValue,
      };
    }
  }

  return newContent;
}

export function ownershipFilterHandler(filterContent, { ownerId }) {
  const ownershipMapping = config.mappings.ownership;
  const regexp = makeOwnershipRegexp(ownerId);

  let newContent;

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

    newContent = {
      ...filterContent,
      filterVal: newValue,
      comparator,
    };
  }

  return newContent;
}

export function dateFilterHandler(filterContent) {
  // WARNING: equality on dateTime does not work without time
  // not even LIKE '%2021-01-24%' because backend assumes it is 00:00:00 of local time and transforms it to GTM '2021-01-23T23:00:00'

  // leave not date filters as they are
  if (filterContent.filterType !== FILTER_TYPES.DATE) {
    return filterContent;
  }

  let newContent;
  const { filterVal: { comparator, date } } = filterContent;

  if (comparator && date) {
    const d = new Date(date);
    if (d.getFullYear() >= 1000) {
      const iso = d.toISOString();
      newContent = {
        ...filterContent,
        comparator,
        filterVal: iso.substr(0, iso.indexOf('T')), // date filter input has only date, so we get rid of time
      };
    }
  }

  return newContent;
}

export function checkedRecordFilterHandler(filterContent) {
  const { filterVal } = filterContent;

  return {
    ...filterContent,
    filterVal: null,
    comparator: filterVal === 'checked' // checked is when timestamp is not null
      ? Comparator.NE
      : Comparator.EQ,
  };
}
