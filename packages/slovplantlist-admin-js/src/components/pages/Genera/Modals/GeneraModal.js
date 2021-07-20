/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  DialogActions, DialogContent,
  Button, MenuItem,
} from '@material-ui/core';

import PropTypes from 'prop-types';

import {
  NameList, DividerSpaced,
  TitledSection,
  GenusName,
  AdminEditDialog, AdminTextField, AdminAutocompleteAsync,
  AdminDialogTitle, AdminTimestampCheck, AdminAddableList,
  AdminDeleteButton,
} from '@ibot/components';
import { hooks } from '@ibot/core';

import { notifications, sorterUtils } from 'utils';
import { format, generaUtils } from '@ibot/utils';

import config from 'config/config';

import { genusFacade, familiesFacade } from 'facades';

import GenusSynonymListItem from './items/GenusSynonymListItem';

const {
  mappings: {
    genusType: ntypes,
    synonym: synTypes,
  },
} = config;

const {
  getGenusByIdWithRelations,
  saveGenusAndSynonyms,
  getAllGeneraBySearchTermWithAccepted,
} = genusFacade;
const {
  getAllFamiliesBySearchTerm,
  getAllFamiliesApgBySearchTerm,
} = familiesFacade;

const genusIdLabelFormat = (g) => (
  { id: g.id, label: generaUtils.genusString(g) }
);
const genusIdLabelAcceptedFormat = (g) => {
  const idLabel = genusIdLabelFormat(g);
  let accepted;
  if (g.accepted) {
    accepted = g.accepted;
  }
  return {
    ...idLabel,
    accepted,
  };
};

const initialValues = {
  id: undefined,
  ntype: ntypes.A.value,
  name: '',
  authors: '',
  vernacular: '',
  idFamily: undefined,
  idFamilyApg: undefined,
};

const createNewSynonymToList = async (
  selected,
  idParent,
  accessToken,
) => {
  // when adding synonyms to a new record, idParent is undefined
  const { id: selectedId } = selected;
  const synonymObj = genusFacade.createSynonym(
    idParent, selectedId, synTypes.taxonomic.numType,
  );
  const { genus: genusSyn, accepted } = await getGenusByIdWithRelations(
    selectedId, accessToken,
  );
  return {
    ...synonymObj,
    synonym: {
      ...genusSyn,
      accepted,
    },
  };
};

const synonymsChanged = (list) => {
  list.sort(sorterUtils.generaSynonymSorterLex);
  return list.map((item, i) => ({ ...item, rorder: i + 1 }));
};

const searchFamiliesByQuery = (query, accessToken) => (
  getAllFamiliesBySearchTerm(
    query, accessToken, ({ id, name }) => ({
      id,
      label: name,
    }),
  )
);
const searchFamiliesApgByQuery = (query, accessToken) => (
  getAllFamiliesApgBySearchTerm(
    query, accessToken, ({ id, name }) => ({
      id,
      label: name,
    }),
  )
);
const searchGeneraByQuery = (query, accessToken) => (
  getAllGeneraBySearchTermWithAccepted(
    query, accessToken, genusIdLabelAcceptedFormat,
  )
);

const AcceptedNamesList = ({ data }) => (
  <NameList
    list={data.map(({ parent }) => ({
      id: parent.id,
      name: generaUtils.formatGenus(parent.name),
    }))}
  />
);

