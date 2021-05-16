import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import {
  Panel, Col,
  FormGroup, ControlLabel,
} from 'react-bootstrap';

import PropTypes from 'prop-types';

import { species as speciesUtils } from '@ibot/utils';

import AddableList from 'components/segments/AddableList';
import { speciesFacade } from 'facades';

import config from 'config/config';
import { notifications, sorterUtils } from 'utils';

import {
  NomenclatoricSynonymListItem,
  TaxonomicSynonymListItem,
  InvalidSynonymListItem,
  MisidentifiedSynonymListItem,
  OtherSynonymListItem,
} from './items';

const {
  constants: {
    labelColumnWidth,
    contentColumnWidth,
  },
  mappings: {
    synonym: {
      nomenclatoric: configNomenclatoric,
      taxonomic: configTaxonomic,
      invalid: configInvalid,
      misidentification: configMisidentification,
      otherSynonyms: configOtherSynonym,
    },
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

const createNewSynonymToList = async (
  selected,
  idParent,
  type,
  accessToken,
) => {
  // when adding synonyms to a new record, idParent is undefined
  const { id: selectedId } = selected;
  const synonymObj = speciesFacade.createSynonym(idParent, selectedId, type);
  const species = await speciesFacade.getSpeciesById(selectedId, accessToken);
  return {
    ...synonymObj,
    synonym: species,
  };
};

const synonymsChanged = (list) => {
  list.sort(sorterUtils.synonymSorterLex);
  return list.map((item, i) => ({ ...item, rorder: i + 1 }));
};

const addSynonym = async (
  selected, collection, recordId, type, accessToken,
) => {
  if (!selected) {
    return undefined;
  }
  const newSynonym = await createNewSynonymToList(
    selected, recordId, type, accessToken,
  );
  if (collection.find((s) => s.synonym.id === selected.id)) {
    notifications.warning('The item already exists in the list');
    return undefined;
  }
  collection.push(newSynonym);
  return synonymsChanged(collection);
};

const removeSynonym = (rowId, collection) => {
  const synonymsWithoutRemoved = collection.filter((_, i) => i !== rowId);
  return synonymsChanged(synonymsWithoutRemoved);
};

const synonymTransition = (rowId, fromCollection, toCollection, newNumType) => {
  const selected = fromCollection[rowId];
  selected.syntype = newNumType;
  // add selected to toList
  toCollection.push(selected);
  const toCollectionChanged = synonymsChanged(toCollection);

  const synonymsFromWORemoved = fromCollection.filter((s, i) => i !== rowId);
  const fromCollectionChanged = synonymsChanged(synonymsFromWORemoved);
  return {
    fromCollectionChanged,
    toCollectionChanged,
  };
};

const SpeciesRecordDetailsSynonyms = ({
  recordId,
  isEdit = false,
}) => {
  const [nomenclatoricSynonyms, setNomenclatoricSynonyms] = useState([]);
  const [taxonomicSynonyms, setTaxonomicSynonyms] = useState([]);
  const [invalidDesignations, setInvalidDesignations] = useState([]);
  const [misidentifications, setMisidentifications] = useState([]);
  const [otherSynonyms, setOtherSynonyms] = useState([]);

  const accessToken = useSelector((state) => state.authentication.accessToken);

  useEffect(() => {
    const fetchSynonyms = async () => {
      if (recordId) {
        const {
          nomenclatoricSynonyms: ns, taxonomicSynonyms: ts,
          invalidDesignations: idg, misidentifications: m, otherSynonyms: os,
        } = await speciesFacade.getSynonyms(recordId, accessToken);
        setNomenclatoricSynonyms(ns);
        setTaxonomicSynonyms(ts);
        setInvalidDesignations(idg);
        setMisidentifications(m);
        setOtherSynonyms(os);
      }
    };

    fetchSynonyms();
  }, [recordId, accessToken]);

  const handleAddNomenclatoric = async (selected) => {
    const changedSynonyms = await addSynonym(
      selected, nomenclatoricSynonyms, recordId, configNomenclatoric.numType,
      accessToken,
    );
    setNomenclatoricSynonyms(changedSynonyms);
  };

  const handleRemoveNomenclatoric = (rowId) => {
    const changedSynonyms = removeSynonym(rowId, nomenclatoricSynonyms);
    setNomenclatoricSynonyms(changedSynonyms);
  };

  const handleAddTaxonomic = async (selected) => {
    const changedSynonyms = await addSynonym(
      selected, taxonomicSynonyms, recordId, configTaxonomic.numType,
      accessToken,
    );
    setTaxonomicSynonyms(changedSynonyms);
  };

  const handleRemoveTaxonomic = (rowId) => {
    const changedSynonyms = removeSynonym(rowId, taxonomicSynonyms);
    setTaxonomicSynonyms(changedSynonyms);
  };

  const handleAddInvalid = async (selected) => {
    const changedSynonyms = await addSynonym(
      selected, invalidDesignations, recordId, configInvalid.numType,
      accessToken,
    );
    setInvalidDesignations(changedSynonyms);
  };

  const handleRemoveInvalid = (rowId) => {
    const changedSynonyms = removeSynonym(rowId, invalidDesignations);
    setInvalidDesignations(changedSynonyms);
  };

  const handleAddMisidentified = async (selected) => {
    const changedSynonyms = await addSynonym(
      selected, misidentifications, recordId, configMisidentification.numType,
      accessToken,
    );
    setMisidentifications(changedSynonyms);
  };

  const handleRemoveMisidentified = (rowId) => {
    const changedSynonyms = removeSynonym(rowId, misidentifications);
    setMisidentifications(changedSynonyms);
  };

  const handleAddOther = async (selected) => {
    const changedSynonyms = await addSynonym(
      selected, otherSynonyms, recordId, configOtherSynonym.numType,
      accessToken,
    );
    setOtherSynonyms(changedSynonyms);
  };

  const handleRemoveOther = (rowId) => {
    const changedSynonyms = removeSynonym(rowId, otherSynonyms);
    setOtherSynonyms(changedSynonyms);
  };

  // --- transition handlers --- //

  const handleNomenToTax = (rowId) => {
    const { fromCollectionChanged, toCollectionChanged } = synonymTransition(
      rowId, nomenclatoricSynonyms, taxonomicSynonyms, configTaxonomic.numType,
    );
    setNomenclatoricSynonyms(fromCollectionChanged);
    setTaxonomicSynonyms(toCollectionChanged);
  };

  const handleNomenToInv = (rowId) => {
    const { fromCollectionChanged, toCollectionChanged } = synonymTransition(
      rowId, nomenclatoricSynonyms, invalidDesignations, configInvalid.numType,
    );
    setNomenclatoricSynonyms(fromCollectionChanged);
    setInvalidDesignations(toCollectionChanged);
  };

  const handleTaxToNomen = (rowId) => {
    const { fromCollectionChanged, toCollectionChanged } = synonymTransition(
      rowId, taxonomicSynonyms, nomenclatoricSynonyms,
      configNomenclatoric.numType,
    );
    setTaxonomicSynonyms(fromCollectionChanged);
    setNomenclatoricSynonyms(toCollectionChanged);
  };

  const handleTaxToInv = (rowId) => {
    const { fromCollectionChanged, toCollectionChanged } = synonymTransition(
      rowId, taxonomicSynonyms, invalidDesignations, configInvalid.numType,
    );
    setTaxonomicSynonyms(fromCollectionChanged);
    setInvalidDesignations(toCollectionChanged);
  };

  const handleInvToNomen = (rowId) => {
    const { fromCollectionChanged, toCollectionChanged } = synonymTransition(
      rowId, invalidDesignations, nomenclatoricSynonyms,
      configNomenclatoric.numType,
    );
    setInvalidDesignations(fromCollectionChanged);
    setNomenclatoricSynonyms(toCollectionChanged);
  };

  const handleInvToTax = (rowId) => {
    const { fromCollectionChanged, toCollectionChanged } = synonymTransition(
      rowId, invalidDesignations, taxonomicSynonyms, configTaxonomic.numType,
    );
    setInvalidDesignations(fromCollectionChanged);
    setTaxonomicSynonyms(toCollectionChanged);
  };

  const handleChangeMisidentificationAuthor = (rowId, value) => {
    const ms = [...misidentifications];
    ms[rowId].misidentificationAuthor = value;
    setMisidentifications(ms);
  };

  return (
    <>
      <Panel>
        <Panel.Body>
          <FormGroup controlId="nomenclatoric-synonyms" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Nomenclatoric Synonyms
            </Col>
            <Col xs={contentColumnWidth}>
              <AddableList
                id="nomenclatoric-synonyms-autocomplete"
                async
                editable={isEdit}
                data={nomenclatoricSynonyms}
                onSearch={searchSpeciesByQuery}
                accessToken={accessToken}
                onAddItemToList={handleAddNomenclatoric}
                onRowDelete={handleRemoveNomenclatoric}
                itemComponent={NomenclatoricSynonymListItem}
                // props specific to itemComponent
                onChangeToTaxonomic={handleNomenToTax}
                onChangeToInvalid={handleNomenToInv}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="taxonomic-synonyms" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Taxonomic Synonyms
            </Col>
            <Col xs={contentColumnWidth}>
              <AddableList
                id="taxonomic-synonyms-autocomplete"
                async
                editable={isEdit}
                data={taxonomicSynonyms}
                onSearch={searchSpeciesByQuery}
                accessToken={accessToken}
                onAddItemToList={handleAddTaxonomic}
                onRowDelete={handleRemoveTaxonomic}
                itemComponent={TaxonomicSynonymListItem}
                // props specific to itemComponent
                onChangeToNomenclatoric={handleTaxToNomen}
                onChangeToInvalid={handleTaxToInv}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="invalid-designations" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Invalid Designations
            </Col>
            <Col xs={contentColumnWidth}>
              <AddableList
                id="invalid-designations-autocomplete"
                async
                editable={isEdit}
                data={invalidDesignations}
                onSearch={searchSpeciesByQuery}
                accessToken={accessToken}
                onAddItemToList={handleAddInvalid}
                onRowDelete={handleRemoveInvalid}
                itemComponent={InvalidSynonymListItem}
                // props specific to itemComponent
                onChangeToNomenclatoric={handleInvToNomen}
                onChangeToTaxonomic={handleInvToTax}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="misidentifications" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Misidentifications
            </Col>
            <Col xs={contentColumnWidth}>
              <AddableList
                id="misidentifications-autocomplete"
                async
                editable={isEdit}
                data={misidentifications}
                onSearch={searchSpeciesByQuery}
                accessToken={accessToken}
                onAddItemToList={handleAddMisidentified}
                onRowDelete={handleRemoveMisidentified}
                itemComponent={MisidentifiedSynonymListItem}
                // props specific to itemComponent
                onChangeAuthor={handleChangeMisidentificationAuthor}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="other-synonyms" bsSize="sm">
            <Col componentClass={ControlLabel} sm={labelColumnWidth}>
              Other Synonyms
            </Col>
            <Col xs={contentColumnWidth}>
              <AddableList
                id="other-synonyms-autocomplete"
                async
                editable={isEdit}
                data={otherSynonyms}
                onSearch={searchSpeciesByQuery}
                accessToken={accessToken}
                onAddItemToList={handleAddOther}
                onRowDelete={handleRemoveOther}
                itemComponent={OtherSynonymListItem}
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
};
SpeciesRecordDetailsSynonyms.defaultProps = {
  recordId: undefined,
  isEdit: false,
};
