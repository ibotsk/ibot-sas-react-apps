import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import {
  DialogContent, DialogActions,
  Button,
  Tabs, Tab,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import SpeciesType from 'components/propTypes/species';
import SynonymType from 'components/propTypes/synonym';

import {
  LosName, TabPanel,
  AdminEditDialog, AdminDialogTitle,
} from '@ibot/components';
import Can from 'components/segments/auth/Can';

import { speciesFacade } from 'facades';
import { notifications } from 'utils';
import config from 'config/config';

import {
  SpeciesRecordDetailsName,
  SpeciesRecordDetailsCategories,
  SpeciesRecordDetailsCheckPublish,
  SpeciesRecordDetailsAssociations,
  SpeciesRecordDetailsSynonyms,
} from './Components';

const {
  mappings: { losType },
} = config;

const initStateRecord = {
  speciesRecord: { // default mandatory values
    ntype: losType.A.key,
    hybrid: false,
  },
  nomenStatus: {},
};

const useStyles = makeStyles((theme) => ({
  dialogRoot: {
    '& .MuiDialog-paper': {
      height: `calc(100% - ${theme.spacing(10)}px)`,
    },
  },
  tabs: {
    marginBottom: theme.spacing(4),
    '& .MuiTab-root:hover': {
      backgroundColor: theme.palette.grey[100],
      opacity: 1,
    },
  },
}));

const getSelectedId = (selected) => (
  (selected && selected.length) > 0 ? selected[0].id : null
);
const CHANGED_KEY_TO_ID_KEY = {
  basionym: 'idBasionym',
  replaced: 'idReplaced',
  nomenNovum: 'idNomenNovum',
  parentCombination: 'idParentCombination',
  taxonPosition: 'idTaxonPosition',
};

const SpeciesRecordTabs = ({
  isEdit = false,
  data,
  synonyms,
  onChangeData,
  onChangeSynonyms,
}) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);

  const {
    speciesRecord = {},
    genus,
    nomenStatus = {},
    accepted,
    basionym, replaced, nomenNovum, taxonPosition, parentCombinantion,
  } = data;
  const {
    id: recordId, checkedTimestamp, checkedBy,
  } = speciesRecord;

  // these handlers decide where data from components belong in context of the full record
  const handleChangeSpeciesRecord = (changed) => (
    onChangeData({ speciesRecord: { ...speciesRecord, ...changed } })
  );
  const handleChangeGenus = (changed) => (
    onChangeData({
      genus: changed,
      speciesRecord: {
        ...speciesRecord,
        idGenus: getSelectedId(changed),
      },
    })
  );
  const handleChangeNomenStatus = (changed) => (
    onChangeData({ nomenStatus: { ...nomenStatus, ...changed } })
  );
  const handleChangeAssociations = (changed) => {
    const referenceIds = Object.keys(changed).reduce((prev, curr) => {
      const idProp = CHANGED_KEY_TO_ID_KEY[curr];
      return {
        ...prev,
        [idProp]: getSelectedId(changed[curr]),
      };
    }, {});

    onChangeData({
      ...changed,
      speciesRecord: {
        ...speciesRecord,
        ...referenceIds,
      },
    });
  };

  return (
    <>
      <Tabs
        id="species-details-tabs"
        className={classes.tabs}
        value={activeTab}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={(e, newTab) => setActiveTab(newTab)}
        aria-label="Name details tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Name composition" />
        <Tab label="Associations" />
        <Tab label="Synonyms" />
        <Tab label="Categories" />
        <Tab label="Check and Publish" />
      </Tabs>
      <TabPanel value={activeTab} index={0}>
        <SpeciesRecordDetailsName
          isEdit={isEdit}
          nomenRecord={speciesRecord}
          genusReference={genus}
          onChangeData={handleChangeSpeciesRecord}
          onChangeGenus={handleChangeGenus}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <SpeciesRecordDetailsAssociations
          isEdit={isEdit}
          recordId={recordId}
          acceptedNames={accepted}
          basionymReference={basionym}
          replacedReference={replaced}
          nomenNovumReference={nomenNovum}
          parentCombinationReference={parentCombinantion}
          taxonPositionReference={taxonPosition}
          onChangeData={handleChangeAssociations}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <SpeciesRecordDetailsSynonyms
          isEdit={isEdit}
          recordId={recordId}
          data={synonyms}
          onChangeData={onChangeSynonyms}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <SpeciesRecordDetailsCategories
          isEdit={isEdit}
          categoriesRecord={nomenStatus}
          onChangeData={handleChangeNomenStatus}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={4}>
        <SpeciesRecordDetailsCheckPublish
          isEdit={isEdit}
          checkedTimestamp={checkedTimestamp}
          checkedBy={checkedBy}
          onChangeData={handleChangeSpeciesRecord}
        />
      </TabPanel>
    </>
  );
};

