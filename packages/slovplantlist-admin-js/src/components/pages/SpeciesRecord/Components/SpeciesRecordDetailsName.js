import React, { useEffect, useState } from 'react';

import {
  MenuItem, Paper, FormControlLabel, Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import SpeciesPropType from 'components/propTypes/species';

import {
  AdminTextField, AdminAutocompleteAsync, DividerSpaced,
} from '@ibot/components';
import { hooks } from '@ibot/core';

import { genusFacade } from 'facades';
import config from 'config/config';
import { useSelector } from 'react-redux';

const {
  mappings: {
    losType: ntypesConfig,
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

const useStyles = makeStyles((theme) => ({
  hybridPaper: {
    padding: theme.spacing(1),
  },
}));

const SpeciesRecordDetailsName = ({
  nomenRecord = {},
  genusReference = {},
  onChangeData,
  onChangeGenus,
}) => {
  const classes = useStyles();
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
    options: generaOptions,
    loading: isLoadingGenus,
    handleFetch: handleFetchGenus,
    handleChange: handleChangeGenus,
  } = hooks.useAsyncAutocomplete(
    searchGenusByTerm, accessToken, genusReference,
    {
      callbackFunction: onChangeGenus,
    },
  );

  const handleChangeInput = (e) => {
    const { id, name, value } = e.target;
    const prop = id || name;
    onChangeData({ [prop]: value });
  };

  const handleChangeCheckbox = (e) => {
    onChangeData({ [e.target.id]: e.target.checked });
  };

  const {
    id: genusSelectedId,
  } = genusSelected || {};
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
      <Paper variant="outlined" className={classes.hybridPaper}>
        <AdminTextField
          id="genusH"
          label="Hybrid Genus"
          value={genusH || ''}
          onChange={handleChangeInput}
        />
        <AdminTextField
          id="speciesH"
          label="Hybrid Species"
          value={speciesH || ''}
          onChange={handleChangeInput}
        />
        <AdminTextField
          id="subspH"
          label="Hybrid Subsp"
          value={subspH || ''}
          onChange={handleChangeInput}
        />
        <AdminTextField
          id="varH"
          label="Hybrid Var"
          value={varH || ''}
          onChange={handleChangeInput}
        />
        <AdminTextField
          id="subvarH"
          label="Hybrid Subvar"
          value={subvarH || ''}
          onChange={handleChangeInput}
        />
        <AdminTextField
          id="formaH"
          label="Hybrid Forma"
          value={formaH || ''}
          onChange={handleChangeInput}
        />
        <AdminTextField
          id="nothosubspH"
          label="Hybrid Nothosubsp"
          value={nothosubspH || ''}
          onChange={handleChangeInput}
        />
        <AdminTextField
          id="nothoformaH"
          label="Hybrid Nothoforma"
          value={nothoformaH || ''}
          onChange={handleChangeInput}
        />
        <AdminTextField
          id="authorsH"
          label="Hybrid Authors"
          value={authorsH || ''}
          onChange={handleChangeInput}
        />
      </Paper>
    );
  };

  return (
    <>
      <AdminTextField
        select
        id="ntype"
        name="ntype"
        label="Name status"
        value={ntype || ''}
        onChange={handleChangeInput}
      >
        {Object.keys(ntypesConfig).map((t) => (
          <MenuItem value={t} key={t}>{ntypesConfig[t].text}</MenuItem>
        ))}
      </AdminTextField>
      <DividerSpaced />
      <AdminTextField
        readonly
        label="Family APG"
        value={familyApg || '-'}
      />
      <AdminTextField
        readonly
        label="Family"
        value={family || '-'}
      />
      <AdminAutocompleteAsync
        id="id-genus"
        label="Genus (reference)"
        options={generaOptions}
        value={genusSelected}
        loading={isLoadingGenus}
        onChange={handleChangeGenus}
        onInputChange={handleFetchGenus}
      />
      <AdminTextField
        id="aggregate"
        label="Aggregate"
        value={aggregate || ''}
        onChange={handleChangeInput}
      />
      <DividerSpaced />
      <AdminTextField
        id="vernacular"
        label="Vernacular"
        value={vernacular || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="tribus"
        label="Tribus"
        value={tribus || ''}
        onChange={handleChangeInput}
      />
      <DividerSpaced />
      <AdminTextField
        id="genus"
        label="Genus (text)"
        value={genus || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="species"
        label="Species"
        value={species || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="subsp"
        label="Subsp"
        value={subsp || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="var"
        label="Var"
        value={varieta || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="subvar"
        label="Subvar"
        value={subvar || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="forma"
        label="Forma"
        value={forma || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="nothosubsp"
        label="Nothosubsp"
        value={nothosubsp || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="nothoforma"
        label="Nothoforma"
        value={nothoforma || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="proles"
        label="Proles"
        value={proles || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="unranked"
        label="Unranked"
        value={unranked || ''}
        onChange={handleChangeInput}
      />
      <AdminTextField
        id="authors"
        label="Authors"
        value={authors || ''}
        onChange={handleChangeInput}
      />
      <FormControlLabel
        control={(
          <Checkbox
            id="hybrid"
            checked={hybrid || false}
            onChange={handleChangeCheckbox}
            color="primary"
          />
        )}
        label="Hybrid"
      />
      {
        renderHybridFields()
      }
      <DividerSpaced />
      <AdminTextField
        id="publication"
        label="Publication"
        value={publication || ''}
        onChange={handleChangeInput}
      />
    </>
  );
};

export default SpeciesRecordDetailsName;

SpeciesRecordDetailsName.propTypes = {
  nomenRecord: SpeciesPropType.type,
  genusReference: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
  onChangeData: PropTypes.func.isRequired,
  onChangeGenus: PropTypes.func.isRequired,
};
SpeciesRecordDetailsName.defaultProps = {
  nomenRecord: {},
  genusReference: {},
};
