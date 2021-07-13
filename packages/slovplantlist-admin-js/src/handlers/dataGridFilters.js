import {
  WhereBuilder,
  regexp, neq, eq, and, or,
} from '@ibot/utils';

import { whereUtils } from 'utils';

import config from 'config/config';

const {
  constants: {
    operators,
    columns,
    ownershipRegexp,
  },
  mappings: {
    ownership: ownershipMapping,
  },
  nomenclature,
} = config;

const makeOwnershipRegexp = (value) => (
  `${ownershipRegexp.start}${value}${ownershipRegexp.end}`
);

export function defaultFilterHandler(filterModel) {
  return whereUtils.dataGridFilterItemsToWhereWB(filterModel).build();
}

export function ownershipFilterHandler(filterModel, { ownerId }) {
  const { items = [] } = filterModel;

  const wb = new WhereBuilder();

  const ownerFilterItemIdx = items
    .findIndex((item) => item.columnField === columns.ownership);
  if (ownerFilterItemIdx > -1) {
    const ownerFilterItem = items[ownerFilterItemIdx];
    const {
      columnField,
      value,
    } = ownerFilterItem;

    const andArr = [];

    switch (value) {
      case ownershipMapping.mine.key:
        andArr.push(
          regexp(
            columnField, makeOwnershipRegexp(ownerId), { encodeUri: false },
          ),
        );
        break;
      case ownershipMapping.others.key:
        andArr.push(
          ...([null, '', ownerId].map((v) => neq(columnField, v))),
        );
        break;
      case ownershipMapping.unassigned.key:
        andArr.push(
          ...([null, ''].map((v) => eq(columnField, v))),
        );
        break;
      case ownershipMapping.notmine.key:
        andArr.push(
          neq(columnField, ownerId),
        );
        break;
      default:
        break;
    }

    wb.add(and(...andArr));
  }

  return wb.build();
}

export function speciesNameFilterHandler(filterModel) {
  const { items = [] } = filterModel;

  const wb = new WhereBuilder();

  const speciesNameFilterItemIdx = items
    .findIndex((item) => item.columnField === columns.speciesName);
  if (speciesNameFilterItemIdx > -1) {
    const speciesNameFilterItem = items[speciesNameFilterItemIdx];
    const {
      operatorValue,
      value,
    } = speciesNameFilterItem;

    if (value) {
      const fields = nomenclature.filter.listOfSpecies;

      const orArr = fields.map((field) => (
        whereUtils.dataGridResolveOperator(operatorValue, field, value)
      ));

      wb.add(or(...orArr));
    }
  }
  return wb.build();
}

export function checkedRecordFilterHandler(filterModel) {
  const { items = [] } = filterModel;
  const wb = new WhereBuilder();

  const speciesNameFilterItemIdx = items
    .findIndex((item) => item.columnField === columns.checkedTimestampColumn);
  if (speciesNameFilterItemIdx > -1) {
    const speciesNameFilterItem = items[speciesNameFilterItemIdx];
    const {
      columnField,
      operatorValue,
    } = speciesNameFilterItem;

    if (operatorValue) {
      const op = operatorValue === operators.is
        ? neq(columnField, null) : eq(columnField, null);

      wb.add(op);
    }
  }
  return wb.build();
}
