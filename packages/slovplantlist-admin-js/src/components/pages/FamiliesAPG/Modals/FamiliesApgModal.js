/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
  DialogTitle, DialogContent, DialogActions,
  Button,
} from '@material-ui/core';

import PropTypes from 'prop-types';

import {
  AdminEditDialog,
  AdminTextField, AdminTimestampCheck, AdminDeleteToolbar, DividerSpaced,
} from '@ibot/components';

import { notifications } from 'utils';
import { format } from '@ibot/utils';

import { familiesFacade } from 'facades';

const FamiliesApgModal = ({ id, show, onHide }) => {
  const [name, setName] = useState('');
  const [vernacular, setVernacular] = useState('');
  const [checkedTimestamp, setCheckedTimestamp] = useState('');
  const [checkedBy, setCheckedBy] = useState('');

  const accessToken = useSelector((state) => state.authentication.accessToken);
  const username = useSelector((state) => state.user.username);

  const handleEnter = useCallback(() => {
    const fetch = async () => {
      if (id) {
        const data = await familiesFacade.getFamilyApgByIdCurated(
          id, accessToken,
        );
        setName(data.name);
        setVernacular(data.vernacular);
        setCheckedTimestamp(data.checkedTimestamp);
        setCheckedBy(data.checkedBy);
      }
    };

    fetch();
  }, [id, accessToken]);

  const isFamilyApgInvalid = () => {
    const is = !name && name.length === 0;
    return {
      result: is,
      props: {
        error: is,
        helperText: (is ? 'Must not be empty' : undefined),
      },
    };
  };

  const handleHide = () => {
    setName('');
    setVernacular('');
    setCheckedBy('');
    setCheckedTimestamp('');
    onHide();
  };

  const handleCheck = () => {
    setCheckedTimestamp(format.timestampISO());
    setCheckedBy(username);
  };

  const handleSave = async () => {
    if (!isFamilyApgInvalid().result) {
      try {
        const data = {
          id, name, vernacular, checkedBy, checkedTimestamp,
        };
        await familiesFacade.saveFamilyApg(data, accessToken);
        notifications.success('Saved');
        handleHide();
      } catch (error) {
        notifications.error('Error saving');
        throw error;
      }
    } else {
      notifications.error('Family name must not be empty!');
    }
  };

  const handleDelete = async () => {
    try {
      await familiesFacade.deleteFamilyApg(id, accessToken);
      notifications.success('Deleted');
      handleHide();
    } catch (error) {
      notifications.error('Error while deleting');
      throw error;
    }
  };

  return (
    <AdminEditDialog
      open={show}
      onEnter={handleEnter}
      onClose={handleHide}
      aria-labelledby="genus-dialog"
    >
      <DialogTitle id="family-dialog-title">
        {id
          ? `Edit family APG - ID ${id} - ${name}`
          : 'Create new family APG'}
      </DialogTitle>
      <DialogContent dividers>
        <AdminDeleteToolbar
          recordId={id}
          onDelete={handleDelete}
        />
        <AdminTextField
          fullWidth
          id="name"
          label="Name"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
          {...(isFamilyApgInvalid().props)}
        />
        <AdminTextField
          fullWidth
          id="vernacular"
          label="Vernacular"
          value={vernacular || ''}
          onChange={(e) => setVernacular(e.target.value)}
        />
        <DividerSpaced />
        <AdminTimestampCheck
          isChecked={!!checkedTimestamp}
          checkedTimestamp={checkedTimestamp}
          checkedBy={checkedBy}
          onCheck={handleCheck}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleHide}>Close</Button>
        <Button color="primary" onClick={handleSave}>
          Save changes
        </Button>
      </DialogActions>
    </AdminEditDialog>
  );
};

export default FamiliesApgModal;

FamiliesApgModal.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

FamiliesApgModal.defaultProps = {
  id: undefined,
};
