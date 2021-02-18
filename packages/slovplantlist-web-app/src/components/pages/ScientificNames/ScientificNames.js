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
  key: i,
  id: 1,
  status: 'Accepted',
  name: `${i} Lorem ipsum`,
  accepted: `${i} Nulla pulvinar`,
}));

const getCount = () => rows.length;
const getData = (limit, offset) => rows.slice(offset, offset + limit);

const ScientificNames = () => (
  <>
    <Title>Scientific Names</Title>
    <ResultsTable
      columns={columns}
      keyField="key"
      getData={getData}
      getTotalCount={getCount}
    />
  </>
);

export default ScientificNames;
