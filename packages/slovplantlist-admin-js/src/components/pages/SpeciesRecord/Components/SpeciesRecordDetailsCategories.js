import React from 'react';

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
  onChangeData,
}) => {
  const {
    origin,
    cultivation,
    invasiveness,
    residenceTime,
    endemism,
    threat,
    protectionCurrent,
    protectionPrepared,
  } = categoriesRecord;

  const handleChange = (e) => (
    onChangeData({ [e.target.id]: e.target.value })
  );

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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
  onChangeData: PropTypes.func.isRequired,
};
SpeciesRecordDetailsCategories.defaultProps = {
  categoriesRecord: {},
  isEdit: false,
};
