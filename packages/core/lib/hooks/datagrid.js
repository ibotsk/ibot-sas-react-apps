/* eslint-disable import/prefer-default-export */
import { useState } from 'react';

export function useDataGridChange(
  ownerId, pageInit = 0, pageSizeInit = 100, {
    pageBase = 0, // whether page numbering starts at 0 or 1
  },
) {
  const [page, setPage] = useState(pageInit + pageBase);
  const [pageSize, setPageSize] = useState(pageSizeInit);
  const [where, setWhere] = useState(undefined);
  const [order, setOrder] = useState(undefined);

  const handlePageChange = ({ page: p }) => (
    setPage(p + pageBase)
  );
  const handlePageSizeChange = ({ pageSize: ps }) => (
    setPageSize(ps)
  );
  const handleOrderChange = ({ sortModel }, formatter = (x) => x) => (
    setOrder(formatter(sortModel))
  );
  const handleWhereChange = ({ filterModel }, formatter = (x) => x) => (
    setWhere(formatter(filterModel))
  );

  return {
    page,
    pageSize,
    order,
    where,
    handlePageChange,
    handlePageSizeChange,
    handleOrderChange,
    handleWhereChange,
  };
}
