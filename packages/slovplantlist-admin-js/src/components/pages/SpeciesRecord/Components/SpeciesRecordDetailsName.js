import React, { useEffect, useState } from 'react';

import {
  Panel, Col,
  FormGroup, FormControl, ControlLabel,
  Checkbox,
} from 'react-bootstrap';

import PropTypes from 'prop-types';
import SpeciesPropType from 'components/propTypes/species';

import { hooks } from '@ibot/core';

import FormControlEditableOrStatic
  from 'components/segments/FormControlEditableOrStatic';

import { genusFacade } from 'facades';
import config from 'config/config';
import { useSelector } from 'react-redux';
import AsyncTypeaheadOrStatic from 'components/segments/AsyncTypeaheadOrStatic';

const {
  mappings: {
    losType: ntypesConfig,
  },
  constants: {
    labelColumnWidth,
    contentColumnWidth,
  },
} = config;

const searchGenusByTerm = (query, accessToken) => (
  genusFacade.getAllGeneraBySearchTerm(
    query, accessToken, (g) => ({
      id: g.id,
      label: g.name,
    }),
  )
);

const SpeciesRecordDetailsName = ({
  nomenRecord = {},
  genusReference = [],
  isEdit = false,
  onChangeData,
  onChangeGenus,
}) => {
  const [family, setFamily] = useState('-');
  const [familyApg, setFamilyApg] = useState('-');

  const accessToken = useSelector((state) => state.authentication.accessToken);

  const {
    ntype, genus, species, subsp, var: varieta, subvar,
    forma, nothosubsp, nothoforma, proles, unranked,
    authors, hybrid,
    genusH, speciesH, subspH, varH, subvarH,
    formaH, nothosubspH, nothoformaH, authorsH,
    publication, aggregate, vernacular, tribus,
  } = nomenRecord;

  const {
    selected: genusSelected,
    isLoading: isLoadingGenus,
    results: generaOptions,
    doSearch: doSearchGenus,
    handleChangeTypeahead: handleChangeTypeaheadGenus,
    getStaticSelected: getStaticSelectedGenus,
  } = hooks.useAsyncTypeahead(
    searchGenusByTerm, genusReference, accessToken, onChangeGenus,
  );

  const handleChange = (e) => (
    onChangeData({ [e.target.id]: e.target.value })
  );
  const handleChangeCheckbox = (e) => {
    onChangeData({ [e.target.id]: e.target.checked });
  };

  const [{
    id: genusSelectedId,
  } = {}] = genusSelected;

  useEffect(() => {
    const fetchFamilies = async () => {
      if (genusSelectedId) {
        const {
          family: familyObj,
          familyApg: familyApgObj,
        } = await genusFacade.getGenusByIdWithRelations(
          genusSelectedId, accessToken,
        );
        setFamily(familyObj.name);
        setFamilyApg(familyApgObj.name);
      }
    };

    fetchFamilies();
  }, [genusSelectedId, accessToken]);

  const renderHybridFields = () => {
    if (!hybrid) {
      return null;
    }
    return (
      <Panel>
        <Panel.Body>
          <FormGroup controlId="genusH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Hybrid Genus
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={genusH || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="speciesH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Hybrid Species
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={speciesH || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="subspH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Hybrid Subsp
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={subspH || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="varH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Hybrid Var
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={varH || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="subvarH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Hybrid Subvar
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={subvarH || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formaH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Hybrid Forma
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={formaH || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="nothosubspH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Hybrid Nothosubsp
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={nothosubspH || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="nothoformaH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Hybrid Nothoforma
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={nothoformaH || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="authorsH" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Hybrid Authors
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={authorsH || ''}
                onChange={handleChange}
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
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Type
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                componentClass="select"
                value={ntype}
                onChange={handleChange}
              >
                {isEdit ? (
                  Object.keys(ntypesConfig).map((t) => (
                    <option value={t} key={t}>{ntypesConfig[t].text}</option>
                  ))
                ) : (
                  <option>{ntype ? ntypesConfig[ntype].text : ''}</option>
                )}
              </FormControlEditableOrStatic>
            </Col>
          </FormGroup>
        </Panel.Body>
      </Panel>
      <Panel>
        <Panel.Body>
          <FormGroup bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              <ControlLabel>Family APG</ControlLabel>
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControl.Static>{familyApg}</FormControl.Static>
            </Col>
          </FormGroup>
          <FormGroup bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              <ControlLabel>Family</ControlLabel>
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControl.Static>{family}</FormControl.Static>
            </Col>
          </FormGroup>
          <FormGroup controlId="idGenus" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Genus (reference)
            </Col>
            <Col sm={contentColumnWidth}>
              <AsyncTypeaheadOrStatic
                id="id-genus-autocomplete"
                editable={isEdit}
                isLoading={isLoadingGenus}
                options={generaOptions}
                onSearch={doSearchGenus}
                selected={genusSelected}
                onChange={handleChangeTypeaheadGenus}
                staticVal={getStaticSelectedGenus()}
                placeholder="Start by typing a genus present
                  in the database (case sensitive)"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="aggregate" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Aggregate
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={aggregate || ''}
                // onChange={(e) => setAggregate(e.target.value)}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
        </Panel.Body>
      </Panel>
      <Panel>
        <Panel.Body>
          <FormGroup controlId="vernacular" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Vernacular
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={vernacular || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="tribus" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Tribus
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={tribus || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
        </Panel.Body>
      </Panel>
      <Panel>
        <Panel.Body>
          <FormGroup controlId="genus" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Genus (text)
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={genus || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="species" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Species
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={species || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="subsp" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Subsp
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={subsp || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="var" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Var
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={varieta || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="subvar" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Subvar
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={subvar || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="forma" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Forma
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={forma || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="nothosubsp" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Nothosubsp
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={nothosubsp || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="nothoforma" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Nothoforma
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={nothoforma || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="proles" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Proles
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={proles || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="unranked" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Unranked
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={unranked || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="authors" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Authors
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={authors || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="hybrid">
            <Col
              sm={contentColumnWidth}
              smOffset={labelColumnWidth}
              xs={12}
            >
              <Checkbox
                inline
                disabled={!isEdit}
                id="hybrid"
                checked={hybrid || false}
                onChange={handleChangeCheckbox}
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
      <Panel>
        <Panel.Body>
          <FormGroup controlId="publication" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Publication
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                type="text"
                value={publication || ''}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
        </Panel.Body>
      </Panel>
    </>
  );
};

export default SpeciesRecordDetailsName;

SpeciesRecordDetailsName.propTypes = {
  nomenRecord: SpeciesPropType.type,
  genusReference: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  })),
  isEdit: PropTypes.bool,
  onChangeData: PropTypes.func.isRequired,
  onChangeGenus: PropTypes.func.isRequired,
};
SpeciesRecordDetailsName.defaultProps = {
  nomenRecord: {},
  genusReference: [],
  isEdit: false,
};
