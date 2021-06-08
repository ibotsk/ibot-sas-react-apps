/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Can from 'components/segments/auth/Can';

import {
  Button,
} from '@material-ui/core';

import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import { getGridStringOperators } from '@material-ui/data-grid';

import { GridCellExpand, SelectInputFilter } from '@ibot/components';
import { generaUtils } from '@ibot/utils';

import config from 'config/config';
import { helperUtils } from 'utils';

const { mappings: { genusType: { A, S } } } = config;
const ntypesFilterOptions = helperUtils.buildFilterOptionsFromKeys({ A, S });

export const columns = (role, handleShowModal) => [
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
        role={role}
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
    sortable: false,
    filterable: false,
  },
  {
    field: 'ntype',
    headerName: 'Type',
    flex: 0.5,
    filterOperators: getGridStringOperators()
      .filter((op) => op.value === 'equals')
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
    field: 'name',
    headerName: 'Name',
    flex: 1,
    sort: 'asc',
  },
  {
    field: 'authors',
    headerName: 'Authors',
    flex: 1,
  },
  {
    field: 'vernacular',
    headerName: 'Vernacular',
    flex: 1,
    hide: true,
  },
  {
    field: 'family-apg',
    headerName: 'Family APG',
    flex: 1,
    valueFormatter: (p) => (
      p.value ? p.value.name : undefined
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: 'family',
    headerName: 'Family',
    flex: 1,
    valueFormatter: (p) => (
      p.value ? p.value.name : undefined
    ),
    hide: true,
    sortable: false,
    filterable: false,
  },
  {
    field: 'accepted',
    headerName: 'Accepted names',
    flex: 1,
    renderCell: (p) => (
      <GridCellExpand
        value={(
          <Can
            role={role}
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
                      {generaUtils.formatGenus(parent.name)}
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
    sortable: false,
    filterable: false,
  },
];

export const defaultSortModel = [{
  field: 'name',
  sort: 'asc',
}];
