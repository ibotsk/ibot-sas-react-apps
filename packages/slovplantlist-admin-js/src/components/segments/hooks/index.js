import { useEffect, useState } from 'react';

import { tablesFacade } from 'facades';

/**
 * @param {string} countUri
 * @param {string} getAllUri
 * @param {string} accessToken
 * @param {string} whereString
 * @param {number} page
 * @param {number} limit
 * @param {string} orderString
 * @param {string|number|boolean} forceChange any primitive
 */
function useTableData(
  countUri, getAllUri, accessToken, whereString, page, limit,
  orderString, forceChange,
) {
  const [isLoading, setLoading] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const size = await tablesFacade.getCount(
        countUri, whereString, accessToken,
      );

      const lim = limit || size; // use all records if limit is undefined
      const offset = (page - 1) * limit;

      const records = await tablesFacade.getAll(
        getAllUri, offset, whereString, orderString, lim, accessToken,
      );

      setTotalSize(size);
      setData(records);
      setLoading(false);
    };

    fetch();
  },
  [countUri, getAllUri, accessToken, whereString,
    page, limit, orderString, forceChange]);

  return {
    data,
    totalSize,
    isLoading,
  };
}

export default {
  useTableData,
};
