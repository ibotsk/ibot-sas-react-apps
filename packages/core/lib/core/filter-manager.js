import MiddlewarePipeline from './private/middleware-pipeline';

const addHandlerToFilterManager = (fm) => (
  function addHandler(filterNames, handler) {
    const middleware = (ctx, next) => {
      const { filters, params } = ctx;

      const filterNamesArr = typeof filterNames === 'string'
        ? [filterNames] : [...filterNames];

      // registered filter names that occur in filters
      const filterKeys = filterNamesArr.includes('*') // asterisk means every filter
        ? Object.keys(filters)
        : Object.keys(filters).filter((k) => filterNamesArr.includes(k));

      let handledFilters = { ...filters };
      filterKeys.forEach((filterName) => {
        const filterContent = handledFilters[filterName];
        const handlerResult = filterContent
          ? handler(filterContent, params)
          : undefined;

        handledFilters = {
          ...handledFilters,
          [filterName]: handlerResult,
        };
      });

      ctx.filters = { ...handledFilters };

      next();
    };

    fm.use(middleware);
  }
);

function FilterManager() {
  const pipeline = MiddlewarePipeline();

  return {
    addHandler: addHandlerToFilterManager(pipeline),
    makeFilters: async ({ filters = {}, params = {} }) => {
      const { filters: f } = await pipeline.execute({ filters, params });
      return f;
    },
  };
}

export default FilterManager;
