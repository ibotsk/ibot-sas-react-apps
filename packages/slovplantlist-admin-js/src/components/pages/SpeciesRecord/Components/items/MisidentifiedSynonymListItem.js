import React from 'react';

import PropTypes from 'prop-types';
import SynonymType from 'components/propTypes/synonym';

import { AdminTextField, LosName, SynonymListItem } from '@ibot/components';

import config from 'config/config';

// const CHECKLIST_PAGE = (id) => `/checklist/edit/${id}`;

const MisidentifiedSynonymListItem = ({
  rowId,
  onChangeAuthor,
  data,
  editable = true,
}) => {
  const { misidentificationAuthor } = data;
  return (
    <SynonymListItem
      editable={editable}
      data={data}
      nameComponent={(props) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <LosName {...props} />
      )}
      prefix={config.mappings.synonym.misidentification.prefix}
    >
      <AdminTextField
        label="Misidentification Author"
        value={misidentificationAuthor || ''}
        onChange={(e) => onChangeAuthor(rowId, e.target.value)}
      />
    </SynonymListItem>
  );
};

export default MisidentifiedSynonymListItem;

MisidentifiedSynonymListItem.propTypes = {
  rowId: PropTypes.number.isRequired,
  data: SynonymType.type.isRequired,
  onChangeAuthor: PropTypes.func.isRequired,
  editable: PropTypes.bool,
};
MisidentifiedSynonymListItem.defaultProps = {
  editable: true,
};
