/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';

import AdminTextField from './AdminTextField';

/**
 * Single select.
 * Options and value must be in format { id: "", label: ""}
 *
 * @param {*} param0
 * @returns
 */
const AdminAutocompleteAsync = ({
  loading = false, label, ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => (
        !(value.label) || option.label === value.label
      )}
      getOptionLabel={(option) => (
        (option && option.label) ? option.label : ''
      )}
      blurOnSelect
      selectOnFocus
      handleHomeEndKeys
      renderInput={(params) => (
        <AdminTextField
          {...params}
          label={label}
          helperText="Start typing and select a value from the list"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <div>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </div>
            ),
          }}
        />
      )}
      {...props}
    />
  );
};

export default AdminAutocompleteAsync;

AdminAutocompleteAsync.propTypes = {
  loading: PropTypes.bool,
  label: PropTypes.string,
};
AdminAutocompleteAsync.defaultProps = {
  loading: false,
  label: undefined,
};
