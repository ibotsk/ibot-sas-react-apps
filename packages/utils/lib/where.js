import {
  WhereBuilder,
  eq, and,
} from './builders/where-builder';

function whereDataAll(data) {
  const andItems = Object.keys(data)
    .filter((k) => !!data[k])
    .map((k) => eq(k, data[k]));

  if (andItems.length === 0) {
    return null;
  }
  const wb = new WhereBuilder();
  return wb.add(and(...andItems)).build();
}

export default {
  whereDataAll,
};
