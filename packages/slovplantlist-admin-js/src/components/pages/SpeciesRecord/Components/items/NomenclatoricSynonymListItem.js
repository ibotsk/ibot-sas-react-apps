import React from 'react';

import PropTypes from 'prop-types';
import SynonymType from 'components/propTypes/synonym';

import {
  LosName, MUISynonymListItem, ConvertButton,
} from '@ibot/components';

import config from 'config/config';

// const CHECKLIST_PAGE = (id) => `/checklist/edit/${id}`;

const NomenclatoricSynonymListItem = ({
  rowId,
  data,
  onChangeToTaxonomic,
  onChangeToInvalid,
}) => {
  const Additions = () => (
    <>
      {
        onChangeToTaxonomic && (
          <ConvertButton
            onClick={() => onChangeToTaxonomic(rowId)}
            title="Change to taxonomic synonym"
          >
            {config.mappings.synonym.taxonomic.prefix}
          </ConvertButton>
        )
      }
      {
        onChangeToInvalid && (
          <ConvertButton
            edge="end"
            onClick={() => onChangeToInvalid(rowId)}
            title="Change to invalid designation"
          >
            {config.mappings.synonym.invalid.prefix}
          </ConvertButton>
        )
      }
    </>
  );
  return (
    <MUISynonymListItem
      data={data}
      nameComponent={(props) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <LosName {...props} />
      )}
      prefix={config.mappings.synonym.nomenclatoric.prefix}
      additions={Additions}
      showSubNomenclatoric
    />
  );
};

export default NomenclatoricSynonymListItem;

NomenclatoricSynonymListItem.propTypes = {
  rowId: PropTypes.number.isRequired,
  data: SynonymType.type.isRequired,
  onChangeToTaxonomic: PropTypes.func,
  onChangeToInvalid: PropTypes.func,
};

NomenclatoricSynonymListItem.defaultProps = {
  onChangeToTaxonomic: undefined,
  onChangeToInvalid: undefined,
};
