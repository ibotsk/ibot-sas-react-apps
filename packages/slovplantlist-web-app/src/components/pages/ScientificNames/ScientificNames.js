import React, { useMemo, useState } from 'react';
import { generatePath, Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { hooks } from '@ibot/core';
import { LosName } from '@ibot/components';

import Title from '../../segments/Common/Title';
import ResultsTable from '../../segments/Common/ResultsTable';

import { searchService } from '../../../services';
import config from '../../../config';

const {
  pagination: paginationConfig,
  status: statusConfig,
  routes: routesConfig,
} = config;

const columns = [
  {
    dataField: 'id',
    text: 'ID',
    hidden: true,
  },
  {
    dataField: 'name',
    text: 'Name',
    formatter: (cell, row) => (
      <LosName
        data={row}
        format="italic"
        component={RouterLink}
        to={generatePath(routesConfig.nameDetail.route, { id: row.id })}
      />
    ),
  },
  {
    dataField: 'status',
    text: 'Status',
    formatter: (cell) => (statusConfig[cell] ? statusConfig[cell].text : cell),
  },
  {
    dataField: 'accepted',
    text: 'Accepted name',
    formatter: (cell, row) => {
      if (!row.acceptedNames) {
        return undefined;
      }
      return row.acceptedNames.map((an, i) => [
        i > 0 && ', ',
        <LosName
          key={an.id}
          data={an}
          format="italic"
          component={RouterLink}
          to={generatePath(routesConfig.nameDetail.route, { id: an.id })}
        />,
      ]);
    },
    align: 'right',
  },
];

const ScientificNames = ({
  searchValues = {},
}) => {
  const {
    genus, species, infraspecific, status,
  } = searchValues;

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(
    paginationConfig.rowsPerPageOptions[0],
  );

  const getData = useMemo(() => (
    (pg, rppg) => (
      searchService.searchScientific(
        genus, species, infraspecific, status, { page: pg, rowsPerPage: rppg },
      )
    )
  ), [genus, species, infraspecific, status]);

  const { data: results } = hooks.useData(
    getData, page, rowsPerPage,
  );

  const handleTableChanged = ({ page: pg, rowsPerPage: rppg }) => {
    setPage(pg + 1);
    setRowsPerPage(rppg);
  };

  if (!results) {
    return (
      <>
        <Title>Scientific Names</Title>
        <Typography color="textSecondary" variant="h6" component="span">
          Use search fields to display results
        </Typography>
      </>
    );
  }

  return (
    <>
      <Title>Scientific Names</Title>
      {results
        && (
          <ResultsTable
            columns={columns}
            keyField="id"
            data={results.data}
            totalSize={results.totalRecords}
            onTableChanged={handleTableChanged}
            pagination={{ page: page - 1, rowsPerPage }}
          />
        )
      }
    </>
  );
};

export default ScientificNames;

ScientificNames.propTypes = {
  searchValues: PropTypes.shape({
    genus: PropTypes.string,
    species: PropTypes.string,
    infraspecific: PropTypes.string,
    status: PropTypes.arrayOf(PropTypes.string),
  }),
};

ScientificNames.defaultProps = {
  searchValues: {},
};
