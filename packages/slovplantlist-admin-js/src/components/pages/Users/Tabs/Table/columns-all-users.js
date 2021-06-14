import React from 'react';

import {
  Button,
} from '@material-ui/core';

import { formatterUtils } from 'utils';

export const columns = (handleShowModal) => [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
  },
  {
    field: 'action',
    headerName: 'Action',
    renderCell: (p) => (
      <Button
        size="small"
        color="primary"
        onClick={() => handleShowModal(p.row.id)}
      >
        Edit
      </Button>
    ),
    sortable: false,
    filterable: false,
    flex: 1,
  },
  {
    field: 'username',
    headerName: 'User Name',
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
  },
  {
    field: 'roles',
    headerName: 'Role',
    sortable: false,
    filterable: false,
    renderCell: (p) => (
      formatterUtils.userRole(p.value)
    ),
    flex: 1,
  },
];

export const defaultSortModel = [{
  field: 'id',
  sort: 'asc',
}];
