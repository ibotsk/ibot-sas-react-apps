import React from 'react';

import PropTypes from 'prop-types';

import { Divider } from '@material-ui/core';

import TitledSection from './Components/TitledSection';
import SynonymList from './Components/SynonymList';

const NameDetailAccepted = ({
  synonymsNomenclatoric = [],
  synonymsTaxonomic = [],
}) => (
  <>
    <TitledSection title="Synonyms">
      <SynonymList
        synonyms={synonymsNomenclatoric}
      />
      <Divider />
      <SynonymList
        synonyms={synonymsTaxonomic}
      />
    </TitledSection>
  </>
);

export default NameDetailAccepted;

NameDetailAccepted.propTypes = {
  synonymsNomenclatoric: PropTypes.arrayOf(PropTypes.object),
  synonymsTaxonomic: PropTypes.arrayOf(PropTypes.object),
};
NameDetailAccepted.defaultProps = {
  synonymsNomenclatoric: [],
  synonymsTaxonomic: [],
};
