import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import SynonymType from 'components/propTypes/synonym';

import {
  AdminTextField, LosName, MUISynonymListItem,
} from '@ibot/components';

import config from 'config/config';

const useStyles = makeStyles(() => ({
  authorInput: {
    '& .MuiInputBase-input': {
      fontSize: 'small',
      height: '0.8em',
    },
  },
}));

const MisidentifiedSynonymListItem = ({
  rowId,
  onChangeAuthor,
  data,
  editable = true,
}) => {
  const classes = useStyles();
  const { misidentificationAuthor } = data;

  return (
    <MUISynonymListItem
      editable={editable}
      data={data}
      nameComponent={(props) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <LosName {...props} />
      )}
      prefix={config.mappings.synonym.misidentification.prefix}
    >
      <AdminTextField
        className={classes.authorInput}
        label="Misidentification Author"
        value={misidentificationAuthor || ''}
        onChange={(e) => onChangeAuthor(rowId, e.target.value)}
      />
    </MUISynonymListItem>
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
