import React from 'react';

import Title from '../../segments/Common/Title';
import ResultsTable from '../../segments/Common/ResultsTable';

const columns = [
  {
    dataField: 'name',
    text: 'Name',
  },
  {
    dataField: 'status',
    text: 'Status',
  },
  {
    dataField: 'accepted',
    text: 'Accepted name',
  },
];

/* temporary fetching */
const rows = [...Array(70).keys()].map((i) => ({
  id: i,
  status: 'Accepted',
  name: 'Lorem ipsum',
  accepted: 'Lorem ipsum',
}));

const getCount = () => rows.length;
const getData = (limit, offset) => rows.slice(offset, offset + limit);

const ScientificNames = () => (
  <>
    <Title>Scientific Names</Title>
    <ResultsTable
      columns={columns}
      keyField="id"
      getData={getData}
      getTotalCount={getCount}
    />
  </>
);

export default ScientificNames;
