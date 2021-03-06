import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

import config from 'config';

import FilterTemplate from './FilterTemplate';
import ListItemTextField from './Components/ListItemTextField';

const { routes } = config;

const FilterScientific = ({
  closed, onSearch,
}) => {
  const { t } = useTranslation();
  const [genus, setGenus] = useState('');
  const [species, setSpecies] = useState('');
  const [infraspecific, setInfraspecific] = useState('');

  const handleSearch = (templateValues) => (
    onSearch(
      {
        ...templateValues,
        genus,
        species,
        infraspecific,
      },
      routes.scientificNames.route,
    )
  );

  const handleValidate = () => (
    [genus, species, infraspecific].filter((e) => !!e).length
  );

  const handleReset = () => {
    setGenus('');
    setSpecies('');
    setInfraspecific('');
  };

  return (
    <FilterTemplate
      closed={closed}
      onSearch={handleSearch}
      onReset={handleReset}
      onValidate={handleValidate}
    >
      <ListItemTextField
        id="genus"
        key="genus"
        label={t('Genus')}
        value={genus}
        onChange={(e) => setGenus(e.target.value)}
      />
      <ListItemTextField
        id="species"
        key="species"
        label={t('Species')}
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
      />
      <ListItemTextField
        id="infraspecific"
        key="infraspecific"
        label={t('Infraspecific')}
        value={infraspecific}
        onChange={(e) => setInfraspecific(e.target.value)}
      />
    </FilterTemplate>
  );
};

export default FilterScientific;

FilterScientific.propTypes = {
  closed: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
};
