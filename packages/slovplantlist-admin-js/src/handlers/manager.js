import { FilterManager } from '@ibot/core';

import {
  ownershipFilterHandler,
  defaultFilterHandler,
  speciesNameFilterHandler,
  checkedRecordFilterHandler,
} from './dataGridFilters';

const fm = FilterManager((f) => f.columnField);

fm.addHandler('ownerIds', ownershipFilterHandler);
fm.addHandler('speciesName', speciesNameFilterHandler);
fm.addHandler('checkedTimestamp', checkedRecordFilterHandler);
fm.addHandler('*', defaultFilterHandler);

export default fm;
