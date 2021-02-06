import isEmpty from 'lodash.isempty';

import config from '../config';

const {
  constants: { nonRegularWhitespacesRegex, escape },
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

function escapeDoubleQuotes(val) {
  return val.replaceAll(new RegExp(escape, 'gi'), '\\$&');
}

/**
 * if not string, return original value
 * else try JSON.parse
 * if fails, return original value.
 * @param {any} value 
 */
function parseJSONSafe(value) {
  if (!value || (typeof value !== 'string')) {
    return value;
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

export default {
  emptyToNull,
  replaceNonBreakingSpaces,
  escapeDoubleQuotes,
  parseJSONSafe,
  isEmpty,
};
