import React from 'react';

import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import config from 'config';

import TitledSection from './Components/TitledSection';
import {
  SynonymListItemBasic,
  SynonymListItemMisidentification,
} from './Components/SynonymListItems';
import SynonymList from './Components/SynonymList';

const {
  synonyms: synonymsConfig,
} = config;

const NameDetailAccepted = ({
  invalidDesignations = [],
  misidentifications = [],
}) => {
  const { t } = useTranslation();
  return (
    <>
      {invalidDesignations.length > 0 && (
        <TitledSection title={t('Invalid designations')}>
          <SynonymList
            syntype={synonymsConfig.invalid.syntype}
            synonyms={invalidDesignations}
            item={SynonymListItemBasic}
          />
        </TitledSection>
      )}
      {misidentifications.length > 0 && (
        <TitledSection title={t('Misidentifications')}>
          <SynonymList
            syntype={synonymsConfig.misidentification.syntype}
            synonyms={misidentifications}
            item={SynonymListItemMisidentification}
          />
        </TitledSection>
      )}
    </>
  );
};

export default NameDetailAccepted;

NameDetailAccepted.propTypes = {
  invalidDesignations: PropTypes.arrayOf(PropTypes.object),
  misidentifications: PropTypes.arrayOf(PropTypes.object),
};
NameDetailAccepted.defaultProps = {
  invalidDesignations: [],
  misidentifications: [],
};
