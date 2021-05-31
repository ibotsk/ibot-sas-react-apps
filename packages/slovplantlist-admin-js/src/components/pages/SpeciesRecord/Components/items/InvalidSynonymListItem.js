import React from 'react';

import PropTypes from 'prop-types';
import SynonymType from 'components/propTypes/synonym';

import {
  LosName, MUISynonymListItem, ConvertButton,
} from '@ibot/components';

import config from 'config/config';

const InvalidSynonymListItem = ({
  rowId,
  data,
  onChangeToNomenclatoric,
  onChangeToTaxonomic,
  editable = true,
}) => {
  const Additions = () => (
    <>
      {
        onChangeToNomenclatoric
        && (
          <ConvertButton
            onClick={() => onChangeToNomenclatoric(rowId)}
            title="Change to nomenclatoric synonym"
          >
            {config.mappings.synonym.nomenclatoric.prefix}
          </ConvertButton>
        )
      }
      &nbsp;
      {
        onChangeToTaxonomic
        && (
          <ConvertButton
            onClick={() => onChangeToTaxonomic(rowId)}
            title="Change to taxonomic synonym"
          >
            {config.mappings.synonym.taxonomic.prefix}
          </ConvertButton>
        )
      }
    </>
  );
  return (
    <MUISynonymListItem
      editable={editable}
      data={data}
      nameComponent={(props) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <LosName {...props} />
      )}
      prefix={config.mappings.synonym.invalid.prefix}
      additions={Additions}
    />
  );
};

export default InvalidSynonymListItem;

InvalidSynonymListItem.propTypes = {
  rowId: PropTypes.number.isRequired,
  data: SynonymType.type.isRequired,
  onChangeToNomenclatoric: PropTypes.func,
  onChangeToTaxonomic: PropTypes.func,
  editable: PropTypes.bool,
};

InvalidSynonymListItem.defaultProps = {
  onChangeToNomenclatoric: undefined,
  onChangeToTaxonomic: undefined,
  editable: true,
};
