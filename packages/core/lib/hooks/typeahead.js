/* eslint-disable import/prefer-default-export */
import { useCallback, useEffect, useState } from 'react';

// only single selection is possible
export function useAsyncTypeahead(
  onSearch, initialSelected = [], accessToken,
  callbackFunction = () => {},
) {
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);

  const [{ id: idInitial, label: labelInitial } = {}] = initialSelected;
  const [{ id, label } = {}] = selected;

  useEffect(() => {
    if (initialSelected.length > 0) {
      setSelected([{ id: idInitial, label: labelInitial }]);
    }
  }, [idInitial, labelInitial]);

  useEffect(() => {
    if (!id && !label) {
      return callbackFunction([]);
    }
    return callbackFunction([{ id, label }]);
  }, [id, label]);

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
