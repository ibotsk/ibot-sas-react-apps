import React from 'react';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import SynonymType from 'components/propTypes/synonym';

import { TitledSection, AdminAddableList } from '@ibot/components';
import { species as speciesUtils } from '@ibot/utils';

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
  mappings: {
    synonym: {
      nomenclatoric: configNomenclatoric,
      taxonomic: configTaxonomic,
      invalid: configInvalid,
      misidentification: configMisidentification,
      none: configOtherSynonym,
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

const reorder = (list) => {
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
  return reorder(collection);
};

const removeSynonym = (rowId, collection) => {
  const synonymsWithoutRemoved = collection.filter((_, i) => i !== rowId);
  return reorder(synonymsWithoutRemoved);
};

const synonymTransition = (rowId, fromCollection, toCollection, newNumType) => {
  const selected = fromCollection[rowId];
  selected.syntype = newNumType;
  // add selected to toList
  toCollection.push(selected);
  const toCollectionChanged = reorder(toCollection);

  const synonymsFromWORemoved = fromCollection.filter((s, i) => i !== rowId);
  const fromCollectionChanged = reorder(synonymsFromWORemoved);
  return {
    fromCollectionChanged,
    toCollectionChanged,
  };
};

const SpeciesRecordDetailsSynonyms = ({
  recordId,
  data = {},
  onChangeData,
}) => {
  const accessToken = useSelector((state) => state.authentication.accessToken);

  const {
    nomenclatoricSynonyms = [],
    taxonomicSynonyms = [],
    invalidDesignations = [],
    misidentifications = [],
    otherSynonyms = [],
  } = data;

  const handleChangeNomenclatoric = (changed) => (
    onChangeData({ nomenclatoricSynonyms: changed })
  );
  const handleChangeTaxonomic = (changed) => (
    onChangeData({ taxonomicSynonyms: changed })
  );
  const handleChangeInvalid = (changed) => (
    onChangeData({ invalidDesignations: changed })
  );
  const handleChangeMisidentifications = (changed) => (
    onChangeData({ misidentifications: changed })
  );
  const handleChangeOther = (changed) => (
    onChangeData({ otherSynonyms: changed })
  );

  const handleAddNomenclatoric = async (selected) => {
    const changedSynonyms = await addSynonym(
      selected, nomenclatoricSynonyms, recordId, configNomenclatoric.numType,
      accessToken,
    );
    handleChangeNomenclatoric(changedSynonyms);
  };

  const handleRemoveNomenclatoric = (rowId) => {
    const changedSynonyms = removeSynonym(rowId, nomenclatoricSynonyms);
    handleChangeNomenclatoric(changedSynonyms);
  };

  const handleAddTaxonomic = async (selected) => {
    const changedSynonyms = await addSynonym(
      selected, taxonomicSynonyms, recordId, configTaxonomic.numType,
      accessToken,
    );
    handleChangeTaxonomic(changedSynonyms);
  };

  const handleRemoveTaxonomic = (rowId) => {
    const changedSynonyms = removeSynonym(rowId, taxonomicSynonyms);
    handleChangeTaxonomic(changedSynonyms);
  };

  const handleAddInvalid = async (selected) => {
    const changedSynonyms = await addSynonym(
      selected, invalidDesignations, recordId, configInvalid.numType,
      accessToken,
    );
    handleChangeInvalid(changedSynonyms);
  };

  const handleRemoveInvalid = (rowId) => {
    const changedSynonyms = removeSynonym(rowId, invalidDesignations);
    handleChangeInvalid(changedSynonyms);
  };

  const handleAddMisidentified = async (selected) => {
    const changedSynonyms = await addSynonym(
      selected, misidentifications, recordId, configMisidentification.numType,
      accessToken,
    );
    handleChangeMisidentifications(changedSynonyms);
  };

  const handleRemoveMisidentified = (rowId) => {
    const changedSynonyms = removeSynonym(rowId, misidentifications);
    handleChangeMisidentifications(changedSynonyms);
  };

  const handleAddOther = async (selected) => {
    const changedSynonyms = await addSynonym(
      selected, otherSynonyms, recordId, configOtherSynonym.numType,
      accessToken,
    );
    handleChangeOther(changedSynonyms);
  };

  const handleRemoveOther = (rowId) => {
    const changedSynonyms = removeSynonym(rowId, otherSynonyms);
    handleChangeOther(changedSynonyms);
  };

  // --- transition handlers --- //

  const handleNomenToTax = (rowId) => {
    const { fromCollectionChanged, toCollectionChanged } = synonymTransition(
      rowId, nomenclatoricSynonyms, taxonomicSynonyms, configTaxonomic.numType,
    );
    onChangeData({
      nomenclatoricSynonyms: fromCollectionChanged,
      taxonomicSynonyms: toCollectionChanged,
    });
  };

  const handleNomenToInv = (rowId) => {
    const { fromCollectionChanged, toCollectionChanged } = synonymTransition(
      rowId, nomenclatoricSynonyms, invalidDesignations, configInvalid.numType,
    );
    onChangeData({
      nomenclatoricSynonyms: fromCollectionChanged,
      invalidDesignations: toCollectionChanged,
    });
  };

  const handleTaxToNomen = (rowId) => {
    const { fromCollectionChanged, toCollectionChanged } = synonymTransition(
      rowId, taxonomicSynonyms, nomenclatoricSynonyms,
      configNomenclatoric.numType,
    );
    onChangeData({
      taxonomicSynonyms: fromCollectionChanged,
      nomenclatoricSynonyms: toCollectionChanged,
    });
  };

  const handleTaxToInv = (rowId) => {
    const { fromCollectionChanged, toCollectionChanged } = synonymTransition(
      rowId, taxonomicSynonyms, invalidDesignations, configInvalid.numType,
    );
    onChangeData({
      taxonomicSynonyms: fromCollectionChanged,
      invalidDesignations: toCollectionChanged,
    });
  };

  const handleInvToNomen = (rowId) => {
    const { fromCollectionChanged, toCollectionChanged } = synonymTransition(
      rowId, invalidDesignations, nomenclatoricSynonyms,
      configNomenclatoric.numType,
    );
    onChangeData({
      invalidDesignations: fromCollectionChanged,
      nomenclatoricSynonyms: toCollectionChanged,
    });
  };

  const handleInvToTax = (rowId) => {
    const { fromCollectionChanged, toCollectionChanged } = synonymTransition(
      rowId, invalidDesignations, taxonomicSynonyms, configTaxonomic.numType,
    );
    onChangeData({
      invalidDesignations: fromCollectionChanged,
      taxonomicSynonyms: toCollectionChanged,
    });
  };

  const handleChangeMisidentificationAuthor = (rowId, value) => {
    const ms = [...misidentifications];
    ms[rowId].misidentificationAuthor = value;
    handleChangeMisidentifications(ms);
  };

  return (
    <>
      <TitledSection title="Nomenclatoric Synonyms">
        <AdminAddableList
          data={nomenclatoricSynonyms}
          onSearch={searchSpeciesByQuery}
          onAddItemToList={handleAddNomenclatoric}
          onRowDelete={handleRemoveNomenclatoric}
          accessToken={accessToken}
          itemComponent={NomenclatoricSynonymListItem}
        />
      </TitledSection>
      <TitledSection title="Taxonomic Synonyms">
        <AdminAddableList
          data={taxonomicSynonyms}
          onSearch={searchSpeciesByQuery}
          onAddItemToList={handleAddTaxonomic}
          onRowDelete={handleRemoveTaxonomic}
          accessToken={accessToken}
          itemComponent={TaxonomicSynonymListItem}
        />
      </TitledSection>
      <TitledSection title="Invalid Designations">
        <AdminAddableList
          data={invalidDesignations}
          onSearch={searchSpeciesByQuery}
          onAddItemToList={handleAddInvalid}
          onRowDelete={handleRemoveInvalid}
          accessToken={accessToken}
          itemComponent={InvalidSynonymListItem}
        />
      </TitledSection>
      <TitledSection title="Misidentifications">
        <AdminAddableList
          data={misidentifications}
          onSearch={searchSpeciesByQuery}
          onAddItemToList={handleAddMisidentified}
          onRowDelete={handleRemoveMisidentified}
          accessToken={accessToken}
          itemComponent={MisidentifiedSynonymListItem}
        />
      </TitledSection>
      <TitledSection title="Taxonomic Synonyms">
        <AdminAddableList
          data={otherSynonyms}
          onSearch={searchSpeciesByQuery}
          onAddItemToList={handleAddOther}
          onRowDelete={handleRemoveOther}
          accessToken={accessToken}
          itemComponent={OtherSynonymListItem}
        />
      </TitledSection>
      {/* <Panel>
        <Panel.Body> */}
      {/* <FormGroup controlId="nomenclatoric-synonyms" bsSize="sm">
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
          </FormGroup> */}
      {/* <FormGroup controlId="taxonomic-synonyms" bsSize="sm">
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
          </FormGroup> */}
      {/* <FormGroup controlId="invalid-designations" bsSize="sm">
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
          </FormGroup> */}
      {/* <FormGroup controlId="misidentifications" bsSize="sm">
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
          </FormGroup> */}
      {/* <FormGroup controlId="other-synonyms" bsSize="sm">
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
          </FormGroup> */}
      {/* </Panel.Body>
      </Panel> */}
    </>
  );
};

export default SpeciesRecordDetailsSynonyms;

SpeciesRecordDetailsSynonyms.propTypes = {
  recordId: PropTypes.number,
  data: PropTypes.shape({
    nomenclatoricSynonyms: PropTypes.arrayOf(SynonymType.type),
    taxonomicSynonyms: PropTypes.arrayOf(SynonymType.type),
    invalidDesignations: PropTypes.arrayOf(SynonymType.type),
    misidentifications: PropTypes.arrayOf(SynonymType.type),
    otherSynonyms: PropTypes.arrayOf(SynonymType.type),
  }),
  onChangeData: PropTypes.func.isRequired,
};
SpeciesRecordDetailsSynonyms.defaultProps = {
  recordId: undefined,
  data: {},
};
