import {
  WhereBuilder, and, or,
  likep, like, regexp,
  neq, eq, gt, gte, lt, lte,
} from '@ibot/utils';

import config from 'config/config';

const { constants: { operators } } = config;

const dataGridResolveOperator = (operator, key, value) => {
  switch (operator) {
    case operators.contains:
      return likep(key, value);
    case operators.startsWith:
      return like(key, `${value}%`);
    case operators.endsWith:
      return like(key, `%${value}`);
    case operators.regexp:
      return regexp(key, value, { encodeUri: false });
    case operators.not:
    case operators.notEquals:
      return neq(key, value);
    case operators.after:
      return gt(key, value);
    case operators.onOrAfter:
      return gte(key, value);
    case operators.before:
      return lt(key, value);
    case operators.onOrBefore:
      return lte(key, value);
    case operators.is:
    case operators.equals:
    default:
      return eq(key, value);
  }
};

const dataGridResolveConjunction = (operator) => {
  switch (operator) {
    case 'or':
      return or;
    case 'and':
    default:
      return and;
  }
};

// --- PUBLIC --- //

function dataGridFilterItemsToWhereWB(filterModel) {
  const wb = new WhereBuilder();
  if (!filterModel) {
    return wb;
  }
  const { items, linkOperator } = filterModel;

  const whereItems = items
    .filter(({ value }) => !!value)
    .map(({ columnField, operatorValue, value }) => (
      dataGridResolveOperator(
        operatorValue, columnField, value,
      )
    ));

  const conj = dataGridResolveConjunction(linkOperator);
  return wb.add(conj(...whereItems));
}

function dataGridFilterModelToWhereString(filterModel) {
  const wb = dataGridFilterItemsToWhereWB(filterModel);
  return wb.buildString();
}

function makeWhereString(whereItems, op) {
  const conj = dataGridResolveConjunction(op);
  const wb = new WhereBuilder();
  return wb.add(conj(...whereItems)).buildString();
}

export default {
  dataGridResolveOperator,
  dataGridFilterItemsToWhereWB,
  dataGridFilterModelToWhereString,
  makeWhereString,
};
