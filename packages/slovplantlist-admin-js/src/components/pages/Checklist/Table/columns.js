/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Can from 'components/segments/auth/Can';
import Ownership from 'components/segments/auth/Ownership';

import {
  Button, TextField,
} from '@material-ui/core';

import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import {
  getGridStringOperators, getGridDateOperators,
} from '@material-ui/data-grid';

import {
  LosName,
  GridCellExpand, SelectInputFilter,
} from '@ibot/components';

import config from 'config/config';
import { helperUtils } from 'utils';

const {
  constants,
  mappings: {
    losType,
    ownership,
  },
} = config;

const ownershipAdminOptions = helperUtils.buildFilterOptionsFromKeys(ownership);
const { unassigned, others, ...ownershipAuthorOptions } = ownershipAdminOptions;

const ntypesFilterOptions = helperUtils.buildFilterOptionsFromKeys(losType);
const insertedMethodOptions = Object.values(constants.insertedMethod)
  .map((v) => ({ label: v, value: v }));
const updatedMethodOptions = Object.values(constants.updatedMethod)
  .map((v) => ({ label: v, value: v }));

const dateFormatter = (param) => (
  param.value && (new Date(param.value)).toUTCString()
);

export const columns = (isAuthor, user, handleShowModal) => [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.5,
  },
  {
    field: 'action',
    headerName: 'Actions',
    flex: 0.5,
    renderCell: (p) => (
      <Can
        role={user.role}
        perform="genus:edit"
        yes={() => (
          <Button
            size="small"
            color="primary"
            onClick={() => handleShowModal(p.row.id)}
          >
            Edit
          </Button>
        )}
      />
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: 'checkedTimestamp',
    headerName: 'Checked',
    flex: 0.5,
    renderCell: (p) => (p.value ? (
      <DoneIcon />
    ) : (
      <ClearIcon />
    )),
    filterOperators: getGridDateOperators()
      .filter((op) => [constants.operators.is, constants.operators.not]
        .includes(op.value))
      .map((op) => ({
        ...op,
        InputComponent: (props) => (
          <TextField
            {...props}
            type="text"
            label="value"
            value="checked"
            disabled
          />
          // <SelectInputFilter
          //   options={isAuthor
          //     ? ownershipAuthorOptions
          //     : ownershipAdminOptions}
          //   defaultIdx={0}
          //   {...props}
          // />
        ),
      })),
    sortable: false,
  },
  {
    field: 'ownerIds',
    headerName: 'Ownership',
    filterOperators: getGridStringOperators()
      .filter((op) => op.value === constants.operators.equals)
      .map((op) => ({
        ...op,
        InputComponent: (props) => (
          <SelectInputFilter
            options={isAuthor
              ? ownershipAuthorOptions
              : ownershipAdminOptions}
            defaultIdx={0}
            {...props}
          />
        ),
      })),
    renderCell: (p) => (
      <Can
        role={user.role}
        perform="species:edit"
        data={{
          speciesGenusId: p.row.idGenus,
          userGeneraIds: user.userGenera,
        }}
        yes={() => (
          <Ownership role={user.role} isOwner owners={p.row.ownerNames} />
        )}
        no={() => (
          <Ownership
            role={user.role}
            isOwner={false}
            owners={p.row.ownerNames}
          />
        )}
      />
    ),
    hide: true,
    sortable: false,
  },
  {
    field: 'ntype',
    headerName: 'Type',
    flex: 0.5,
    filterOperators: getGridStringOperators()
      .filter((op) => op.value === constants.operators.equals)
      .map((op) => ({
        ...op,
        InputComponent: (props) => (
          <SelectInputFilter
            options={ntypesFilterOptions}
            {...props}
          />
        ),
      })),
  },
  {
    field: 'speciesName',
    headerName: 'Name',
    flex: 1,
    renderCell: (p) => (
      <GridCellExpand
        value={(
          <LosName data={p.row} authors={false} />
        )}
        width={p.colDef.width}
      />
    ),
  },
  {
    field: 'authors',
    headerName: 'Authorship',
    flex: 1,
    renderCell: (p) => (
      <GridCellExpand
        value={p.value}
        width={p.colDef.width}
      />
    ),
  },
  {
    field: 'publication',
    headerName: 'Publication',
    flex: 1,
    hide: true,
    renderCell: (p) => (
      <GridCellExpand
        value={p.value}
        width={p.colDef.width}
      />
    ),
  },
  {
    field: 'accepted',
    headerName: 'Accepted name (s)',
    flex: 1,
    renderCell: (p) => (
      <GridCellExpand
        value={(
          <Can
            role={user.role}
            perform="genus:edit"
            yes={() => (
              <div style={{ width: '100%' }}>
                {
                  p.value.map(({ parent }, i) => ([
                    i > 0 && ', ',
                    <Button
                      size="small"
                      color="primary"
                      key={parent.id}
                      onClick={() => handleShowModal(parent.id)}
                    >
                      <LosName data={parent} />
                    </Button>,
                  ]))
                }
              </div>
            )}
          />
        )}
        width={p.colDef.width}
      />
    ),
  },
  {
    field: 'createdTimestamp',
    headerName: 'Created at',
    type: 'dateTime',
    flex: 1,
    hide: true,
    renderCell: (p) => (
      <GridCellExpand
        value={dateFormatter(p)}
        width={p.colDef.width}
      />
    ),
  },
  {
    field: 'updatedTimestamp',
    headerName: 'Updated at',
    type: 'dateTime',
    flex: 1,
    hide: true,
    renderCell: (p) => (
      <GridCellExpand
        value={dateFormatter(p)}
        width={p.colDef.width}
      />
    ),
  },
  {
    field: 'insertedBy',
    headerName: 'Inserted by',
    flex: 0.5,
    hide: true,
  },
  {
    field: 'insertedMethod',
    headerName: 'Inserted method',
    filterOperators: getGridStringOperators()
      .filter((op) => op.value === constants.operators.equals)
      .map((op) => ({
        ...op,
        InputComponent: (props) => (
          <SelectInputFilter
            options={insertedMethodOptions}
            {...props}
          />
        ),
      })),
    flex: 0.5,
    hide: true,
  },
  {
    field: 'updatedBy',
    headerName: 'Updated by',
    flex: 0.5,
    hide: true,
  },
  {
    field: 'updatedMethod',
    headerName: 'Updated method',
    filterOperators: getGridStringOperators()
      .filter((op) => op.value === constants.operators.equals)
      .map((op) => ({
        ...op,
        InputComponent: (props) => (
          <SelectInputFilter
            options={updatedMethodOptions}
            {...props}
          />
        ),
      })),
    flex: 0.5,
    hide: true,
  },
];

export const defaultSortModel = [{
  field: 'id',
  sort: 'asc',
}];
