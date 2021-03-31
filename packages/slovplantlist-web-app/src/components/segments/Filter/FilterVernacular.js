import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

import FilterTemplate from './FilterTemplate';
import ListItemTextField from './Components/ListItemTextField';

const FilterVernacular = ({
  closed, onSearch,
}) => {
  const { t } = useTranslation();
  const [vernacular, setVernacular] = useState('');

  const handleSearch = (templateValues) => (
    onSearch({
      ...templateValues,
      vernacular,
    })
  );
  const handleReset = () => {
    setVernacular('');
  };

  return (
    <FilterTemplate
      closed={closed}
      onSearch={handleSearch}
      onReset={handleReset}
    >
      <ListItemTextField
        id="vernacular"
        key="vernacular"
        label={t('Vernacular')}
        value={vernacular}
        onChange={(e) => setVernacular(e.target.value)}
      />
    </FilterTemplate>
  );
};

export default FilterVernacular;

FilterVernacular.propTypes = {
  closed: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
};
