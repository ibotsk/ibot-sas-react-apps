/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react';

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
