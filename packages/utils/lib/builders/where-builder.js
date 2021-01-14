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

const NONBREAKING_WHITESPACE = '%C2%A0';
const REGULAR_WHITESPACE = '%20';
const replaceNonBreakingSpace = (val) => (
  val.replaceAll(NONBREAKING_WHITESPACE, REGULAR_WHITESPACE)
);

const resolveEncode = (isEncode, val) => {
  if (!val) {
    return val;
  }
  const encoded = isEncode ? encodeURIComponent(val) : val;
  return replaceNonBreakingSpace(encoded);
};

export const eq = (key, value, encodeURI = true) => ({
    [key]: resolveEncode(encodeURI, value),
  });
export const neq = (key, value, encodeURI = true) => ({
    [key]: { neq: resolveEncode(encodeURI, value) },
  });
export const like = (key, value, encodeURI = true) => ({
    [key]: { like: resolveEncode(encodeURI, value) },
  });
export const likep = (key, value, encodeURI = true) => (
    like(key, `%${value}%`, encodeURI)
  );
export const regexp = (key, value, encodeURI = true) => ({
    [key]: { regexp: resolveEncode(encodeURI, value) },
  });
export const and = (...objs) => ({ and: [...objs] });
export const or = (...objs) => ({ or: [...objs] });
export const inq = (key, ...vals) => ({ [key]: { inq: [...vals] } });
