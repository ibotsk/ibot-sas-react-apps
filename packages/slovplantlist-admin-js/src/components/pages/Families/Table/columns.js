import React from 'react';
import Can from 'components/segments/auth/Can';
import Button from '@material-ui/core/Button';

import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

export const columns = (role, handleShowModal) => [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.8,
  },
  {
    field: 'action',
    headerName: 'Actions',
    flex: 1,
    renderCell: (p) => (
      <Can
        role={role}
        perform="family:edit"
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
    flex: 1,
    renderCell: (p) => (p.value ? (
      <DoneIcon />
    ) : (
      <ClearIcon />
    )),
    sortable: false,
    filterable: false,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 2,
    sort: 'asc',
  },
  {
    field: 'vernacular',
    headerName: 'Vernacular',
    flex: 2,
  },
];

export const defaultSortModel = [{
  field: 'name',
  sort: 'asc',
}];
