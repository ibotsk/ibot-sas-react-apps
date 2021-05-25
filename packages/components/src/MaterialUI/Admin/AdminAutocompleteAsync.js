/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

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
      {...props}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => (
        !value.label || option.label === value.label
      )}
      getOptionLabel={(option) => (
        option ? option.label : ''
      )}
      renderInput={(params) => (
        <AdminTextField
          {...params}
          label={label}
          helperText="Start typing and select a value from the list"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
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
