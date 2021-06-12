const FILTER_NAME_ANY = '*';

function FilterManager(filterNameGetter) {
  const handlers = {};

  return {
    addHandler: (key, h) => {
      handlers[key] = h;
    },
    execute: (filters = {}, params = {}) => {
      const { items, linkOperator } = filters;

      const handlerKeys = Object.keys(handlers);
      const handlerKeysNoAsterisk = handlerKeys
        .filter((k) => k !== FILTER_NAME_ANY);

      const whereItems = handlerKeys.map((key) => {
        const handler = handlers[key];
        const relevantItems = key === FILTER_NAME_ANY
          ? items.filter((f) => (
            !handlerKeysNoAsterisk.includes(filterNameGetter(f))
          ))
          : items.filter((f) => filterNameGetter(f) === key);

        const relevantFilter = { items: relevantItems, linkOperator };
        return handler(relevantFilter, params);
      });
      return whereItems;
    },
  };
}

export default FilterManager;
