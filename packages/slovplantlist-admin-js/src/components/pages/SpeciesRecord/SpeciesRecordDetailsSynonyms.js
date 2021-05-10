import React, { useEffect, useState } from 'react';

import {
  Col, Panel,
  FormGroup, ControlLabel,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import SpeciesType from 'components/propTypes/species';

import { LosNameList } from '@ibot/components';
import { hooks } from '@ibot/core';
import { species as speciesUtils } from '@ibot/utils';

import AsyncTypeaheadOrStatic from 'components/segments/AsyncTypeaheadOrStatic';
import { speciesFacade } from 'facades';
import config from 'config/config';

const { useAsyncTypeahead } = hooks;
const {
  constants: {
    labelColumnWidth,
    contentColumnWidth,
  },
} = config;

const searchSpeciesByQuery = (query, accessToken) => (
  speciesFacade.getAllSpeciesBySearchTerm(
    query, accessToken, (l) => ({
      id: l.id,
      label: speciesUtils.listOfSpeciesString(l),
    }),
  )
);

const SpeciesRecordDetailsSynonyms = ({
  recordId,
  acceptedNames = [],
  basionymReference = [],
  replacedReference = [],
  nomenNovumReference = [],
  parentCombinationReference = [],
  taxonPositionReference = [],
  isEdit = false,
}) => {
  const [basionymFor, setBasionymFor] = useState([]);
  const [replacedFor, setReplacedFor] = useState([]);
  const [nomenNovumFor, setNomenNovumFor] = useState([]);
  const [parentCombinationFor, setParentCombinationFor] = useState([]);
  const [taxonPositionFor, setTaxonPositionFor] = useState([]);

  const accessToken = useSelector((state) => state.authentication.accessToken);

  const {
    selected: selectedBasionym,
    isLoading: isLoadingBasionym,
    results: optionsBasionym,
    doSearch: doSearchBasionym,
    handleChangeTypeahead: handleChangeTypeaheadBasionym,
    getStaticSelected: getStaticSelectedBasionym,
  } = useAsyncTypeahead(searchSpeciesByQuery, basionymReference, accessToken);

  const {
    selected: selectedReplaced,
    isLoading: isLoadingReplaced,
    results: optionsReplaced,
    doSearch: doSearchReplaced,
    handleChangeTypeahead: handleChangeTypeaheadReplaced,
    getStaticSelected: getStaticSelectedReplaced,
  } = useAsyncTypeahead(searchSpeciesByQuery, replacedReference, accessToken);

  const {
    selected: selectedNomenNovum,
    isLoading: isLoadingNomenNovum,
    results: optionsNomenNovum,
    doSearch: doSearchNomenNovum,
    handleChangeTypeahead: handleChangeTypeaheadNomenNovum,
    getStaticSelected: getStaticSelectedNomenNovum,
  } = useAsyncTypeahead(searchSpeciesByQuery, nomenNovumReference, accessToken);

  const {
    selected: selectedParentCombination,
    isLoading: isLoadingParentCombination,
    results: optionsParentCombination,
    doSearch: doSearchParentCombination,
    handleChangeTypeahead: handleChangeTypeaheadParentCombination,
    getStaticSelected: getStaticSelectedParentCombination,
  } = useAsyncTypeahead(
    searchSpeciesByQuery, parentCombinationReference, accessToken,
  );

  const {
    selected: selectedTaxonPosition,
    isLoading: isLoadingTaxonPosition,
    results: optionsTaxonPosition,
    doSearch: doSearchTaxonPosition,
    handleChangeTypeahead: handleChangeTypeaheadTaxonPosition,
    getStaticSelected: getStaticSelectedTaxonPosition,
  } = useAsyncTypeahead(
    searchSpeciesByQuery, taxonPositionReference, accessToken,
  );

  useEffect(() => {
    const fetchForRelations = async () => {
      if (recordId) {
        const {
          basionymFor: bf, replacedFor: rf, nomenNovumFor: nnf,
          parentCombinationFor: pcf, taxonPositionFor: tpf,
        } = await speciesFacade.getForRelations(recordId, accessToken);

        setBasionymFor(bf);
        setReplacedFor(rf);
        setNomenNovumFor(nnf);
        setParentCombinationFor(pcf);
        setTaxonPositionFor(tpf);
      }
    };

    fetchForRelations();
  }, [recordId, accessToken]);

  return (
    <>
      <Panel>
        <Panel.Body>
          <FormGroup controlId="accepted" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Accepted name(s)
            </Col>
            <Col xs={contentColumnWidth}>
              <LosNameList
                list={acceptedNames.map(({ parent }) => parent)}
              />
            </Col>
          </FormGroup>
        </Panel.Body>
      </Panel>
      <Panel>
        <Panel.Body>
          <FormGroup controlId="selectedBasionym" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Basionym
            </Col>
            <Col sm={contentColumnWidth}>
              <AsyncTypeaheadOrStatic
                id="basionym-autocomplete"
                editable={isEdit}
                isLoading={isLoadingBasionym}
                options={optionsBasionym}
                onSearch={doSearchBasionym}
                selected={selectedBasionym}
                onChange={handleChangeTypeaheadBasionym}
                staticVal={getStaticSelectedBasionym()}
                placeholder="Start by typing a name present
                  in the database (case sensitive)"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="selectedReplaced" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Replaced name
            </Col>
            <Col sm={contentColumnWidth}>
              <AsyncTypeaheadOrStatic
                id="replaced-autocomplete"
                editable={isEdit}
                isLoading={isLoadingReplaced}
                options={optionsReplaced}
                onSearch={doSearchReplaced}
                selected={selectedReplaced}
                onChange={handleChangeTypeaheadReplaced}
                staticVal={getStaticSelectedReplaced()}
                placeholder="Start by typing a name present
                  in the database (case sensitive)"
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="selectedNomenNovum" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Nomen novum
            </Col>
            <Col sm={contentColumnWidth}>
              <AsyncTypeaheadOrStatic
                id="nomen-novum-autocomplete"
                editable={isEdit}
                isLoading={isLoadingNomenNovum}
                options={optionsNomenNovum}
                onSearch={doSearchNomenNovum}
                selected={selectedNomenNovum}
                onChange={handleChangeTypeaheadNomenNovum}
                staticVal={getStaticSelectedNomenNovum()}
                placeholder="Start by typing a name present
                  in the database (case sensitive)"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="selectedParentCombination" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Parent combination
            </Col>
            <Col sm={contentColumnWidth}>
              <AsyncTypeaheadOrStatic
                id="parent-combination-autocomplete"
                editable={isEdit}
                isLoading={isLoadingParentCombination}
                options={optionsParentCombination}
                onSearch={doSearchParentCombination}
                selected={selectedParentCombination}
                onChange={handleChangeTypeaheadParentCombination}
                staticVal={getStaticSelectedParentCombination()}
                placeholder="Start by typing a name present
                  in the database (case sensitive)"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="selectedTaxonPosition" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Taxon position
            </Col>
            <Col sm={contentColumnWidth}>
              <AsyncTypeaheadOrStatic
                id="taxon-position-autocomplete"
                editable={isEdit}
                isLoading={isLoadingTaxonPosition}
                options={optionsTaxonPosition}
                onSearch={doSearchTaxonPosition}
                selected={selectedTaxonPosition}
                onChange={handleChangeTypeaheadTaxonPosition}
                staticVal={getStaticSelectedTaxonPosition()}
                placeholder="Start by typing a name present
                  in the database (case sensitive)"
              />
            </Col>
          </FormGroup>
        </Panel.Body>
      </Panel>
      <Panel>
        <Panel.Body>
          <FormGroup controlId="basionymFor" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Basionym for
            </Col>
            <Col xs={contentColumnWidth}>
              <LosNameList
                list={basionymFor}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="replacedFor" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Replaced name for
            </Col>
            <Col xs={contentColumnWidth}>
              <LosNameList
                list={replacedFor}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="nomenNovumFor" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Nomen novum for
            </Col>
            <Col xs={contentColumnWidth}>
              <LosNameList
                list={nomenNovumFor}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="parentCombinationFor" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Parent combination for
            </Col>
            <Col xs={contentColumnWidth}>
              <LosNameList
                list={parentCombinationFor}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="taxonPositionFor" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Taxon position for
            </Col>
            <Col xs={contentColumnWidth}>
              <LosNameList
                list={taxonPositionFor}
              />
            </Col>
          </FormGroup>
        </Panel.Body>
      </Panel>
    </>
  );
};

export default SpeciesRecordDetailsSynonyms;

SpeciesRecordDetailsSynonyms.propTypes = {
  recordId: PropTypes.number,
  isEdit: PropTypes.bool,
  acceptedNames: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    parent: SpeciesType.type.isRequired,
  })),
  basionymReference: PropTypes.arrayOf(SpeciesType.type),
  replacedReference: PropTypes.arrayOf(SpeciesType.type),
  nomenNovumReference: PropTypes.arrayOf(SpeciesType.type),
  taxonPositionReference: PropTypes.arrayOf(SpeciesType.type),
  parentCombinationReference: PropTypes.arrayOf(SpeciesType.type),
};
SpeciesRecordDetailsSynonyms.defaultProps = {
  recordId: undefined,
  isEdit: false,
  acceptedNames: [],
  basionymReference: [],
  replacedReference: [],
  nomenNovumReference: [],
  taxonPositionReference: [],
  parentCombinationReference: [],
};
