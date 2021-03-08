import { FilterManager } from '@ibot/core';

import config from 'config/config';

import {
  listOfSpeciesFilterHandler,
  ownershipFilterHandler,
  dateFilterHandler,
  checkedRecordFilterHandler,
} from './filters';

const {
  constants,
} = config;

const fm = FilterManager();

fm.addHandler(constants.listOfSpeciesColumn, listOfSpeciesFilterHandler);
fm.addHandler(constants.ownership, ownershipFilterHandler);
fm.addHandler('*', dateFilterHandler); // apply dateTime handler to all filters
fm.addHandler(constants.checkedTimestampColumn, checkedRecordFilterHandler);

export default fm;
