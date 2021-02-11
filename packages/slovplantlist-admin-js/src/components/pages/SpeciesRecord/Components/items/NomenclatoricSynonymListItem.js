import React from 'react';

import { Button, Glyphicon } from 'react-bootstrap';

import PropTypes from 'prop-types';
import SynonymType from 'components/propTypes/synonym';

import { LosName, SynonymListItem } from '@ibot/components';

import config from 'config/config';

const CHECKLIST_PAGE = (id) => `/checklist/edit/${id}`;

const NomenclatoricSynonymListItem = ({
  rowId,
  data,
  onRowDelete,
  onChangeToTaxonomic,
  onChangeToInvalid,
}) => {
  const Additions = () => (
    <>
      {onChangeToTaxonomic
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
        <LosName {...props} uri={CHECKLIST_PAGE(props.data.id)} />
      )}
      prefix={config.mappings.synonym.nomenclatoric.prefix}
      additions={Additions}
      showSubNomenclatoric
      onRowDelete={onRowDelete}
    />
  );
};

export default NomenclatoricSynonymListItem;

NomenclatoricSynonymListItem.propTypes = {
  rowId: PropTypes.number.isRequired,
  data: SynonymType.type.isRequired,
  onRowDelete: PropTypes.func.isRequired,
  onChangeToTaxonomic: PropTypes.func,
  onChangeToInvalid: PropTypes.func,
};

NomenclatoricSynonymListItem.defaultProps = {
  onChangeToTaxonomic: undefined,
  onChangeToInvalid: undefined,
};
