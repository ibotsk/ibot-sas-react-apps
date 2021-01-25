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
 * @param {boolean} exact if true, falsy values in data are included in the query
 */
function whereDataAll(data, exclude = [], includeOnly = [], exact = false) {
  const keysWithoutExcluded = difference(Object.keys(data), exclude);
  let keys = keysWithoutExcluded;

  if (includeOnly.length > 0) {
    keys = intersection(keysWithoutExcluded, includeOnly);
  }

  let itemKeys = keys;
  if (!exact) {
    // false, 0 and empty are allowed
    itemKeys = keys.filter((k) => data[k] !== null && data[k] !== undefined);
  }
  const andItems = itemKeys.map((k) => eq(k, data[k]));

  if (andItems.length === 0) {
    return null;
  }
  const wb = new WhereBuilder();
  return wb.add(and(...andItems)).build();
}

export default {
  whereDataAll,
};
