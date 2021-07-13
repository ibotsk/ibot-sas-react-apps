import { FilterManager } from '@ibot/core';

import config from 'config/config';

import {
  ownershipFilterHandler,
  defaultFilterHandler,
  speciesNameFilterHandler,
  checkedRecordFilterHandler,
} from './dataGridFilters';

const {
  constants: {
    columns,
  },
} = config;

const fm = FilterManager((f) => f.columnField);

fm.addHandler(columns.ownership, ownershipFilterHandler);
fm.addHandler(columns.speciesName, speciesNameFilterHandler);
fm.addHandler(columns.checkedTimestampColumn, checkedRecordFilterHandler);
fm.addHandler('*', defaultFilterHandler);

export default fm;
