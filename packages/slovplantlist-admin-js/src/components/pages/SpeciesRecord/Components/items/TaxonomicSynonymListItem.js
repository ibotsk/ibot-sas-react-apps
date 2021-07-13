import React from 'react';

import PropTypes from 'prop-types';
import SynonymType from 'components/propTypes/synonym';

import {
  LosName, MUISynonymListItem, ConvertButton,
} from '@ibot/components';

import config from 'config/config';

const TaxonomicSynonymListItem = ({
  rowId,
  data,
  onChangeToNomenclatoric,
  onChangeToInvalid,
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
        onChangeToInvalid
        && (
          <ConvertButton
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
      editable={editable}
      data={data}
      nameComponent={(props) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <LosName {...props} />
      )}
      prefix={config.mappings.synonym.taxonomic.prefix}
      additions={Additions}
      showSubNomenclatoric
    />
  );
};

export default TaxonomicSynonymListItem;

TaxonomicSynonymListItem.propTypes = {
  rowId: PropTypes.number.isRequired,
  data: SynonymType.type.isRequired,
  onChangeToNomenclatoric: PropTypes.func,
  onChangeToInvalid: PropTypes.func,
  editable: PropTypes.bool,
};

TaxonomicSynonymListItem.defaultProps = {
  onChangeToNomenclatoric: undefined,
  onChangeToInvalid: undefined,
  editable: true,
};
