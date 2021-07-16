/* eslint-disable import/prefer-default-export */

export const dataGridHandlers = (dispatch, {
  changePageAction,
  changePageSizeAction,
  changeSortModelAction,
  changeFilterModelAction,
  changeColumnVisibilityAction,
}) => ({
  handlePageChange: ({ page: p }) => dispatch(changePageAction(p)),
  handlePageSizeChange: ({ pageSize: ps }) => (
    dispatch(changePageSizeAction(ps))
  ),
  handleSortModelChange: ({ sortModel: sm }) => (
    dispatch(changeSortModelAction(sm))
  ),
  handleFilterModelChange: ({ filterModel: fm }) => (
    dispatch(changeFilterModelAction(fm))
  ),
  handleColumnVisibilityChange: ({ field, isVisible }) => (
    dispatch(changeColumnVisibilityAction(field, isVisible))
  ),
});
