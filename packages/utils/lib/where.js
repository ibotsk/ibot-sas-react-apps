import difference from 'lodash.difference';
import intersection from 'lodash.intersection';

import {
  WhereBuilder,
  eq, and,
} from './builders/where-builder';

/**
 * Creates where equal on every property in data
 * @param {object} data 
 * @param {array<string>} exclude array of property names to be excluded from data
 * @param {array<string>} includeOnly array of property names are intersected with keys of data. If empty, no intersection is made.
 */
function whereDataAll(data, exclude = [], includeOnly = []) {
  const keysWithoutExcluded = difference(Object.keys(data), exclude);
  let keys = keysWithoutExcluded;

  if (includeOnly.length > 0) {
    keys = intersection(keysWithoutExcluded, includeOnly);
  }

  const andItems = keys
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