const GeneraModal = ({
  editId, show, onHide,
}) => {
  const [genus, setGenus] = useState(initialValues);
  const [accepted, setAccepted] = useState([]);
  const [family, setFamily] = useState();
  const [familyApg, setFamilyApg] = useState();

  const [synonyms, setSynonyms] = useState([]);

  const accessToken = useSelector((state) => state.authentication.accessToken);
  const username = useSelector((state) => state.user.username);

  const {
    selected: familySelected,
    options: familyOptions,
    loading: familyLoading,
    handleFetch: familyHandleFetch,
    handleChange: familyHandleChange,
  } = hooks.useAsyncAutocomplete(
    searchFamiliesByQuery, accessToken, family,
    {
      initialMapper: ({ id, name }) => ({ id, label: name }),
      callbackFunction: (({ id }) => setGenus({ ...genus, idFamily: id })),
    },
  );

  const {
    selected: familyApgSelected,
    options: familyApgOptions,
    loading: familyApgLoading,
    handleFetch: familyApgHandleFetch,
    handleChange: familyApgHandleChange,
  } = hooks.useAsyncAutocomplete(
    searchFamiliesApgByQuery, accessToken, familyApg,
    {
      initialMapper: ({ id, name }) => ({ id, label: name }),
      callbackFunction: (({ id }) => setGenus({ ...genus, idFamilyApg: id })),
    },
  );

  const handleEnter = useCallback(() => {
    const fetchGenus = async () => {
      if (editId) {
        const {
          genus: dbGenus,
          accepted: acceptedNames,
          family: f,
          familyApg: fapg,
          synonyms: syns,
        } = await getGenusByIdWithRelations(
          editId, accessToken,
        );

        setGenus(dbGenus);
        setAccepted(acceptedNames);
        setFamily(f);
        setFamilyApg(fapg);
        setSynonyms(syns);
      }
    };

    fetchGenus();
  }, [accessToken, editId]);

  const isGenusInvalid = () => {
    const is = !genus.name && genus.name.length === 0;
    return {
      result: is,
      props: {
        error: is,
        helperText: (is ? 'Must not be empty' : undefined),
      },
    };
  };

  const handleChangeInput = (e) => {
    const { id, name, value } = e.target;
    const prop = id || name;
    setGenus({
      ...genus,
      [prop]: value,
    });
  };

  const handleCheck = () => (
    setGenus({
      ...genus,
      checkedTimestamp: format.timestampISO(),
      checkedBy: username,
    })
  );

  const handleHide = () => {
    setGenus({ ...initialValues });
    setSynonyms([]);
    setFamily({});
    setFamilyApg({});
    onHide();
  };

  const handleSave = async () => {
    if (!isGenusInvalid().result) {
      try {
        await saveGenusAndSynonyms(genus, synonyms, accessToken, false);
        notifications.success('Saved');
        handleHide();
      } catch (error) {
        notifications.error('Error saving');
        throw error;
      }
    } else {
      notifications.error('Genus name and authors must not be empty!');
    }
  };

  const handleDelete = async () => {
    try {
      await genusFacade.deleteGenus(editId, accessToken);
      notifications.success('Deleted');
      handleHide();
    } catch (error) {
      notifications.error('Error while deleting');
      throw error;
    }
  };

  const handleSynonymAddRow = async (selectedGenus) => {
    if (selectedGenus && selectedGenus.id) {
      if (synonyms.find((s) => s.synonym.id === selectedGenus.id)) {
        notifications.warning('The item already exists in the list');
        return;
      }

      const newSynonym = await createNewSynonymToList(
        selectedGenus, editId, accessToken,
      );
      synonyms.push(newSynonym);
      const sorted = synonymsChanged(synonyms);

      setSynonyms(sorted);
    }
  };

  const handleSynonymRemoveRow = (rowId) => {
    const synonymsWithoutRemoved = synonyms.filter((_, i) => i !== rowId);
    const sorted = synonymsChanged(synonymsWithoutRemoved);
    setSynonyms(sorted);
  };

  const {
    ntype, name, authors, vernacular, checkedTimestamp, checkedBy,
  } = genus;

  return (
    <AdminEditDialog
      open={show}
      onEnter={handleEnter}
      onClose={handleHide}
      aria-labelledby="genus-dialog"
    >
      <AdminDialogTitle id="genus-dialog-title" onClose={handleHide}>
        {editId
          ? (
            <>
              {`Edit genus - ID ${editId} - `}
              <GenusName data={genus} isAuthors />
            </>
          )
          : 'Create new genus'}
      </AdminDialogTitle>
      <DialogContent dividers>
        <AdminTextField
          select
          id="ntype"
          name="ntype"
          label="Genus status"
          value={ntype || ''}
          onChange={handleChangeInput}
        >
          {Object.keys(ntypes).map((t) => (
            <MenuItem value={t} key={t}>{ntypes[t].label}</MenuItem>
          ))}
        </AdminTextField>
        <AdminTextField
          id="name"
          label="Name"
          value={name || ''}
          onChange={handleChangeInput}
          {...(isGenusInvalid().props)}
        />
        <AdminTextField
          id="authors"
          label="Authors"
          value={authors || ''}
          onChange={handleChangeInput}
        />
        <DividerSpaced />
        <AdminAutocompleteAsync
          id="family-apg"
          label="Family APG"
          options={familyApgOptions}
          value={familyApgSelected}
          loading={familyApgLoading}
          onChange={familyApgHandleChange}
          onInputChange={familyApgHandleFetch}
        />
        <AdminAutocompleteAsync
          id="family"
          label="Family"
          options={familyOptions}
          value={familySelected}
          loading={familyLoading}
          onChange={familyHandleChange}
          onInputChange={familyHandleFetch}
        />
        <DividerSpaced />
        <AdminTextField
          id="vernacular"
          label="Vernacular"
          value={vernacular || ''}
          onChange={handleChangeInput}
        />
        <TitledSection title="Accepted names">
          <AcceptedNamesList data={accepted} />
        </TitledSection>
        <TitledSection title="Synonyms">
          <AdminAddableList
            data={synonyms}
            onSearch={searchGeneraByQuery}
            onAddItemToList={handleSynonymAddRow}
            onRowDelete={handleSynonymRemoveRow}
            itemComponent={({ data }) => (
              <GenusSynonymListItem
                data={data}
                assignedToName={genus}
              />
            )}
            accessToken={accessToken}
          />
        </TitledSection>
        <AdminTimestampCheck
          isChecked={!!checkedTimestamp}
          checkedTimestamp={checkedTimestamp}
          checkedBy={checkedBy}
          onCheck={handleCheck}
        />
      </DialogContent>
      <DialogActions>
        <AdminDeleteButton onDelete={handleDelete} recordId={editId} />
        <Button onClick={handleHide}>Close</Button>
        <Button color="primary" onClick={handleSave}>
          Save changes
        </Button>
      </DialogActions>
    </AdminEditDialog>
  );
};

export default GeneraModal;

GeneraModal.propTypes = {
  show: PropTypes.bool.isRequired,
  editId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onHide: PropTypes.func.isRequired,
};

GeneraModal.defaultProps = {
  editId: undefined,
};

AcceptedNamesList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    parent: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      authors: PropTypes.string,
    }),
  })),
};
AcceptedNamesList.defaultProps = {
  data: undefined,
};
