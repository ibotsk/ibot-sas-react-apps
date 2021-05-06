import React, { useEffect, useState } from 'react';

import {
  Panel, Col,
  FormGroup, FormControl, ControlLabel,
  Checkbox,
} from 'react-bootstrap';

import PropTypes from 'prop-types';
import SpeciesPropType from 'components/propTypes/species';

import FormControlEditableOrStatic
  from 'components/segments/FormControlEditableOrStatic';

import config from 'config/config';

const LABEL_COL_WIDTH = 2;
const CONTENT_COL_WIDTH = 10;

const {
  mappings: {
    losType: ntypesConfig,
  },
} = config;

const SpeciesRecordNameDetails = ({
  record = {},
  familyApg = '-',
  family = '-',
  isEdit = false,
}) => {
  const [ntype, setNtype] = useState();
  const [aggregate, setAggregate] = useState();
  const [genus, setGenus] = useState();
  const [species, setSpecies] = useState();
  const [subsp, setSubsp] = useState();
  const [variety, setVariety] = useState();
  const [subvar, setSubvar] = useState();
  const [forma, setForma] = useState();
  const [nothosubsp, setNothosubsp] = useState();
  const [nothoforma, setNothoforma] = useState();
  const [proles, setProles] = useState();
  const [unranked, setUnranked] = useState();
  const [authors, setAuthors] = useState();
  const [hybrid, setHybrid] = useState(false);

  const [genusH, setGenusH] = useState();
  const [speciesH, setSpeciesH] = useState();
  const [subspH, setSubspH] = useState();
  const [varH, setVarH] = useState();
  const [subvarH, setSubvarH] = useState();
  const [formaH, setFormaH] = useState();
  const [nothosubspH, setNothosubspH] = useState();
  const [nothoformaH, setNothoformaH] = useState();
  const [authorsH, setAuthorsH] = useState();

  useEffect(() => {
    setNtype(record.ntype);
    setAggregate(record.aggregate);
    setGenus(record.genus);
    setSpecies(record.species);
    setSubsp(record.subsp);
    setVariety(record.var);
    setSubvar(record.subvar);
    setForma(record.forma);
    setNothosubsp(record.nothosubsp);
    setNothoforma(record.nothoforma);
    setProles(record.proles);
    setUnranked(record.unranked);
    setAuthors(record.authors);
    setHybrid(record.hybrid);

    setGenusH(record.genusH);
    setSpeciesH(record.speciesH);
    setSubspH(record.subspH);
    setVarH(record.varH);
    setSubvarH(record.subvarH);
    setFormaH(record.formaH);
    setNothosubspH(record.nothosubspH);
    setNothoformaH(record.nothoformaH);
    setAuthorsH(record.authorsH);
  }, [record]);

  const renderHybridFields = () => {
    if (!hybrid) {
      return null;
    }

    return (
      <Panel>
        <Panel.Body>
          <FormGroup controlId="genusH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Hybrid Genus
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControl
                type="text"
                value={genusH || ''}
                onChange={(e) => setGenusH(e.target.value)}
                placeholder="Hybrid Genus"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="speciesH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Hybrid Species
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControl
                type="text"
                value={speciesH || ''}
                onChange={(e) => setSpeciesH(e.target.value)}
                placeholder="Hybrid Species"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="subspH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Hybrid Subsp
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControl
                type="text"
                value={subspH || ''}
                onChange={(e) => setSubspH(e.target.value)}
                placeholder="Hybrid Subsp"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="varH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Hybrid Var
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControl
                type="text"
                value={varH || ''}
                onChange={(e) => setVarH(e.target.value)}
                placeholder="Hybrid Var"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="subvarH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Hybrid Subvar
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControl
                type="text"
                value={subvarH || ''}
                onChange={(e) => setSubvarH(e.target.value)}
                placeholder="Hybrid Subvar"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formaH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Hybrid Forma
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControl
                type="text"
                value={formaH || ''}
                onChange={(e) => setFormaH(e.target.value)}
                placeholder="Hybrid Forma"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="nothosubspH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Hybrid Nothosubsp
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControl
                type="text"
                value={nothosubspH || ''}
                onChange={(e) => setNothosubspH(e.target.value)}
                placeholder="Hybrid Nothosubsp"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="nothoformaH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Hybrid Nothoforma
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControl
                type="text"
                value={nothoformaH || ''}
                onChange={(e) => setNothoformaH(e.target.value)}
                placeholder="Hybrid Nothoforma"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="authorsH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Hybrid Authors
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControl
                type="text"
                value={authorsH || ''}
                onChange={(e) => setAuthorsH(e.target.value)}
                placeholder="Hybrid Authors"
              />
            </Col>
          </FormGroup>
        </Panel.Body>
      </Panel>
    );
  };

  return (
    <>
      <Panel>
        <Panel.Body>
          <FormGroup controlId="ntype" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Type
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControlEditableOrStatic
                editable={isEdit}
                componentClass="select"
                value={ntype}
                onChange={(e) => setNtype(e.target.value)}
              >
                {
                  Object.keys(ntypesConfig).map((t) => (
                    <option
                      value={t}
                      key={t}
                    >
                      {ntypesConfig[t].text}
                    </option>
                  ))
                }
              </FormControlEditableOrStatic>
            </Col>
          </FormGroup>
        </Panel.Body>
      </Panel>
      <Panel>
        <Panel.Body>
          <FormGroup bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              <ControlLabel>Family APG</ControlLabel>
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControl.Static>{familyApg}</FormControl.Static>
            </Col>
          </FormGroup>
          <FormGroup bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              <ControlLabel>Family</ControlLabel>
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControl.Static>{family}</FormControl.Static>
            </Col>
          </FormGroup>
          <FormGroup controlId="idGenus" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Genus (reference)
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              {/* <AsyncTypeahead
              id="id-genus-autocomplete"
              isLoading={isLoading}
              options={generaOptions}
              onSearch={this.handleSearchGeneraAsyncTypeahead}
              selected={idGenusSelected}
              onChange={(selected) => this.handleChangeGenusTypeahead(
                selected, 'idGenus',
              )}
              placeholder="Start by typing a genus present
                        in the database (case sensitive)"
            /> */}
            </Col>
          </FormGroup>
          <FormGroup controlId="aggregate" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Aggregate
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={aggregate || ''}
                onChange={(e) => setAggregate(e.target.value)}
              />
            </Col>
          </FormGroup>
        </Panel.Body>
      </Panel>
      <Panel>
        <Panel.Body>
          <FormGroup controlId="genus" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Genus (text)
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={genus || ''}
                onChange={(e) => setGenus(e.target.value)}
                placeholder="Genus as text"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="species" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Species
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={species || ''}
                onChange={(e) => setSpecies(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="subsp" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Subsp
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={subsp || ''}
                onChange={(e) => setSubsp(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="var" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Var
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={variety || ''}
                onChange={(e) => setVariety(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="subvar" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Subvar
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={subvar || ''}
                onChange={(e) => setSubvar(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="forma" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Forma
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={forma || ''}
                onChange={(e) => setForma(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="nothosubsp" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Nothosubsp
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={nothosubsp || ''}
                onChange={(e) => setNothosubsp(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="nothoforma" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Nothoforma
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={nothoforma || ''}
                onChange={(e) => setNothoforma(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="proles" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Proles
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={proles || ''}
                onChange={(e) => setProles(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="unranked" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Unranked
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={unranked || ''}
                onChange={(e) => setUnranked(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="authors" bsSize="sm">
            <Col componentClass={ControlLabel} sm={LABEL_COL_WIDTH}>
              Authors
            </Col>
            <Col sm={CONTENT_COL_WIDTH}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={authors || ''}
                onChange={(e) => setAuthors(e.target.value)}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="hybrid">
            <Col
              sm={CONTENT_COL_WIDTH}
              smOffset={LABEL_COL_WIDTH}
              xs={12}
            >
              <Checkbox
                inline
                disabled={!isEdit}
                id="hybrid"
                checked={hybrid || false}
                onChange={() => setHybrid(!hybrid)}
              >
                Hybrid
              </Checkbox>
            </Col>
          </FormGroup>
          {
            renderHybridFields()
          }
        </Panel.Body>
      </Panel>
    </>
  );
};

export default SpeciesRecordNameDetails;

SpeciesRecordNameDetails.propTypes = {
  record: SpeciesPropType.type,
  familyApg: PropTypes.string,
  family: PropTypes.string,
  isEdit: PropTypes.bool,
};
SpeciesRecordNameDetails.defaultProps = {
  record: {},
  familyApg: '-',
  family: '-',
  isEdit: false,
};
