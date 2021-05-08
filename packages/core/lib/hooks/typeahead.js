/* eslint-disable import/prefer-default-export */
import { useCallback, useEffect, useState } from 'react';

export function useAsyncTypeahead(onSearch, initialSelected, accessToken) {
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => (
    setSelected(initialSelected)
  ), [initialSelected]);

  const doSearch = useCallback((query) => {
    let cancelled = false;

    const search = async () => {
      setLoading(true);
      const records = await onSearch(query, accessToken);

      if (!cancelled) {
        setResults(records);
        setLoading(false);
      }
    };

    search();

    return () => { cancelled = true; };
  }, [onSearch, accessToken]);

  const handleChangeTypeahead = (s) => (
    setSelected(s)
  );

  const getStaticSelected = () => {
    if (!selected || selected.length === 0) {
      return '';
    }
    return selected.label;
  };

  return {
    selected,
    results,
    isLoading,
    doSearch,
    handleChangeTypeahead,
    getStaticSelected,
  };
}
