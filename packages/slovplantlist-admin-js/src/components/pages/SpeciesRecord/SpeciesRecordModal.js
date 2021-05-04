import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { Modal } from 'react-bootstrap';

import PropTypes from 'prop-types';

import { speciesFacade } from 'facades';

const SpeciesRecordModal = ({ editId: recordId, show, onHide }) => {
  const [record, setRecord] = useState({});

  const accessToken = useSelector((state) => state.authentication.accessToken);

  const onEnter = async () => {
    console.log(recordId);
    if (recordId) {
      const {
        speciesRecord,
        // accepted,
        // genus, familyApg, family,
        // basionym, replaced, nomenNovum,
        // parentCombination, taxonPosition,
        // nomenStatus,
      } = await speciesFacade.getRecordById(recordId, accessToken);

      setRecord(speciesRecord);
    }
  };

  const handleHide = () => {
    // setRecord({});
    onHide();
  };

  return (
    <Modal show={show} onHide={handleHide} onEnter={onEnter}>
      <Modal.Header closeButton>
        <Modal.Title>
          {recordId ? 'Edit species name' : 'Create new species name'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {JSON.stringify(record)}
      </Modal.Body>
    </Modal>
  );
};

export default SpeciesRecordModal;

SpeciesRecordModal.propTypes = {
  editId: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
SpeciesRecordModal.defaultProps = {
  editId: undefined,
};
