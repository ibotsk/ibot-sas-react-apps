import React from 'react';

import Title from '../../segments/Common/Title';
import ResultsTable from '../../segments/Common/ResultsTable';

const columns = [
  {
    dataField: 'vernacular',
    text: 'Slovak name',
  },
  {
    dataField: 'name',
    text: 'Scientific name',
  },
];

/* temporary fetching */
const rows = [...Array(70).keys()].map((i) => ({
  key: i,
  id: 1,
  vernacular: `Slovenske meno ${i}`,
  name: `Nomen scientific ${i}`,
}));

const getCount = () => rows.length;
const getData = (limit, offset) => rows.slice(offset, offset + limit);

const SlovakNames = () => (
  <>
    <Title>Slovak Names</Title>
    <ResultsTable
      columns={columns}
      keyField="key"
      getData={getData}
      getTotalCount={getCount}
    />
  </>
);

export default SlovakNames;
