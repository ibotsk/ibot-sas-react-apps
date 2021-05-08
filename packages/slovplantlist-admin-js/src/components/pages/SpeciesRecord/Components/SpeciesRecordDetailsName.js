import React, { useEffect, useState } from 'react';

import {
  Panel, Col,
  FormGroup, FormControl, ControlLabel,
  Checkbox,
} from 'react-bootstrap';

import PropTypes from 'prop-types';
import SpeciesPropType from 'components/propTypes/species';

import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import { hooks } from '@ibot/core';

import FormControlEditableOrStatic
  from 'components/segments/FormControlEditableOrStatic';

import { genusFacade } from 'facades';
import config from 'config/config';
import { useSelector } from 'react-redux';

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
}) => {
  const [family, setFamily] = useState('-');
  const [familyApg, setFamilyApg] = useState('-');

  const [ntype, setNtype] = useState('A');
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

  const [publication, setPublication] = useState();
  const [aggregate, setAggregate] = useState();
  const [vernacular, setVernacular] = useState();
  const [tribus, setTribus] = useState();

  const accessToken = useSelector((state) => state.authentication.accessToken);

  const {
    selected: genusSelected,
    isLoading: isLoadingGenus,
    results: generaOptions,
    doSearch: doSearchGenus,
    handleChangeTypeahead: handleChangeTypeaheadGenus,
    getStaticSelected: getStaticSelectedGenus,
  } = hooks.useAsyncTypeahead(searchGenusByTerm, genusReference, accessToken);

  useEffect(() => {
    setNtype(nomenRecord.ntype);
    setGenus(nomenRecord.genus);
    setSpecies(nomenRecord.species);
    setSubsp(nomenRecord.subsp);
    setVariety(nomenRecord.var);
    setSubvar(nomenRecord.subvar);
    setForma(nomenRecord.forma);
    setNothosubsp(nomenRecord.nothosubsp);
    setNothoforma(nomenRecord.nothoforma);
    setProles(nomenRecord.proles);
    setUnranked(nomenRecord.unranked);
    setAuthors(nomenRecord.authors);
    setHybrid(nomenRecord.hybrid);

    setGenusH(nomenRecord.genusH);
    setSpeciesH(nomenRecord.speciesH);
    setSubspH(nomenRecord.subspH);
    setVarH(nomenRecord.varH);
    setSubvarH(nomenRecord.subvarH);
    setFormaH(nomenRecord.formaH);
    setNothosubspH(nomenRecord.nothosubspH);
    setNothoformaH(nomenRecord.nothoformaH);
    setAuthorsH(nomenRecord.authorsH);

    setPublication(nomenRecord.publication);
    setAggregate(nomenRecord.aggregate);
    setVernacular(nomenRecord.vernacular);
    setTribus(nomenRecord.tribus);
  }, [nomenRecord]);

  useEffect(() => {
    const fetchFamilies = async () => {
      const genusId = genusSelected[0] ? genusSelected[0].id : undefined;
      if (genusId) {
        const {
          family: familyObj,
          familyApg: familyApgObj,
        } = await genusFacade.getGenusByIdWithRelations(
          genusId, accessToken,
        );
        setFamily(familyObj.name);
        setFamilyApg(familyApgObj.name);
      }
    };

    fetchFamilies();
  }, [genusSelected, accessToken]);

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
                onChange={(e) => setGenusH(e.target.value)}
                placeholder="Hybrid Genus"
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
                onChange={(e) => setSpeciesH(e.target.value)}
                placeholder="Hybrid Species"
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
                onChange={(e) => setSubspH(e.target.value)}
                placeholder="Hybrid Subsp"
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
                onChange={(e) => setVarH(e.target.value)}
                placeholder="Hybrid Var"
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
                onChange={(e) => setSubvarH(e.target.value)}
                placeholder="Hybrid Subvar"
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
                onChange={(e) => setFormaH(e.target.value)}
                placeholder="Hybrid Forma"
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
                onChange={(e) => setNothosubspH(e.target.value)}
                placeholder="Hybrid Nothosubsp"
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
                onChange={(e) => setNothoformaH(e.target.value)}
                placeholder="Hybrid Nothoforma"
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
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Type
            </Col>
            <Col sm={contentColumnWidth}>
              <FormControlEditableOrStatic
                editable={isEdit}
                componentClass="select"
                value={ntype}
                onChange={(e) => setNtype(e.target.value)}
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
              {
                isEdit ? (
                  <AsyncTypeahead
                    id="id-genus-autocomplete"
                    isLoading={isLoadingGenus}
                    options={generaOptions}
                    onSearch={doSearchGenus}
                    selected={genusSelected}
                    onChange={handleChangeTypeaheadGenus}
                    placeholder="Start by typing a genus present
                        in the database (case sensitive)"
                  />
                ) : (
                  <FormControl.Static>
                    {getStaticSelectedGenus()}
                  </FormControl.Static>
                )
              }
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
                onChange={(e) => setAggregate(e.target.value)}
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
                placeholder="Vernacular"
                onChange={(e) => setVernacular(e.target.value)}
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
                placeholder="Tribus"
                onChange={(e) => setTribus(e.target.value)}
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
                onChange={(e) => setGenus(e.target.value)}
                placeholder="Genus as text"
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
                onChange={(e) => setSpecies(e.target.value)}
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
                onChange={(e) => setSubsp(e.target.value)}
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
                value={variety || ''}
                onChange={(e) => setVariety(e.target.value)}
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
                onChange={(e) => setSubvar(e.target.value)}
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
                onChange={(e) => setForma(e.target.value)}
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
                onChange={(e) => setNothosubsp(e.target.value)}
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
                onChange={(e) => setNothoforma(e.target.value)}
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
                onChange={(e) => setProles(e.target.value)}
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
                onChange={(e) => setUnranked(e.target.value)}
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
                onChange={(e) => setAuthors(e.target.value)}
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
                onChange={(e) => setPublication(e.target.value)}
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
};
SpeciesRecordDetailsName.defaultProps = {
  nomenRecord: {},
  genusReference: [],
  isEdit: false,
};
