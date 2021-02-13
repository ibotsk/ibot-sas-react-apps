import React from 'react';

import PropTypes from 'prop-types';
import SynonymType from 'components/propTypes/synonym';
import GenusType from 'components/propTypes/genus';

import { GenusName, SynonymListItem } from '@ibot/components';

import config from 'config/config';

const GenusSynonymListItem = ({
  rowId,
  data,
  onRowDelete,
  // eslint-disable-next-line no-unused-vars
  assignedToName = undefined,
}) => (
  // const { synonym } = data;
  // const Addition = () => (
  //   <AcceptedNameWarning
  //     currentAccepted={synonym.accepted}
  //     newAccepted={assignedToName}
  //   />
  // );
  <SynonymListItem
    rowId={rowId}
    data={data}
    nameComponent={GenusName}
    prefix={config.mappings.synonym.taxonomic.prefix}
    onRowDelete={onRowDelete}
  // additions={Addition}
  />
);

export default GenusSynonymListItem;

GenusSynonymListItem.propTypes = {
  rowId: PropTypes.number.isRequired,
  data: SynonymType.type.isRequired,
  onRowDelete: PropTypes.func.isRequired,
  assignedToName: GenusType.type,
};

GenusSynonymListItem.defaultProps = {
  assignedToName: undefined,
};
