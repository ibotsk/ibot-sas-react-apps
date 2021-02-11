import React from 'react';

import { Button, Glyphicon } from 'react-bootstrap';

import PropTypes from 'prop-types';
import SynonymType from 'components/propTypes/synonym';

import { LosName, SynonymListItem } from '@ibot/components';

import config from 'config/config';

const CHECKLIST_PAGE = (id) => `/checklist/edit/${id}`;

const InvalidSynonymListItem = ({
  rowId,
  data,
  onRowDelete,
  onChangeToNomenclatoric,
  onChangeToTaxonomic,
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
        onChangeToTaxonomic
        && (
          <Button
            bsStyle="primary"
            bsSize="xsmall"
            onClick={() => onChangeToTaxonomic(rowId)}
            title="Change to taxonomic synonym"
          >
            <Glyphicon glyph="share-alt" />
            {' '}
            {config.mappings.synonym.taxonomic.prefix}
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
        <LosName {...props} uri={CHECKLIST_PAGE(props.data.id)} />
      )}
      prefix={config.mappings.synonym.invalid.prefix}
      additions={Additions}
      onRowDelete={onRowDelete}
    />
  );
};

export default InvalidSynonymListItem;

InvalidSynonymListItem.propTypes = {
  rowId: PropTypes.number.isRequired,
  data: SynonymType.type.isRequired,
  onRowDelete: PropTypes.func.isRequired,
  onChangeToNomenclatoric: PropTypes.func,
  onChangeToTaxonomic: PropTypes.func,
};

InvalidSynonymListItem.defaultProps = {
  onChangeToNomenclatoric: undefined,
  onChangeToTaxonomic: undefined,
};
