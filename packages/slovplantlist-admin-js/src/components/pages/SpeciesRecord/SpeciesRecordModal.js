import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import {
  Button,
  Form, Modal,
  Tabs, Tab,
} from 'react-bootstrap';

import PropTypes from 'prop-types';
import SpeciesType from 'components/propTypes/species';

import Can from 'components/segments/auth/Can';

import { speciesFacade } from 'facades';
import {
  SpeciesRecordDetailsName,
  SpeciesRecordDetailsCategories,
  SpeciesRecordDetailsCheckPublish,
  SpeciesRecordDetailsAssociations,
  SpeciesRecordDetailsSynonyms,
} from './Components';

const SpeciesRecordTabs = ({ isEdit = false, data }) => {
  const {
    speciesRecord = {},
    genus,
    nomenStatus,
    accepted,
    basionym, replaced, nomenNovum, taxonPosition, parentCombinantion,
  } = data;
  const {
    id: recordId, checkTimestamp, checkedBy,
  } = speciesRecord;
  return (
    <Tabs defaultActiveKey={1} id="species-details-tabs">
      <Tab eventKey={1} title="Name composition">
        <SpeciesRecordDetailsName
          isEdit={isEdit}
          nomenRecord={speciesRecord}
          genusReference={genus}
        />
      </Tab>
      <Tab eventKey={2} title="Associations">
        <SpeciesRecordDetailsAssociations
          isEdit={isEdit}
          recordId={recordId}
          acceptedNames={accepted}
          basionymReference={basionym}
          replacedReference={replaced}
          nomenNovumReference={nomenNovum}
          parentCombinationReference={parentCombinantion}
          taxonPositionReference={taxonPosition}
        />
      </Tab>
      <Tab eventKey={3} title="Synonyms">
        <SpeciesRecordDetailsSynonyms
          isEdit={isEdit}
          recordId={recordId}
        />
      </Tab>
      <Tab eventKey={4} title="Categories">
        <SpeciesRecordDetailsCategories
          isEdit={isEdit}
          categoriesRecord={nomenStatus}
        />
      </Tab>
      <Tab eventKey={5} title="Check and Publish">
        <SpeciesRecordDetailsCheckPublish
          isEdit={isEdit}
          checkedAt={checkTimestamp}
          checkedBy={checkedBy}
        />
      </Tab>
    </Tabs>
  );
};

const SpeciesRecordModal = ({ editId: recordId, show, onHide }) => {
  const [fullRecord, setFullRecord] = useState({});

  const accessToken = useSelector((state) => state.authentication.accessToken);
  const user = useSelector((state) => state.user);

  const onEnter = async () => {
    if (recordId) {
      const r = await speciesFacade.getRecordById(recordId, accessToken);
      setFullRecord(r);
    }
  };

  const handleHide = () => {
    // setRecord({});
    onHide();
  };

  const { speciesRecord: { idGenus } = {} } = fullRecord;

  return (
    <Modal
      id="species-record-modal"
      bsSize="large"
      show={show}
      onHide={handleHide}
      onEnter={onEnter}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {recordId
            ? `Edit species name - ID ${recordId}`
            : 'Create new species name'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Can
          role={user.role}
          perform="genus:edit"
          data={{
            speciesGenusId: idGenus,
            userGeneraIds: user.userGenera,
          }}
          yes={() => (
            <Form horizontal onSubmit={() => { }}>
              <SpeciesRecordTabs isEdit data={fullRecord} />
            </Form>
          )}
          no={() => (
            <SpeciesRecordTabs data={fullRecord} />
          )}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="default" onClick={handleHide}>Cancel</Button>
        <Button bsStyle="primary" type="submit">Save</Button>
      </Modal.Footer>
    </Modal>
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
    genus: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })),
    accepted: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      parent: SpeciesType.type.isRequired,
    })),
    basionym: PropTypes.arrayOf(SpeciesType.type),
    replaced: PropTypes.arrayOf(SpeciesType.type),
    nomenNovum: PropTypes.arrayOf(SpeciesType.type),
    taxonPosition: PropTypes.arrayOf(SpeciesType.type),
    parentCombinantion: PropTypes.arrayOf(SpeciesType.type),
  }).isRequired,
};
SpeciesRecordTabs.defaultProps = {
  isEdit: false,
};
