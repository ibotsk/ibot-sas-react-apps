/* eslint-disable import/prefer-default-export */
import { reducers } from '@ibot/core';
import { combineReducers } from 'redux';

import {
  defaultSortModel as defaultSortModelFamilies,
} from 'components/pages/Families/Table/columns';
import {
  defaultSortModel as defaultSortModelFamiliesApg,
} from 'components/pages/FamiliesAPG/Table/columns';
import {
  defaultSortModel as defaultSortModelGenera,
} from 'components/pages/Genera/Table/columns';
import {
  defaultSortModel as defaultSortModelChecklist,
} from 'components/pages/Checklist/Table/columns';
import {
  defaultSortModel as defaultSortModelAllUsers,
} from 'components/pages/Users/Tabs/Table/columns-all-users';
import {
  defaultSortModel as defaultSortModelGeneraUsers,
} from 'components/pages/Users/Tabs/Table/columns-genera-users';

const defaultFilterModel = {
  items: [{ columnField: 'id', operatorValue: 'contains' }],
  linkOperator: 'and',
};

const {
  dataGridChangeReducer: familiesReducer,
  ...familiesActions
} = reducers.createDGActionsAndReducer('families', {
  sortModel: defaultSortModelFamilies,
  filterModel: defaultFilterModel,
});

const {
  dataGridChangeReducer: familiesApgReducer,
  ...familiesApgActions
} = reducers.createDGActionsAndReducer('familiesApg', {
  sortModel: defaultSortModelFamiliesApg,
  filterModel: defaultFilterModel,
});

const {
  dataGridChangeReducer: generaReducer,
  ...generaActions
} = reducers.createDGActionsAndReducer('genera', {
  sortModel: defaultSortModelGenera,
  filterModel: defaultFilterModel,
});

const {
  dataGridChangeReducer: checklistReducer,
  ...checklistActions
} = reducers.createDGActionsAndReducer('checklist', {
  sortModel: defaultSortModelChecklist,
  filterModel: defaultFilterModel,
});

const {
  dataGridChangeReducer: allUsersReducer,
  ...allUsersActions
} = reducers.createDGActionsAndReducer('allusers', {
  sortModel: defaultSortModelAllUsers,
  filterModel: defaultFilterModel,
});

const {
  dataGridChangeReducer: generaUsersReducer,
  ...generaUsersActions
} = reducers.createDGActionsAndReducer('generausers', {
  sortModel: defaultSortModelGeneraUsers,
  filterModel: defaultFilterModel,
});

export const {
  changePageAction: changePageActionFamilies,
  changePageSizeAction: changePageSizeActionFamilies,
  changeSortModelAction: changeSortModelActionFamilies,
  changeFilterModelAction: changeFilterModelActionFamilies,
  changeColumnVisibilityAction: changeColumnVisibilityActionFamilies,
} = familiesActions;
export const {
  changePageAction: changePageActionFamiliesApg,
  changePageSizeAction: changePageSizeActionFamiliesApg,
  changeSortModelAction: changeSortModelActionFamiliesApg,
  changeFilterModelAction: changeFilterModelActionFamiliesApg,
  changeColumnVisibilityAction: changeColumnVisibilityActionFamiliesApg,
} = familiesApgActions;
export const {
  changePageAction: changePageActionGenera,
  changePageSizeAction: changePageSizeActionGenera,
  changeSortModelAction: changeSortModelActionGenera,
  changeFilterModelAction: changeFilterModelActionGenera,
  changeColumnVisibilityAction: changeColumnVisibilityActionGenera,
} = generaActions;
export const {
  changePageAction: changePageActionChecklist,
  changePageSizeAction: changePageSizeActionChecklist,
  changeSortModelAction: changeSortModelActionChecklist,
  changeFilterModelAction: changeFilterModelActionChecklist,
  changeColumnVisibilityAction: changeColumnVisibilityActionChecklist,
} = checklistActions;
export const {
  changePageAction: changePageActionAllUsers,
  changePageSizeAction: changePageSizeActionAllUsers,
  changeSortModelAction: changeSortModelActionAllUsers,
  changeFilterModelAction: changeFilterModelActionAllUsers,
  changeColumnVisibilityAction: changeColumnVisibilityActionAllUsers,
} = allUsersActions;
export const {
  changePageAction: changePageActionGeneraUsers,
  changePageSizeAction: changePageSizeActionGeneraUsers,
  changeSortModelAction: changeSortModelActionGeneraUsers,
  changeFilterModelAction: changeFilterModelActionGeneraUsers,
  changeColumnVisibilityAction: changeColumnVisibilityActionGeneraUsers,
} = generaUsersActions;

export const datagrid = combineReducers({
  families: familiesReducer,
  familiesApg: familiesApgReducer,
  genera: generaReducer,
  checklist: checklistReducer,
  allUsers: allUsersReducer,
  generaUsers: generaUsersReducer,
});
