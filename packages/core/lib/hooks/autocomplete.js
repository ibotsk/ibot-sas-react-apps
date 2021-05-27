/* eslint-disable import/prefer-default-export */
import { useCallback, useEffect, useState } from 'react';

// only single selection is possible
export function useAsyncTypeahead(
  onSearch, initialSelected = [], accessToken,
  callbackFunction = () => { },
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

/**
 * Use with AdminAutocompleteAsyncs
 * @param {*} searchFunc
 * @param {*} accessToken
 * @param {*} initialSelected
 * @param {function} initialMapper how to map initialSelected into { id, label }, identity otherwise
 * @returns
 */
export function useAsyncAutocomplete(
  searchFunc, accessToken, initialSelected = {},
  {
    initialMapper = (x) => x,
    minInputLength = 3,
    callbackFunction = () => {},
  } = {},
) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState({});

  const {
    id: idInitial,
    label: labelInitial,
  } = initialMapper(initialSelected || {}) || {};

  useEffect(() => {
    if (idInitial && labelInitial) {
      setSelected({ id: idInitial, label: labelInitial });
    } else {
      setSelected({});
    }
  }, [idInitial, labelInitial]);

  const { id, label } = selected || {};
  useEffect(() => {
    if (!id && !label) {
      return callbackFunction({});
    }
    return callbackFunction({ id, label });
  }, [id, label]);

  const handleFetch = useCallback((e, query) => {
    let cancelled = false;

    const search = async () => {
      if (query && query.length >= minInputLength) {
        setLoading(true);
        const records = await searchFunc(query, accessToken);

        if (!cancelled) {
          setOptions(records);
          setLoading(false);
        }
      }
    };

    search();

    return () => { cancelled = true; };
  }, [searchFunc, accessToken, minInputLength]);

  const handleChange = (e, newValue) => setSelected(newValue || {});

  return {
    selected,
    options,
    loading,
    handleFetch,
    handleChange,
  };
}
