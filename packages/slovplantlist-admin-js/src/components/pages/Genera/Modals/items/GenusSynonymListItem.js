import React from 'react';

import SynonymType from 'components/propTypes/synonym';
import GenusType from 'components/propTypes/genus';

import {
  GenusName, MUISynonymListItem,
} from '@ibot/components';

import config from 'config/config';

const GenusSynonymListItem = ({
  data,
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
  <MUISynonymListItem
    data={data}
    nameComponent={GenusName}
    prefix={config.mappings.synonym.taxonomic.prefix}
  // additions={Addition}
  />
);

export default GenusSynonymListItem;

GenusSynonymListItem.propTypes = {
  data: SynonymType.type.isRequired,
  assignedToName: GenusType.type,
};

GenusSynonymListItem.defaultProps = {
  assignedToName: undefined,
};
