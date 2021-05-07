import React, { useEffect, useState } from 'react';

import {
  Col, Panel,
  FormGroup, ControlLabel,
} from 'react-bootstrap';

import PropTypes from 'prop-types';

import FormControlEditableOrStatic
  from 'components/segments/FormControlEditableOrStatic';

import config from 'config/config';

const {
  constants: {
    labelColumnWidth,
    contentColumnWidth,
  },
} = config;

const SpeciesRecordDetailsCategories = ({
  categoriesRecord = {},
  isEdit = false,
}) => {
  const [origin, setOrigin] = useState();
  const [cultivation, setCultivation] = useState();
  const [invasiveness, setInvasiveness] = useState();
  const [residenceTime, setResidenceTime] = useState();
  const [endemism, setEndemism] = useState();
  const [threat, setThreat] = useState();
  const [protectionCurrent, setProtectionCurrent] = useState();
  const [protectionPrepared, setProtectionPrepared] = useState();

  useEffect(() => {
    setOrigin(categoriesRecord.origin);
    setCultivation(categoriesRecord.cultivation);
    setInvasiveness(categoriesRecord.invasiveness);
    setResidenceTime(categoriesRecord.residenceTime);
    setEndemism(categoriesRecord.endemism);
    setThreat(categoriesRecord.threat);
    setProtectionCurrent(categoriesRecord.protectionCurrent);
    setProtectionPrepared(categoriesRecord.protectionPrepared);
  }, [categoriesRecord]);

  return (
    <>
      <Panel>
        <Panel.Body>
          <FormGroup
            controlId="origin"
            bsSize="sm"
          >
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Origin status
            </Col>
            <Col xs={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={origin || ''}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup
            controlId="cultivation"
            bsSize="sm"
          >
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Cultivation
            </Col>
            <Col xs={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={cultivation || ''}
                onChange={(e) => setCultivation(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup
            controlId="invasiveness"
            bsSize="sm"
          >
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Invasion status
            </Col>
            <Col xs={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={invasiveness || ''}
                onChange={(e) => setInvasiveness(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup
            controlId="residenceTime"
            bsSize="sm"
          >
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Residence time status
            </Col>
            <Col xs={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={residenceTime || ''}
                onChange={(e) => setResidenceTime(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup
            controlId="endemism"
            bsSize="sm"
          >
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Endemic status
            </Col>
            <Col xs={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={endemism || ''}
                onChange={(e) => setEndemism(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup
            controlId="threat"
            bsSize="sm"
          >
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Status of threat
            </Col>
            <Col xs={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={threat || ''}
                onChange={(e) => setThreat(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup
            controlId="protectionCurrent"
            bsSize="sm"
          >
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Status of legislative protection (current)
            </Col>
            <Col xs={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={protectionCurrent || ''}
                onChange={(e) => setProtectionCurrent(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup
            controlId="protectionPrepared"
            bsSize="sm"
          >
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Status of legislative protection (prepared)
            </Col>
            <Col xs={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={protectionPrepared || ''}
                onChange={(e) => setProtectionPrepared(e.target.value)}
              />
            </Col>
          </FormGroup>
        </Panel.Body>
      </Panel>
    </>
  );
};

export default SpeciesRecordDetailsCategories;

SpeciesRecordDetailsCategories.propTypes = {
  categoriesRecord: PropTypes.shape({
    origin: PropTypes.string,
    cultivation: PropTypes.string,
    invasiveness: PropTypes.string,
    residenceTime: PropTypes.string,
    endemism: PropTypes.string,
    threat: PropTypes.string,
    protectionCurrent: PropTypes.string,
    protectionPrepared: PropTypes.string,
  }),
  isEdit: PropTypes.bool,
};
SpeciesRecordDetailsCategories.defaultProps = {
  categoriesRecord: {},
  isEdit: false,
};
