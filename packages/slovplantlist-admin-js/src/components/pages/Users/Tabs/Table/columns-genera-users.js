import React from 'react';

import PropTypes from 'prop-types';

import {
  IconButton,
} from '@material-ui/core';
import {
  AddCircleOutline as AddIcon,
} from '@material-ui/icons';

import GeneraList from 'components/segments/GeneraList';

const GenusButtonAddEdit = ({ onClick }) => (
  <IconButton
    aria-label="add or edit"
    size="small"
    onClick={onClick}
    title="Add or edit"
  >
    <AddIcon />
  </IconButton>
);

export const columns = (handleShowModal) => [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
  },
  {
    field: 'username',
    headerName: 'User Name',
    flex: 1,
  },
  {
    field: 'genera',
    headerName: 'Assigned Genera',
    renderCell: (p) => (
      <>
        <GeneraList data={p.value} />
        <GenusButtonAddEdit onClick={() => handleShowModal(p.row.id)} />
      </>
    ),
    sortable: false,
    filterable: false,
    flex: 3,
  },
];

export const defaultSortModel = [{
  field: 'username',
  sort: 'asc',
}];

GenusButtonAddEdit.propTypes = {
  onClick: PropTypes.func.isRequired,
};
