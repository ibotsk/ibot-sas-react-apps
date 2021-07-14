/* eslint-disable import/prefer-default-export */
import { reducers } from '@ibot/core';
import { combineReducers } from 'redux';

import {
  defaultSortModel as defaulSortModelFamilies,
} from 'components/pages/Families/Table/columns';

const { dataGridChangeReducer, ...familiesActions } = reducers
  .createDGActionsAndReducer('families', {
    sortModel: defaulSortModelFamilies,
  });

export const {
  changePageAction: changePageActionFamilies,
  changePageSizeAction: changePageSizeActionFamilies,
  changeSortModelAction: changeSortModelActionFamilies,
  changeFilterModelAction: changeFilterModelActionFamilies,
} = familiesActions;

export const datagrid = combineReducers({
  families: dataGridChangeReducer,
});
