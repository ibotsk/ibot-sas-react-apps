/* eslint-disable import/prefer-default-export */
import { reducers } from '@ibot/core';
import { combineReducers } from 'redux';

import {
  defaultSortModel as defaultSortModelFamilies,
} from 'components/pages/Families/Table/columns';
import {
  defaultSortModel as defaultSortModelFamiliesApg,
} from 'components/pages/FamiliesAPG/Table/columns';

const {
  dataGridChangeReducer: familiesReducer,
  ...familiesActions
} = reducers
  .createDGActionsAndReducer('families', {
    sortModel: defaultSortModelFamilies,
  });

const {
  dataGridChangeReducer: familiesApgReducer,
  ...familiesApgActions
} = reducers
  .createDGActionsAndReducer('familiesApg', {
    sortModel: defaultSortModelFamiliesApg,
  });

export const {
  changePageAction: changePageActionFamilies,
  changePageSizeAction: changePageSizeActionFamilies,
  changeSortModelAction: changeSortModelActionFamilies,
  changeFilterModelAction: changeFilterModelActionFamilies,
} = familiesActions;
export const {
  changePageAction: changePageActionFamiliesApg,
  changePageSizeAction: changePageSizeActionFamiliesApg,
  changeSortModelAction: changeSortModelActionFamiliesApg,
  changeFilterModelAction: changeFilterModelActionFamiliesApg,
} = familiesApgActions;

export const datagrid = combineReducers({
  families: familiesReducer,
  familiesApg: familiesApgReducer,
});
