import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import SpeciesType from 'components/propTypes/species';

import {
  AdminAutocompleteAsync,
  NameList,
  TitledSection,
  LosName,
} from '@ibot/components';
import { hooks } from '@ibot/core';
import { species as speciesUtils } from '@ibot/utils';

import { speciesFacade } from 'facades';

const { listOfSpeciesIdLabelFormatter } = speciesUtils;

const searchSpeciesByQuery = (query, accessToken) => (
  speciesFacade.getAllSpeciesBySearchTerm(
    query, accessToken, listOfSpeciesIdLabelFormatter,
  )
);

const listNameFormatter = (n) => ({
  id: n.id,
  name: <LosName data={n} />,
});

const SpeciesRecordDetailsAssociations = ({
  recordId,
  acceptedNames = [],
  basionymReference = {},
  replacedReference = {},
  nomenNovumReference = {},
  parentCombinationReference = {},
  taxonPositionReference = {},
  onChangeData,
}) => {
  const [basionymFor, setBasionymFor] = useState([]);
  const [replacedFor, setReplacedFor] = useState([]);
  const [nomenNovumFor, setNomenNovumFor] = useState([]);
  const [parentCombinationFor, setParentCombinationFor] = useState([]);
  const [taxonPositionFor, setTaxonPositionFor] = useState([]);

  const accessToken = useSelector((state) => state.authentication.accessToken);

  const handleChangeDataBasionym = (changed) => (
    onChangeData({ basionym: changed })
  );
  const handleChangeDataReplaced = (changed) => (
    onChangeData({ replaced: changed })
  );
  const handleChangeDataNomenNovum = (changed) => (
    onChangeData({ nomenNovum: changed })
  );
  const handleChangeDataParentCombination = (changed) => (
    onChangeData({ parentCombination: changed })
  );
  const handleChangeDataTaxonPosition = (changed) => (
    onChangeData({ taxonPosition: changed })
  );

  const {
    selected: selectedBasionym,
    options: optionsBasionym,
    loading: isLoadingBasionym,
    handleFetch: handleFetchBasionym,
    handleChange: handleChangeBasionym,
  } = hooks.useAsyncAutocomplete(
    searchSpeciesByQuery, accessToken, basionymReference,
    {
      initialMapper: listOfSpeciesIdLabelFormatter,
      callbackFunction: handleChangeDataBasionym,
    },
  );

  const {
    selected: selectedReplaced,
    loading: isLoadingReplaced,
    options: optionsReplaced,
    handleFetch: handleFetchReplaced,
    handleChange: handleChangeReplaced,
  } = hooks.useAsyncAutocomplete(
    searchSpeciesByQuery, accessToken, replacedReference,
    {
      initialMapper: listOfSpeciesIdLabelFormatter,
      callbackFunction: handleChangeDataReplaced,
    },
  );

  const {
    selected: selectedNomenNovum,
    loading: isLoadingNomenNovum,
    options: optionsNomenNovum,
    handleFetch: handleFetchNomenNovum,
    handleChange: handleChangeNomenNovum,
  } = hooks.useAsyncAutocomplete(
    searchSpeciesByQuery, accessToken, nomenNovumReference,
    {
      initialMapper: listOfSpeciesIdLabelFormatter,
      callbackFunction: handleChangeDataNomenNovum,
    },
  );

  const {
    selected: selectedParentCombination,
    loading: isLoadingParentCombination,
    options: optionsParentCombination,
    handleFetch: handleFetchParentCombination,
    handleChange: handleChangeParentCombination,
  } = hooks.useAsyncAutocomplete(
    searchSpeciesByQuery, accessToken, parentCombinationReference,
    {
      initialMapper: listOfSpeciesIdLabelFormatter,
      callbackFunction: handleChangeDataParentCombination,
    },
  );

  const {
    selected: selectedTaxonPosition,
    loading: isLoadingTaxonPosition,
    options: optionsTaxonPosition,
    handleFetch: handleFetchTaxonPosition,
    handleChange: handleChangeTaxonPosition,
  } = hooks.useAsyncAutocomplete(
    searchSpeciesByQuery, accessToken, taxonPositionReference,
    {
      initialMapper: listOfSpeciesIdLabelFormatter,
      callbackFunction: handleChangeDataTaxonPosition,
    },
  );

  useEffect(() => {
    const fetchForRelations = async () => {
      if (recordId) {
        const {
          basionymFor: bf, replacedFor: rf, nomenNovumFor: nnf,
          parentCombinationFor: pcf, taxonPositionFor: tpf,
        } = await speciesFacade.getForRelations(
          recordId, accessToken, listNameFormatter,
        );

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
      <TitledSection title="Accepted name(s)" variant="outlined">
        <NameList
          list={acceptedNames.map(({ parent }) => ({
            id: parent.id,
            name: <LosName data={parent} />,
          }))}
        />
      </TitledSection>
      <AdminAutocompleteAsync
        id="basionym"
        label="Basionym"
        options={optionsBasionym}
        value={selectedBasionym}
        loading={isLoadingBasionym}
        onChange={handleChangeBasionym}
        onInputChange={handleFetchBasionym}
      />
      <AdminAutocompleteAsync
        id="replaced"
        label="Replaced name"
        options={optionsReplaced}
        value={selectedReplaced}
        loading={isLoadingReplaced}
        onChange={handleChangeReplaced}
        onInputChange={handleFetchReplaced}
      />
      <AdminAutocompleteAsync
        id="nomen-novum"
        label="Nomen Novum"
        options={optionsNomenNovum}
        value={selectedNomenNovum}
        loading={isLoadingNomenNovum}
        onChange={handleChangeNomenNovum}
        onInputChange={handleFetchNomenNovum}
      />
      <AdminAutocompleteAsync
        id="parent-combination"
        label="Parent Combination"
        options={optionsParentCombination}
        value={selectedParentCombination}
        loading={isLoadingParentCombination}
        onChange={handleChangeParentCombination}
        onInputChange={handleFetchParentCombination}
      />
      <AdminAutocompleteAsync
        id="taxon-position"
        label="TaxonPosition"
        options={optionsTaxonPosition}
        value={selectedTaxonPosition}
        loading={isLoadingTaxonPosition}
        onChange={handleChangeTaxonPosition}
        onInputChange={handleFetchTaxonPosition}
      />
      <TitledSection title="Basionym for" variant="outlined">
        <NameList
          list={basionymFor}
        />
      </TitledSection>
      <TitledSection title="Replaced name for" variant="outlined">
        <NameList
          list={replacedFor}
        />
      </TitledSection>
      <TitledSection title="Nomen novum for" variant="outlined">
        <NameList
          list={nomenNovumFor}
        />
      </TitledSection>
      <TitledSection title="Parent combination for" variant="outlined">
        <NameList
          list={parentCombinationFor}
        />
      </TitledSection>
      <TitledSection title="Taxon position for" variant="outlined">
        <NameList
          list={taxonPositionFor}
        />
      </TitledSection>
    </>
  );
};

export default SpeciesRecordDetailsAssociations;

SpeciesRecordDetailsAssociations.propTypes = {
  recordId: PropTypes.number,
  acceptedNames: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    parent: SpeciesType.type.isRequired,
  })),
  basionymReference: SpeciesType.type,
  replacedReference: SpeciesType.type,
  nomenNovumReference: SpeciesType.type,
  taxonPositionReference: SpeciesType.type,
  parentCombinationReference: SpeciesType.type,
  onChangeData: PropTypes.func.isRequired,
};
SpeciesRecordDetailsAssociations.defaultProps = {
  recordId: undefined,
  acceptedNames: [],
  basionymReference: {},
  replacedReference: {},
  nomenNovumReference: {},
  taxonPositionReference: {},
  parentCombinationReference: {},
};
