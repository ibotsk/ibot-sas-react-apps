import React from 'react';

import PropTypes from 'prop-types';
import SynonymType from 'components/propTypes/synonym';

import { LosName, SynonymListItem } from '@ibot/components';

import config from 'config/config';

// const CHECKLIST_PAGE = (id) => `/checklist/edit/${id}`;

const OtherSynonymListItem = ({
  rowId,
  data,
  onRowDelete,
}) => (
  <SynonymListItem
    rowId={rowId}
    data={data}
    nameComponent={(props) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <LosName {...props} />
    )}
    prefix={config.mappings.synonym.none.prefix}
    onRowDelete={onRowDelete}
  />
);

export default OtherSynonymListItem;

OtherSynonymListItem.propTypes = {
  rowId: PropTypes.number.isRequired,
  data: SynonymType.type.isRequired,
  onRowDelete: PropTypes.func.isRequired,
};
