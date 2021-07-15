/* eslint-disable import/prefer-default-export */

const setColumnVisibility = (columns, field, isVisible) => {
  const columnsCopy = { ...columns };
  const column = columnsCopy[field];

  if (column) {
    columnsCopy[field] = {
      ...column,
      hide: !isVisible,
    };
  } else {
    columnsCopy[field] = {
      hide: !isVisible,
    };
  }
  return columnsCopy;
};

export function createDGActionsAndReducer(tableName, initialState = {}) {
  const initial = {
    page: 0,
    pageSize: 100,
    sortModel: [],
    filterModel: {},
    columnsChanges: {},
    ...initialState,
  };

  const tn = tableName.toUpperCase();
  const CHANGE_PAGE = `DG_CHANGE_PAGE_${tn}`;
  const CHANGE_PAGE_SIZE = `DG_CHANGE_PAGE_SIZE_${tn}`;
  const CHANGE_SORT_MODEL = `DG_CHANGE_SORT_MODEL_${tn}`;
  const CHANGE_FILTER_MODEL = `DG_CHANGE_FILTER_MODEL_${tn}`;
  const CHANGE_COLUMN_VISIBILITY = `DG_CHANGE_COLUMN_VISIBILITY_${tn}`;

  return {
    changePageAction: (page) => ({
      type: CHANGE_PAGE,
      page: page || initial.page,
    }),
    changePageSizeAction: (pageSize) => ({
      type: CHANGE_PAGE_SIZE,
      pageSize: pageSize || initial.pageSize,
    }),
    changeSortModelAction: (sortModel) => ({
      type: CHANGE_SORT_MODEL,
      sortModel: sortModel || initial.sortModel,
    }),
    changeFilterModelAction: (filterModel) => ({
      type: CHANGE_FILTER_MODEL,
      filterModel: filterModel || initial.filterModel,
    }),
    changeColumnVisibilityAction: (field, isVisible) => ({
      type: CHANGE_COLUMN_VISIBILITY,
      field,
      isVisible,
    }),

    dataGridChangeReducer: (state = initial, action) => {
      switch (action.type) {
        case CHANGE_PAGE:
          return {
            ...state,
            page: action.page,
          };
        case CHANGE_PAGE_SIZE:
          return {
            ...state,
            pageSize: action.pageSize,
          };
        case CHANGE_SORT_MODEL:
          return {
            ...state,
            sortModel: action.sortModel,
          };
        case CHANGE_FILTER_MODEL:
          return {
            ...state,
            filterModel: action.filterModel,
          };
        case CHANGE_COLUMN_VISIBILITY:
          return {
            ...state,
            columnsChanges: setColumnVisibility(
              state.columnChanges, action.field, action.isVisible,
            ),
          };
        default:
          return state;
      }
    },
  };
}
