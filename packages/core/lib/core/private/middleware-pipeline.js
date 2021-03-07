function MiddlewarePipeline(...middlewares) {
  const stack = middlewares;

  const use = (...mws) => {
    stack.push(...mws);
  };

  const execute = async (context) => {
    let prevIndex = -1;

    const runner = async (index) => {
      if (index === prevIndex) {
        throw new Error('next() called multiple times');
      }

      prevIndex = index;

      const middleware = stack[index];

      if (middleware) {
        await middleware(context, () => runner(index + 1));
      }
    };

    await runner(0);
    return context;
  };

  return { use, execute };
}

export default MiddlewarePipeline;