const SpeciesRecordModal = ({ editId, show, onHide }) => {
  const classes = useStyles();
  const [recordId, setRecordId] = useState(editId);
  const [fullRecord, setFullRecord] = useState(initStateRecord);
  const [synonyms, setSynonyms] = useState({});

  const accessToken = useSelector((state) => state.authentication.accessToken);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (recordId) {
        const r = await speciesFacade.getRecordById(recordId, accessToken);
        const syns = await speciesFacade.getSynonyms(recordId, accessToken);

        setFullRecord(r);
        setSynonyms(syns);
      }
    };

    fetchData();
  }, [recordId, accessToken]);

  // recordId exists because of possibility of creating a new record without closing the dialog
  const handleEnter = () => (
    setRecordId(editId)
  );

  const handleHide = () => {
    setFullRecord(initStateRecord);
    setSynonyms({});
    setRecordId(undefined);
    onHide();
  };

  const handleDataChange = (changed) => (
    setFullRecord({ ...fullRecord, ...changed })
  );

  const handleSynonymsChange = (changed) => (
    setSynonyms({ ...synonyms, ...changed })
  );

  const handleSave = async (close = false) => {
    const {
      speciesRecord,
      nomenStatus,
    } = fullRecord;
    const {
      nomenclatoricSynonyms = [],
      taxonomicSynonyms = [],
      invalidDesignations = [],
      misidentifications = [],
      otherSynonyms = [],
    } = synonyms;
    const { username } = user;

    try {
      const recId = await speciesFacade.saveSpeciesAndSynonyms({
        species: speciesRecord,
        synonyms: [
          ...nomenclatoricSynonyms,
          ...taxonomicSynonyms,
          ...invalidDesignations,
          ...misidentifications,
          ...otherSynonyms,
        ],
        nomenStatus,
        accessToken,
        insertedBy: username,
        updatedBy: username,
      });
      notifications.success('Saved');
      if (close) {
        handleHide();
      } else {
        setRecordId(recId);
      }
    } catch (error) {
      notifications.error('Error saving');
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      await speciesFacade.deleteSpecies(editId, accessToken);
      notifications.success('Deleted');
      handleHide();
    } catch (error) {
      notifications.error('Error while deleting');
      throw error;
    }
  };

  const { speciesRecord: { idGenus } = {} } = fullRecord;

  return (
    <AdminEditDialog
      className={classes.dialogRoot}
      open={show}
      onEnter={handleEnter}
      onClose={handleHide}
      fullWidth
      maxWidth="md"
      scroll="paper"
      aria-labelledby="species-dialog"
    >
      <AdminDialogTitle
        id="genus-dialog-title"
        recordId={editId}
        onDelete={handleDelete}
      >
        {editId
          ? (
            <>
              {`Edit species name - ID ${editId} - `}
              <LosName data={fullRecord.speciesRecord} isAggregates />
            </>
          )
          : 'Create new species name'}
      </AdminDialogTitle>
      <DialogContent dividers>
        <Can
          role={user.role}
          perform="genus:edit"
          data={{
            speciesGenusId: idGenus,
            userGeneraIds: user.userGenera,
          }}
          yes={() => (
            <SpeciesRecordTabs
              isEdit
              data={fullRecord}
              synonyms={synonyms}
              onChangeData={handleDataChange}
              onChangeSynonyms={handleSynonymsChange}
            />
          )}
          no={() => (
            <SpeciesRecordTabs data={fullRecord} />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Can
          role={user.role}
          perform="genus:edit"
          data={{
            speciesGenusId: idGenus,
            userGeneraIds: user.userGenera,
          }}
          yes={() => (
            <>
              <Button onClick={handleHide}>Close</Button>
              <Button
                color="primary"
                onClick={() => handleSave(false)}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
              <Button
                color="primary"
                onClick={() => handleSave(true)}
                startIcon={<SaveIcon />}
              >
                Save &amp; Close
              </Button>
            </>
          )}
          no={() => (
            <Button onClick={handleHide}>Close</Button>
          )}
        />
      </DialogActions>
    </AdminEditDialog>
  );
};

export default SpeciesRecordModal;

SpeciesRecordModal.propTypes = {
  editId: PropTypes.number,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
SpeciesRecordModal.defaultProps = {
  editId: undefined,
};
SpeciesRecordTabs.propTypes = {
  isEdit: PropTypes.bool,
  data: PropTypes.shape({
    speciesRecord: SpeciesType.type,
    family: PropTypes.string,
    familyApg: PropTypes.string,
    nomenStatus: PropTypes.shape({
      origin: PropTypes.string,
      cultivation: PropTypes.string,
      invasiveness: PropTypes.string,
      residenceTime: PropTypes.string,
      endemism: PropTypes.string,
      threat: PropTypes.string,
      protectionCurrent: PropTypes.string,
      protectionPrepared: PropTypes.string,
    }),
    genus: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    accepted: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      parent: SpeciesType.type.isRequired,
    })),
    basionym: SpeciesType.type,
    replaced: SpeciesType.type,
    nomenNovum: SpeciesType.type,
    taxonPosition: SpeciesType.type,
    parentCombinantion: SpeciesType.type,
  }).isRequired,
  synonyms: PropTypes.shape({
    nomenclatoricSynonyms: PropTypes.arrayOf(SynonymType.type),
    taxonomicSynonyms: PropTypes.arrayOf(SynonymType.type),
    invalidDesignations: PropTypes.arrayOf(SynonymType.type),
    misidentifications: PropTypes.arrayOf(SynonymType.type),
    otherSynonyms: PropTypes.arrayOf(SynonymType.type),
  }).isRequired,
  onChangeData: PropTypes.func.isRequired,
  onChangeSynonyms: PropTypes.func.isRequired,
};
SpeciesRecordTabs.defaultProps = {
  isEdit: false,
};
