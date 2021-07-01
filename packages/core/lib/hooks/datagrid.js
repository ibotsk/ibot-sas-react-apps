import { useState, useEffect } from 'react';

export function useDataGridChange(
  ownerId, pageInit = 0, pageSizeInit = 100, {
    pageBase = 0, // whether page numbering starts at 0 or 1 (for compatibility reasons)
  } = {},
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
  const handleOrderChange = ({ sortModel }, callback = (x) => x) => {
    const newOrder = callback(sortModel);
    setOrder(newOrder);
  };
  const handleWhereChange = ({ filterModel }, callback = (x) => x) => {
    const newWhere = callback(filterModel);
    setWhere(newWhere);
  };

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

export function useAdminTableData(
  getTotalCount, getAll, whereString, page, pageSize,
  orderString, accessToken, forceChange,
) {
  const [isLoading, setLoading] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      setLoading(true);
      const size = await getTotalCount(whereString, accessToken);

      const limit = pageSize || size; // use all records if limit is undefined
      const offset = page * limit;

      const records = await getAll(
        limit, offset, whereString, orderString, accessToken,
      );

      if (!cancelled) {
        setTotalSize(size);
        setData(records);
        setLoading(false);
      }
    };

    fetch();

    return () => { cancelled = true; };
  }, [getTotalCount, getAll, whereString,
    page, pageSize, orderString, accessToken, forceChange]);

  return {
    data,
    totalSize,
    isLoading,
  };
}
