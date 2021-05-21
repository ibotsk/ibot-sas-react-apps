import React from 'react';

import {
  ControlLabel, FormControl, FormGroup, Col,
} from 'react-bootstrap';

import PropTypes from 'prop-types';
import SynonymType from 'components/propTypes/synonym';

import { LosName, SynonymListItem } from '@ibot/components';

import config from 'config/config';

// const CHECKLIST_PAGE = (id) => `/checklist/edit/${id}`;

const MisidentifiedSynonymListItem = ({
  rowId,
  onChangeAuthor,
  data,
  onRowDelete,
  editable = true,
}) => {
  const { misidentificationAuthor } = data;
  return (
    <SynonymListItem
      editable={editable}
      rowId={rowId}
      data={data}
      nameComponent={(props) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <LosName {...props} />
      )}
      prefix={config.mappings.synonym.misidentification.prefix}
      onRowDelete={onRowDelete}
    >
      <FormGroup bsSize="sm">
        <Col componentClass={ControlLabel} sm={2}>
          Author:
        </Col>
        <Col xs={8}>
          <FormControl
            type="text"
            value={misidentificationAuthor || ''}
            placeholder="Misidentification Author"
            onChange={(e) => onChangeAuthor(rowId, e.target.value)}
          />
        </Col>
      </FormGroup>
    </SynonymListItem>
  );
};

export default MisidentifiedSynonymListItem;

MisidentifiedSynonymListItem.propTypes = {
  rowId: PropTypes.number.isRequired,
  data: SynonymType.type.isRequired,
  onRowDelete: PropTypes.func.isRequired,
  onChangeAuthor: PropTypes.func.isRequired,
  editable: PropTypes.bool,
};
MisidentifiedSynonymListItem.defaultProps = {
  editable: true,
};
