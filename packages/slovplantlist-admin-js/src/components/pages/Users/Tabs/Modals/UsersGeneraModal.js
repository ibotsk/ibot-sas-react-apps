import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Button,
  DialogTitle, DialogActions, DialogContent,
} from '@material-ui/core';
import {
  AdminEditDialog, AdminAddableList,
} from '@ibot/components';

import PropTypes from 'prop-types';
import UserType from 'components/propTypes/user';

import { notifications } from 'utils';

import {
  genusFacade,
  usersFacade,
  usersGeneraFacade,
} from 'facades';

import UserGenusListItem from './items/UserGenusListItem';

const genusFormat = (g) => ({ id: g.id, label: g.name });
const genusCompare = (g1, g2) => g1.label.localeCompare(g2.label);

const searchGenusByTerm = (query, accessToken) => (
  genusFacade.getAllGeneraBySearchTerm(
    query, accessToken, (g) => ({
      id: g.id,
      label: g.name,
    }),
  )
);

const UsersGeneraModal = ({ user = {}, show, onHide }) => {
  const [userGenera, setUserGenera] = useState([]);

  const accessToken = useSelector((state) => state.authentication.accessToken);

  const userId = user.id;

  const handleEnter = useCallback(() => {
    const fetch = async () => {
      if (userId) {
        const ug = await usersFacade.getGeneraOfUser(
          userId, accessToken, genusFormat,
        );
        ug.sort(genusCompare);
        setUserGenera(ug);
      }
    };

    fetch();
  }, [userId, accessToken]);

  const handleAddGenus = (selected) => {
    const newUserGenera = [...userGenera];
    newUserGenera.push(selected);
    newUserGenera.sort(genusCompare);
    setUserGenera(newUserGenera);
  };

  const handleRemoveGenus = (rowId) => {
    const newGenera = userGenera.filter((_, i) => i !== rowId);
    setUserGenera(newGenera);
  };

  const handleHide = () => {
    setUserGenera([]);
    onHide();
  };

  const handleSave = async () => {
    try {
      await usersGeneraFacade.saveUserGenera(
        user.id,
        userGenera,
        accessToken,
      );
      notifications.success('Saved');
      handleHide();
    } catch (error) {
      notifications.error('Error saving');
      throw error;
    }
  };

  return (
    <AdminEditDialog
      open={show}
      onEnter={handleEnter}
      onClose={handleHide}
      aria-labelledby="users-dialog"
    >
      <DialogTitle id="users-dialog-title">
        Editing genera of user
        {' '}
        {user ? user.username : ''}
      </DialogTitle>
      <DialogContent dividers>
        <AdminAddableList
          data={userGenera}
          onSearch={searchGenusByTerm}
          onAddItemToList={handleAddGenus}
          onRowDelete={handleRemoveGenus}
          accessToken={accessToken}
          itemComponent={UserGenusListItem}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleHide}>
          Close
        </Button>
        <Button color="primary" onClick={handleSave}>
          Save changes
        </Button>
      </DialogActions>
    </AdminEditDialog>
  );
};

export default UsersGeneraModal;

UsersGeneraModal.propTypes = {
  show: PropTypes.bool.isRequired,
  user: UserType.type,
  onHide: PropTypes.func.isRequired,
};
UsersGeneraModal.defaultProps = {
  user: undefined,
};
