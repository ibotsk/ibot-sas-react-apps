import isEmpty from 'lodash.isempty';
import trim from 'lodash.trim';
import pick from 'lodash.pick';

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

function replaceNonBreakingSpaces(value) {
  if (typeof value === 'string') {
    return value.replace(nonRegularWhitespacesRegex, '');
  }

  return Object.keys(value).reduce(
    (prev, curr) => {
      const val = value[curr];
      const newVal = typeof val === 'string'
        ? val.replace(nonRegularWhitespacesRegexObj, '') : val;
      return {
        ...prev,
        [curr]: newVal,
      };
    },
    {},
  );
}

function escapeDoubleQuotes(val) {
  if (typeof val !== 'string') {
    return val;
  }
  return val.replace(new RegExp(escape, 'gi'), '\\$&');
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

/**
 * Creates a stringified version of the obj with pricked properties
 * @param {object} obj 
 * @param {array<string>} properties properties to pick from obj
 */
function stringifyObj(obj, properties = undefined) {
  let objToStringify = obj;
  if (properties) {
    objToStringify = pick(obj, properties);
  }
  return JSON.stringify(objToStringify);
}

export default {
  emptyToNull,
  replaceNonBreakingSpaces,
  escapeDoubleQuotes,
  parseJSONSafe,
  stringifyObj,
  isEmpty,
  trim,
};
