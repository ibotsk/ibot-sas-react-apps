import React from 'react';

import PropTypes from 'prop-types';
import SynonymType from 'components/propTypes/synonym';

import { LosName, SynonymListItem } from '@ibot/components';

import config from 'config/config';

const OtherSynonymListItem = ({
  data,
  editable = true,
}) => (
  <SynonymListItem
    editable={editable}
    data={data}
    nameComponent={(props) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <LosName {...props} />
    )}
    prefix={config.mappings.synonym.none.prefix}
  />
);

export default OtherSynonymListItem;

OtherSynonymListItem.propTypes = {
  data: SynonymType.type.isRequired,
  editable: PropTypes.bool,
};
OtherSynonymListItem.defaultProps = {
  editable: true,
};
