import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button, Grid, Panel, ProgressBar, Col, Row,
} from 'react-bootstrap';

import { notifications } from 'utils';

import { CSVReader } from 'react-papaparse';

import { PageTitle } from '@ibot/components';

import { importFacade } from 'facades';
import importConfig from 'config/import';

import ImportReport from './ImportReport';

const { columns } = importConfig;

const ChecklistImport = () => {
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

  return (
    <div>
      <PageTitle title="Import checklist - Slovplantlist" />
      <Grid>
        <h2>Import checklist</h2>
        <p className="text-warning">
          Please use with caution!
        </p>
        <CSVReader
          onFileLoad={handleFileLoad}
          config={{
            header: true,
            transformHeader: (_, i) => (
              columns[i] ? columns[i].name : 'unknown'
            ),
            skipEmptyLines: true,
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
                    label={`${dataToSaveCounter} / ${dataToSaveTotal}`}
                  />
                </Panel.Body>
              </Panel>
              {dataToSave.length > 0 && (
                <Panel>
                  <Panel.Body>
                    <h4>
                      {dataToSaveTotal}
                      {' '}
                      records ready for import
                    </h4>
                    <ImportReport data={dataToSave} />
                    <Row>
                      <Col md={6}>
                        <Button
                          bsStyle="info"
                          onClick={handleImportRecords}
                          disabled={isImportButtonClicked}
                        >
                          Import
                        </Button>
                      </Col>
                      {!isImportButtonClicked && (
                        <Col md={6}>
                          <Button
                            className="pull-right"
                            bsStyle="default"
                            onClick={handleStartOver}
                          >
                            Start over
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </Panel.Body>
                </Panel>
              )}
            </>
          )
        }
        {isImportButtonClicked && (
          <Panel>
            <Panel.Body>
              <h4>{isLoadingImport ? 'Importing...' : 'Import finished'}</h4>
              <ProgressBar
                active={isLoadingImport}
                now={100}
              />
              <Button
                bsStyle="default"
                onClick={handleStartOver}
              >
                Start over
              </Button>
            </Panel.Body>
          </Panel>
        )}
      </Grid>
    </div>
  );
};

export default ChecklistImport;
