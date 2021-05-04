import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import {
  Form, Modal,
  Tabs, Tab,
} from 'react-bootstrap';

import PropTypes from 'prop-types';
import SpeciesType from 'components/propTypes/species';

import Can from 'components/segments/auth/Can';

import { speciesFacade } from 'facades';
import SpeciesRecordNameDetails from './Components/SpeciesRecordNameDetails';

const SpeciesRecordTabs = ({ isEdit = false, data }) => {
  const { speciesRecord } = data;
  return (
    <Tabs defaultActiveKey={1} id="species-details-tabs">
      <Tab eventKey={1} title="Name details">
        <SpeciesRecordNameDetails isEdit={isEdit} record={speciesRecord} />
      </Tab>
      <Tab eventKey={2} title="Publication">
        Pub
      </Tab>
      <Tab eventKey={3} title="Synonyms and Associations">
        SA
      </Tab>
      <Tab eventKey={4} title="Categories">
        Cat
      </Tab>
      <Tab eventKey={5} title="Check and Publish">
        CP
      </Tab>
    </Tabs>
  );
};

const SpeciesRecordModal = ({ editId: recordId, show, onHide }) => {
  const [record, setRecord] = useState({});
  // // const [genus, setGenus] = useState('');
  // const [family, setFamily] = useState('');
  // const [familyApg, setFamilyApg] = useState('');

  const accessToken = useSelector((state) => state.authentication.accessToken);
  const user = useSelector((state) => state.user);

  const onEnter = async () => {
    if (recordId) {
      // const {
      // speciesRecord,
      // accepted,
      // genus,
      // familyApg, family,
      // basionym, replaced, nomenNovum,
      // parentCombination, taxonPosition,
      // nomenStatus,
      // }
      const r = await speciesFacade.getRecordById(recordId, accessToken);

      setRecord(r);
    }
  };

  const handleHide = () => {
    // setRecord({});
    onHide();
  };

  const { speciesRecord: { idGenus } = {} } = record;

  return (
    <Modal
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
              <SpeciesRecordTabs isEdit data={record} />
            </Form>
          )}
          no={() => (
            <SpeciesRecordTabs data={record} />
          )}
        />
      </Modal.Body>
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
  }).isRequired,
};
SpeciesRecordTabs.defaultProps = {
  isEdit: false,
};
