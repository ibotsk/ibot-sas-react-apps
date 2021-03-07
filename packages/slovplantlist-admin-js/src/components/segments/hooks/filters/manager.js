import { FilterManager } from '@ibot/core';

import {
  listOfSpeciesFilterHandler,
  ownershipFilterHandler,
  dateFilterHandler,
} from 'middleware';

const fm = FilterManager();

fm.addHandler(listOfSpeciesFilterHandler);
fm.addHandler(ownershipFilterHandler);
fm.addHandler(dateFilterHandler);

export default fm;
