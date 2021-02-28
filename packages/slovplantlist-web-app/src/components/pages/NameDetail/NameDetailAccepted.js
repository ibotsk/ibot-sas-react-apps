import React from 'react';

import PropTypes from 'prop-types';

import { Divider } from '@material-ui/core';

import TitledSection from './Components/TitledSection';
import {
  SynonymListItemBasic,
  SynonymListItemMisidentification,
} from './Components/SynonymListItems';
import SynonymList from './Components/SynonymList';

import config from '../../../config';

const {
  synonyms: synonymsConfig,
} = config;

const NameDetailAccepted = ({
  synonymsNomenclatoric = [],
  synonymsTaxonomic = [],
  synonymsOthers = [],
  invalidDesignations = [],
  misidentifications = [],
}) => (
  <>
    <TitledSection title="Synonyms">
      <SynonymList
        syntype={synonymsConfig.nomenclatoric.syntype}
        synonyms={synonymsNomenclatoric}
        item={SynonymListItemBasic}
      />
      {(synonymsNomenclatoric.length > 0 && synonymsTaxonomic.length > 0) && (
        <Divider />
      )}
      <SynonymList
        syntype={synonymsConfig.taxonomic.syntype}
        synonyms={synonymsTaxonomic}
        item={SynonymListItemBasic}
      />
      {(synonymsTaxonomic.length > 0 && synonymsOthers.length > 0) && (
        <Divider />
      )}
      <SynonymList
        syntype={synonymsConfig.other.syntype}
        synonyms={synonymsOthers}
        item={SynonymListItemBasic}
      />
    </TitledSection>
    {invalidDesignations.length > 0 && (
      <TitledSection title="Invalid designations">
        <SynonymList
          syntype={synonymsConfig.invalid.syntype}
          synonyms={invalidDesignations}
          item={SynonymListItemBasic}
        />
      </TitledSection>
    )}
    {misidentifications.length > 0 && (
      <TitledSection title="Misidentifications">
        <SynonymList
          syntype={synonymsConfig.misidentification.syntype}
          synonyms={misidentifications}
          item={SynonymListItemMisidentification}
        />
      </TitledSection>
    )}
  </>
);

export default NameDetailAccepted;

NameDetailAccepted.propTypes = {
  synonymsNomenclatoric: PropTypes.arrayOf(PropTypes.object),
  synonymsTaxonomic: PropTypes.arrayOf(PropTypes.object),
  synonymsOthers: PropTypes.arrayOf(PropTypes.object),
  invalidDesignations: PropTypes.arrayOf(PropTypes.object),
  misidentifications: PropTypes.arrayOf(PropTypes.object),
};
NameDetailAccepted.defaultProps = {
  synonymsNomenclatoric: [],
  synonymsTaxonomic: [],
  synonymsOthers: [],
  invalidDesignations: [],
  misidentifications: [],
};
