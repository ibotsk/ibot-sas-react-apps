function emptyToNull(obj) {
  return Object.keys(obj).reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: obj[curr] === '' ? null : obj[curr],
    }),
    {},
  );
}

export default {
  emptyToNull,
};
