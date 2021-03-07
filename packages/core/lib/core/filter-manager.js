import MiddlewarePipeline from './private/middleware-pipeline';

function FilterManager() {
  const pipeline = MiddlewarePipeline();

  return {
    addHandler: pipeline.use,
    makeFilters: async ({ filters = {}, params = {} }) => {
      const { filters: f } = await pipeline.execute({ filters, params });
      return f;
    },
  };
}

export default FilterManager;
