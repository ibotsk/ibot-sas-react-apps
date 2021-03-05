/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react';

export function useTableData(
  page, rowsPerPage,
  getTotalCount, getData,
) {
  const [isLoading, setLoading] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      setLoading(true);

      const size = await getTotalCount();

      const limit = rowsPerPage || size; // use all records if limit is undefined
      const offset = page * limit;

      const records = await getData(limit, offset);

      if (!cancelled) {
        setTotalSize(size);
        setData(records);
        setLoading(false);
      }
    };

    fetch();

    return () => { cancelled = true; };
  }, [page, rowsPerPage, getTotalCount, getData]);

  return {
    data,
    totalSize,
    isLoading,
  };
}

export function useData(
  getData, page, rowsPerPage,
) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      setLoading(true);

      const records = await getData(page, rowsPerPage);

      if (!cancelled) {
        setData(records);
        setLoading(false);
      }
    };

    fetch();

    return () => { cancelled = true; };
  }, [getData, page, rowsPerPage]);

  return {
    data,
    isLoading,
  };
}
