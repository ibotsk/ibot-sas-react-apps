import React, { useEffect, useState } from 'react';

import {
  Container, Divider,
  List, ListItem, ListItemText,
} from '@material-ui/core';

import TitledSection from './Components/TitledSection';
import NameTitleSection from './Components/NameTitleSection';
import SynonymList from './Components/SynonymList';

import config from '../../../config';

const { status } = config;

const nameRecord = {
  ntype: 'A',
  hybrid: false,
  genus: 'Lorem',
  species: 'ipsum',
  subsp: 'ipsum',
  var: null,
  subvar: null,
  forma: null,
  nothosubsp: null,
  nothoforma: null,
  proles: null,
  unranked: null,
  authors: 'Dolor.',
  genusH: null,
  speciesH: null,
  subspH: null,
  varH: null,
  subvarH: null,
  formaH: null,
  nothosubspH: null,
  nothoformaH: null,
  authorsH: null,
  publication: 'Curabitur ornare condimentum est',
  tribus: null,
  vernacular: 'Slovenske meno',
  ntypeOrder: 1,
  isIsonym: false,
  isBasionym: false,
  notes: null,
  aggregate: null,
  subaggregate: null,
  id: 1,
};

const makeSynonymList = (length, syntype) => [...Array(length)].map(() => ({
  syntype,
  name: 'Lorem ipsum',
}));

const getStatusText = (ntype) => (
  status[ntype] ? status[ntype].text : ''
);

const NameDetail = () => {
  const [record, setRecord] = useState({});
  const [synonymsNomenclatoric, setSynonymsNomenclatoric] = useState([]);
  const [synonymsTaxonomic, setSynonymsTaxonomic] = useState([]);

  useEffect(() => {
    setRecord(nameRecord);
    setSynonymsNomenclatoric(makeSynonymList(2, 3));
    setSynonymsTaxonomic(makeSynonymList(3, 2));
  }, []);

  const { ntype, ...name } = record;
  return (
    <div>
      <NameTitleSection
        name={name}
        status={getStatusText(ntype)}
        publication={name.publication}
      />
      <Container maxWidth="md">
        <TitledSection title="Accepted name(s)">
          <List dense>
            <ListItem>
              <ListItemText
                primary="Lorem ipsum"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Lorem ipsum"
              />
            </ListItem>
          </List>
        </TitledSection>
        <TitledSection title="Synonyms">
          <SynonymList
            synonyms={synonymsNomenclatoric}
          />
          <Divider />
          <SynonymList
            synonyms={synonymsTaxonomic}
          />
        </TitledSection>
      </Container>
    </div>
  );
};

export default NameDetail;
