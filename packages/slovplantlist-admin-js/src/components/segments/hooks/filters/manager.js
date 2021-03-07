import { FilterManager } from '@ibot/core';

import {
  listOfSpeciesFilterHandler,
  ownershipFilterHandler,
  dateFilterHandler,
  checkedRecordFilterHandler,
} from 'middleware';

const fm = FilterManager();

fm.addHandler(listOfSpeciesFilterHandler);
fm.addHandler(ownershipFilterHandler);
fm.addHandler(dateFilterHandler);
fm.addHandler(checkedRecordFilterHandler);

export default fm;
