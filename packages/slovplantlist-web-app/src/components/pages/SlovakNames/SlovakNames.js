import React from 'react';

import { PageTitle } from '@ibot/components';

import { useTranslation } from 'react-i18next';

import Title from 'components/segments/Common/Title';
// import ResultsTable from 'components/segments/Common/ResultsTable';

// const columns = [
//   {
//     dataField: 'vernacular',
//     text: 'Slovak name',
//   },
//   {
//     dataField: 'name',
//     text: 'Scientific name',
//   },
// ];

const SlovakNames = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle
        websiteTitle="Slovplantlist"
        title={t('Search slovak names')}
      />
      <Title>Slovak Names</Title>
    </>
  );
};

export default SlovakNames;
