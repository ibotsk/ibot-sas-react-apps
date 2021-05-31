/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import {
  Box,
  List, ListItem, ListItemIcon,
  CircularProgress, Divider, IconButton,
  InputAdornment,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Done as DoneIcon,
  RemoveCircleOutline as RemoveIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import { hooks } from '@ibot/core';

import AdminAutocompleteAsync from './AdminAutocompleteAsync';
import AdminTextField from './AdminTextField';

const useStyles = makeStyles((theme) => ({
  listItemRoot: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(1) + 1,
    paddingRight: theme.spacing(1) + 1,
  },
  addIcon: {
    color: theme.palette.success.main,
  },
  addButtonBox: {
    paddingLeft: theme.spacing(1) - 3,
  },
  removeIcon: {
    color: theme.palette.error.main,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const AdminAddableList = ({
  id,
  data = [],
  // options: propsOptions = [],
  onSearch,
  onAddItemToList,
  onRowDelete,
  getRowId,
  itemComponent: ListRowItem,
  accessToken = '', // pass when onSearch function requires it
  optionsLabelKey,
  renderMenu,
  ...itemSpecificProps
}) => {
  const classes = useStyles();
  const [inputOpen, setInputOpen] = useState(false);

  const {
    selected,
    options,
    loading,
    handleChange,
    handleFetch,
  } = hooks.useAsyncAutocomplete(onSearch, accessToken);

  const handleAddItem = () => {
    if (selected && selected.id) {
      onAddItemToList(selected);
      handleChange();
    }
    setInputOpen(false);
  };

  return (
    <div>
      <List disablePadding dense>
        {
          data.map((d, index) => {
            const rowId = getRowId ? getRowId(d) : index;
            return (
              <ListItem
                className={classes.listItemRoot}
                key={rowId}
                divider={index < data.length - 1}
              >
                <ListItemIcon>
                  <IconButton
                    edge="start"
                    size="small"
                    className={classes.removeIcon}
                    onClick={() => onRowDelete(rowId)}
                    title="Remove item"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Divider orientation="vertical" className={classes.divider} />
                </ListItemIcon>
                <ListRowItem
                  rowId={rowId}
                  data={d}
                  {...itemSpecificProps}
                />
              </ListItem>
            );
          })
        }
      </List>
      {
        inputOpen ? (
          <AdminAutocompleteAsync
            id={id}
            options={options}
            value={selected}
            loading={loading}
            onChange={handleChange}
            onInputChange={handleFetch}
            renderInput={(params) => (
              <AdminTextField
                {...params}
                className={classes.inputRoot}
                label="Add to list"
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
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        size="small"
                        className={classes.addIcon}
                        onClick={handleAddItem}
                        title="Confirm add"
                      >
                        <DoneIcon />
                      </IconButton>
                      <Divider orientation="vertical" className={classes.divider} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        ) : (
          <div>
            {
              data && data.length > 0 && (
                <Divider />
              )
            }
            <Box className={classes.addButtonBox}>
              <IconButton
                size="small"
                onClick={() => setInputOpen(true)}
                title="Add item"
              >
                <AddIcon />
              </IconButton>
            </Box>
          </div>
        )}
    </div>
  );
};

export default AdminAddableList;

AdminAddableList.propTypes = {
  id: PropTypes.string,
  optionsLabelKey: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
  // options: PropTypes.arrayOf(PropTypes.object),
  itemComponent: PropTypes.func.isRequired,
  renderMenu: PropTypes.func,
  getRowId: PropTypes.func,
  onAddItemToList: PropTypes.func.isRequired,
  onRowDelete: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  async: PropTypes.bool,
  accessToken: PropTypes.string,
};

AdminAddableList.defaultProps = {
  id: undefined,
  optionsLabelKey: 'label',
  data: [],
  // options: undefined,
  async: false,
  onSearch: undefined,
  renderMenu: undefined,
  getRowId: undefined,
  accessToken: '',
};
