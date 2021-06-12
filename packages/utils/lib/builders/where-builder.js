import { misc } from '..';

export class WhereBuilder {
  constructor() {
    this.where = {};
  }

  add(obj) {
    this.where = { ...this.where, ...obj };
    return this;
  }

  build() {
    return this.where || {};
  }

  buildString() {
    return JSON.stringify(this.build());
  }
}

const resolveEncode = (val, { encodeUri, escapeQuotes }) => {
  if (!val) {
    return val;
  }
  const escaped = escapeQuotes ? misc.escapeDoubleQuotes(val) : val;
  const encoded = encodeUri ? encodeURIComponent(escaped) : escaped;
  return misc.replaceNonBreakingSpaces(encoded);
};

const makeConjug = (objs, op) => {
  const notEmpty = objs.filter((o) => !misc.isEmpty(o));
  if (notEmpty.length === 0) {
    return {};
  }
  if (notEmpty.length === 1) {
    return notEmpty[0];
  }
  return { [op]: [...notEmpty] };
}

/**
 * 
 * @param {string} key 
 * @param {string|number} value 
 * @param {{ encodeUri:boolean, escape:boolean }} options 
 */
export const eq = (key, value, options = {
  encodeUri: true, escapeQuotes: true,
}) => ({
    [key]: resolveEncode(value, options),
  });
export const neq = (key, value, options = {
  encodeUri: true, escapeQuotes: true,
}) => ({
  [key]: { neq: resolveEncode(value, options) },
  });
export const like = (key, value, options = {
  encodeUri: true, escapeQuotes: true,
}) => ({
  [key]: { like: resolveEncode(value, options) },
  });
export const likep = (key, value, options = {
  encodeUri: true, escapeQuotes: true,
}) => (
  like(key, `%${value}%`, options)
  );
export const regexp = (key, value, options = {
  encodeUri: true, escapeQuotes: true,
}) => ({
  [key]: { regexp: resolveEncode(value, options) },
  });
export const gt = (key, value, options = {
  encodeUri: true, escapeQuotes: true,
}) => ({
  [key]: { gt: resolveEncode(value, options) },
});
export const lt = (key, value, options = {
  encodeUri: true, escapeQuotes: true,
}) => ({
  [key]: { lt: resolveEncode(value, options) },
});
export const gte = (key, value, options = {
  encodeUri: true, escapeQuotes: true,
}) => ({
  [key]: { gte: resolveEncode(value, options) },
});
export const lte = (key, value, options = {
  encodeUri: true, escapeQuotes: true,
}) => ({
  [key]: { lte: resolveEncode(value, options) },
});
export const and = (...objs) => (
  makeConjug(objs, 'and')
);
export const or = (...objs) => (
  makeConjug(objs, 'or')
);
export const inq = (key, ...vals) => ({ [key]: { inq: [...vals] } });
