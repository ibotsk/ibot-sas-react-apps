import config from '../config';

const {
  constants: { nonRegularWhitespacesRegex },
} = config;

const nonRegularWhitespacesRegexObj = new RegExp(
  nonRegularWhitespacesRegex, 'gi',
);

function emptyToNull(obj) {
  if (!obj) {
    return obj;
  }
  return Object.keys(obj).reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: obj[curr] === '' ? null : obj[curr],
    }),
    {},
  );
}

function replaceNonBreakingSpaces(obj) {
  return Object.keys(obj).reduce(
    (prev, curr) => {
      const val = obj[curr];
      const newVal = typeof val === 'string'
        ? val.replaceAll(nonRegularWhitespacesRegexObj, '') : val;
      return {
        ...prev,
        [curr]: newVal,
      };
    },
    {},
  );
}

export default {
  emptyToNull,
  replaceNonBreakingSpaces,
};
