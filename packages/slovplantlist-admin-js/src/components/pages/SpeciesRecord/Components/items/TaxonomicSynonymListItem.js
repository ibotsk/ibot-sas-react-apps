import React from 'react';

import { Button, Glyphicon } from 'react-bootstrap';

import PropTypes from 'prop-types';
import SynonymType from 'components/propTypes/synonym';

import { LosName, SynonymListItem } from '@ibot/components';

import config from 'config/config';

// const CHECKLIST_PAGE = (id) => `/checklist/edit/${id}`;

const TaxonomicSynonymListItem = ({
  rowId,
  data,
  onRowDelete,
  onChangeToNomenclatoric,
  onChangeToInvalid,
}) => {
  const Additions = () => (
    <>
      {
        onChangeToNomenclatoric
        && (
          <Button
            bsStyle="primary"
            bsSize="xsmall"
            onClick={() => onChangeToNomenclatoric(rowId)}
            title="Change to nomenclatoric synonym"
          >
            <Glyphicon glyph="share-alt" />
            {' '}
            {config.mappings.synonym.nomenclatoric.prefix}
          </Button>
        )
      }
      &nbsp;
      {
        onChangeToInvalid
        && (
          <Button
            bsStyle="primary"
            bsSize="xsmall"
            onClick={() => onChangeToInvalid(rowId)}
            title="Change to invalid designation"
          >
            <Glyphicon glyph="share-alt" />
            {' '}
            {config.mappings.synonym.invalid.prefix}
          </Button>
        )
      }
    </>
  );
  return (
    <SynonymListItem
      rowId={rowId}
      data={data}
      nameComponent={(props) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <LosName {...props} />
      )}
      prefix={config.mappings.synonym.taxonomic.prefix}
      additions={Additions}
      showSubNomenclatoric
      onRowDelete={onRowDelete}
    />
  );
};

export default TaxonomicSynonymListItem;

TaxonomicSynonymListItem.propTypes = {
  rowId: PropTypes.number.isRequired,
  data: SynonymType.type.isRequired,
  onRowDelete: PropTypes.func.isRequired,
  onChangeToNomenclatoric: PropTypes.func,
  onChangeToInvalid: PropTypes.func,
};

TaxonomicSynonymListItem.defaultProps = {
  onChangeToNomenclatoric: undefined,
  onChangeToInvalid: undefined,
};
