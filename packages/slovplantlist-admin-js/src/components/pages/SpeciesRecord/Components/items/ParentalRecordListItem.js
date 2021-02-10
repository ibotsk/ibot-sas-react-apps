import React from 'react';

import PropTypes from 'prop-types';
import SynonymType from 'components/propTypes/synonym';

import { LosName, SynonymListItem } from '@ibot/components';

import config from 'config/config';

const CHECKLIST_PAGE = (id) => `/checklist/edit/${id}`;

const ParentalCombinationListItem = ({
  rowId,
  data,
  onRowDelete,
}) => (
  <SynonymListItem
    rowId={rowId}
    data={data}
    nameComponent={(props) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <LosName {...props} uri={CHECKLIST_PAGE(props.data.id)} />
    )}
    prefix={config.mappings.synonym.parent.prefix}
    onRowDelete={onRowDelete}
  />
);

export default ParentalCombinationListItem;

ParentalCombinationListItem.propTypes = {
  rowId: PropTypes.number.isRequired,
  data: SynonymType.type.isRequired,
  onRowDelete: PropTypes.func.isRequired,
};
