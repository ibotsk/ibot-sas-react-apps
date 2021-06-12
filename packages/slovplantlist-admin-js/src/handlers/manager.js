import { FilterManager } from '@ibot/core';

import {
  ownershipFilterHandler,
  defaultFilterHandler,
} from './dataGridFilters';

const fm = FilterManager((f) => f.columnField);

// fm.addHandler(constants.listOfSpeciesColumn, listOfSpeciesFilterHandler);
// fm.addHandler(constants.ownership, ownershipFilterHandler);
// fm.addHandler('*', dateFilterHandler); // apply dateTime handler to all filters
// fm.addHandler(constants.checkedTimestampColumn, checkedRecordFilterHandler);

fm.addHandler('ownerIds', ownershipFilterHandler);
fm.addHandler('*', defaultFilterHandler);

export default fm;
