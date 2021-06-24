import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Box, CircularProgress,
  DialogActions, DialogTitle, DialogContent, DialogContentText,
  Button, Toolbar, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  AdminEditDialog, LabelValue, CircularProgressWithLabel,
} from '@ibot/components';

import PropTypes from 'prop-types';
import { notifications } from 'utils';

import { CSVReader } from 'react-papaparse';

import { importFacade } from 'facades';
import importConfig from 'config/import';

import ImportReport from './ImportReport';

const { columns } = importConfig;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    '& > *': {
      marginRight: theme.spacing(2),
    },
  },
  green: {
    color: theme.palette.success.dark,
  },
}));

const ChecklistImportModal = ({
  show, onHide,
}) => {
  const classes = useStyles();

  const [dataToSave, setDataToSave] = useState([]);
  const [dataToSaveTotal, setDataToSaveTotal] = useState(0);
  const [dataToSaveCounter, setDataToSaveCounter] = useState(0);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const [isLoadingImport, setIsLoadingImport] = useState(false);
  const [isImportButtonClicked, setIsImportButtonClicked] = useState(false);

  const accessToken = useSelector((state) => state.authentication.accessToken);
  const username = useSelector((state) => state.user.username);

  const increase = (i, total) => {
    if (!dataToSaveTotal) {
      setDataToSaveTotal(total);
    }
    setDataToSaveCounter(i);
  };

  const handleFileLoad = async (data) => {
    setIsLoadingUpload(true);
    const preparedData = await importFacade.importChecklistPrepare(
      data.map((d) => d.data), accessToken, increase,
    );
    setDataToSave(preparedData);
    setIsLoadingUpload(false);
  };

  const handleImportRecords = async () => {
    try {
      setIsLoadingImport(true);
      setIsImportButtonClicked(true);
      await importFacade.importChecklist(dataToSave, accessToken, {
        insertedBy: username,
        updatedBy: username,
      });
      setIsLoadingImport(false);
      notifications.success('Data successfully imported');
    } catch (e) {
      notifications.error('Error importing');
      throw e;
    }
  };

  const dataToSavePercent = () => {
    if (dataToSaveTotal === 0) {
      return 0;
    }
    const percent = Math.floor((dataToSaveCounter * 100) / dataToSaveTotal);
    if (percent > 100) {
      return 100;
    }
    return percent;
  };

  const handleStartOver = () => {
    setDataToSave([]);
    setDataToSaveTotal(0);
    setDataToSaveCounter(0);
    setIsLoadingUpload(false);
    setIsLoadingImport(false);
    setIsImportButtonClicked(false);
  };

  const handleHide = () => {
    onHide();
  };

  return (
    <AdminEditDialog
      open={show}
      maxWidth="lg"
      onClose={handleHide}
      aria-labelledby="import-checklist-dialog"
    >
      <DialogTitle>
        Import checklist
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          Please use with caution!
        </DialogContentText>
        <CSVReader
          onFileLoad={handleFileLoad}
          config={{
            header: true,
            transformHeader: (_, i) => (
              columns[i] ? columns[i].name : 'unknown'
            ),
            skipEmptyLines: true,
          }}
          style={{
            maxHeight: '35px',
          }}
        >
          <span>Click to upload</span>
        </CSVReader>
        {(isLoadingUpload || dataToSave.length > 0) && (
          <Box
            marginTop={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {isLoadingUpload ? 'Loading data...' : 'Loading finished'}
            <CircularProgressWithLabel
              value={dataToSavePercent()}
              label={`${Math.round(dataToSavePercent())}%`}
            />
          </Box>
        )}
        <Box marginTop={2}>
          <LabelValue label="Records count">
            {dataToSave.length > 0 ? dataToSaveTotal : '-'}
          </LabelValue>
        </Box>
        {dataToSave.length > 0 && (
          <>
            <ImportReport data={dataToSave} />
            {isImportButtonClicked && (
              <Box
                marginTop={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {isLoadingImport ? (
                  <>
                    Importing data...
                    <CircularProgress />
                  </>
                ) : (
                  <Typography
                    variant="h5"
                    component="span"
                    className={classes.green}
                  >
                    Data imported
                  </Typography>
                )}
              </Box>
            )}
            <Toolbar className={classes.toolbar} disableGutters>
              <Button
                disableElevation
                color="primary"
                variant="contained"
                onClick={handleImportRecords}
                disabled={isImportButtonClicked}
              >
                Import
              </Button>
              <Button
                disableElevation
                color="default"
                variant="contained"
                onClick={handleStartOver}
                disabled={isImportButtonClicked && isLoadingImport}
              >
                Start over
              </Button>
            </Toolbar>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleHide}>
          Close
        </Button>
      </DialogActions>
    </AdminEditDialog>
  );
};

export default ChecklistImportModal;

ChecklistImportModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
