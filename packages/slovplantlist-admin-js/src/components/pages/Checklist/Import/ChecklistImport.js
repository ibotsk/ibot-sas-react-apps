import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button, Grid, Panel, ProgressBar,
} from 'react-bootstrap';

import { notifications } from 'utils';

import { CSVReader } from 'react-papaparse';

import ImportReport from './ImportReport';

import { importFacade } from 'facades';
import importConfig from 'config/import';

const { columns } = importConfig;

const ChecklistImport = () => {
  const [dataToSave, setDataToSave] = useState([]);
  const [dataToSaveTotal, setDataToSaveTotal] = useState(0);
  const [dataToSaveCounter, setDataToSaveCounter] = useState(0);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);

  const accessToken = useSelector((state) => state.authentication.accessToken);

  const increase = (i, total) => {
    // let newValue = Math.floor((i * 100) / total);
    // if (newValue > 100) {
    //   newValue = 100;
    // }
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
  }

  const handleImportRecords = async () => {
    try {
      await importFacade.importChecklist(dataToSave, accessToken);
      notifications.success('Data successfully imported');
    } catch (e) {
      notifications.error('Error importing');
      throw e;
    }
  };

  const dataToSavePercent = () => {
    let percent = Math.floor((dataToSaveCounter * 100) / dataToSaveTotal);
    if (percent > 100) {
      return 100;
    }
    return percent;
  }

  return (
    <Grid>
      <CSVReader
        onFileLoad={handleFileLoad}
        config={{
          header: true,
          transformHeader: (_, i) => (
            columns[i].name
          ),
        }}
      >
        <span>Click to upload</span>
      </CSVReader>
      {
        (isLoadingUpload || dataToSave.length > 0) && (
          <>
            <Panel>
              <Panel.Body>
                <h4>
                  {isLoadingUpload ? 'Loading data...' : 'Loading finished'}
                </h4>
                <ProgressBar
                  now={dataToSavePercent()}
                  // label={`${dataToSaveCounter}%`}
                  label={`${dataToSaveCounter} / ${dataToSaveTotal}`}
                />
              </Panel.Body>
            </Panel>
            { dataToSave.length > 0 && (
              <Panel>
                <Panel.Body>
                  <h4>{dataToSaveTotal} records ready for import</h4>
                  <ImportReport data={dataToSave} />
                  <div>
                    <Button
                      bsStyle="info"
                      onClick={handleImportRecords}
                    >
                      Import
                </Button>
                  </div>
                </Panel.Body>
              </Panel>
            )
            }
          </>
        )
      }
    </ Grid >
  );
};

export default ChecklistImport;
