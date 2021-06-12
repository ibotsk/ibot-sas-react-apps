import {
  WhereBuilder, and, or,
  likep, like, regexp, neq, eq,
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
    case operators.notEquals:
      return neq(key, value);
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

function dataGridFilterItemsToWhereWB(filterModel) {
  const { items, linkOperator } = filterModel;
  const wb = new WhereBuilder();

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

function dataGridFilterModelToWhereString({ filterModel }) {
  const wb = dataGridFilterItemsToWhereWB(filterModel);
  return wb.buildString();
}

function makeWhereString(whereItems, op) {
  const conj = dataGridResolveConjunction(op);
  const wb = new WhereBuilder();
  return wb.add(conj(...whereItems)).buildString();
}

export default {
  dataGridFilterItemsToWhereWB,
  dataGridFilterModelToWhereString,
  makeWhereString,
};
